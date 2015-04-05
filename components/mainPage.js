/** @jsx React.DOM */

define(['lib/react', 'StatCalculator', 'components/filterPanel', 'lib/rd3'], function(React, StatCalculator, FilterPanel, Rd3) {
    var BugsReporters = React.createClass({
        render: function() {
            return Rd3.BarChart({data: this.props.data, width: 800, height: 300, title: "Reporters", fill: '#3182bd'});
        }
    });

    var BugsProducts = React.createClass({
        render: function() {
            return Rd3.BarChart({data: this.props.data, width: 800, height: 300, title: "Products", fill: '#3182bd'});
        }
    });

    var BugsPriorities = React.createClass({
        render: function() {
            return Rd3.BarChart({data: this.props.data, width: 800, height: 300, title: "Priorities", fill: '#3182bd'});
        }
    });

    var MainPage = React.createClass({
        getInitialState: function () {
            this.statsManager = new StatCalculator(this.props.data.issues);

            var filteredIssues = this.getFilteredIssues({
                selectedComponent: "all",
                selectedReporter: "all"
            });

            var computedData = this.computeData(filteredIssues);
            return {
                data: this.props.data,
                components: Object.keys(this.statsManager.getComponents()),
                reporters: Object.keys(this.statsManager.getReporters()),
                priorities: this.statsManager.getPriorities().priorityMap,
                productsBugs: computedData.productsBugs,
                bugsReporters: computedData.bugsReporters,
                bugPriorities: computedData.bugPriorities
            };
        },
        onFilterButtonClicked: function(filters) {
            debugger;
            var newState = this.computeData(this.getFilteredIssues(filters));
            debugger;
            this.setState(newState);
        },
        computeData: function(filteredIssues) {
            var productsBugs = [];
            var bugsReporters = [];
            var bugPriorities = [];
            var filteredPriorities = this.statsManager.getPriorities(filteredIssues).issues;
            var filteredPrioritiesMap = this.statsManager.getPriorities(filteredIssues).priorityMap;

            var filteredComponents = this.statsManager.getComponents(filteredIssues);
            var filteredComponentMap = Object.keys(filteredComponents);

            var filteredReporters = this.statsManager.getReporters(filteredIssues);
            var filteredReportersMap = Object.keys(this.statsManager.getReporters(filteredIssues));

            for (var i = 0; i < filteredComponentMap.length ; i++) {
                productsBugs.push({label: filteredComponentMap[i], value: filteredComponents[filteredComponentMap[i]].length});
            }

            for (var i = 0; i < filteredReportersMap.length ; i++) {
                bugsReporters.push({label: filteredReportersMap[i], value: filteredReporters[filteredReportersMap[i]].length});
            }

            // TODO: refactor priorities
            for (var i = 0; i < 5 ; i++) {
                if (filteredPrioritiesMap[i]) {
                    bugPriorities.push({label: filteredPrioritiesMap[i], value: filteredPriorities[i].length});
                }
            }

            return {
                productsBugs: productsBugs,
                bugsReporters: bugsReporters,
                bugPriorities: bugPriorities
            };
        },
        getFilteredIssues: function (filters) {
            var isFilteredByReporters = false;
            var isFilteredByComponent = false;
            var filteredComponents = null;
            var filteredReporters = null;
            var filteredIssues = [];
            var components = this.statsManager.getComponents();
            var componentsMap = Object.keys(this.statsManager.getComponents());

            if (filters && filters.selectedComponent === "all") {
                for (var i = 0; i < componentsMap.length ; i++) {
                    filteredIssues = filteredIssues.concat(components[componentsMap[i]]);
                }
            } else {
                isFilteredByComponent = true;
                filteredIssues = components[filters.selectedComponent];
            }

            return filteredIssues;
        },
        render: function () {
            return React.DOM.section({className:"home-page"},
                FilterPanel({data: this.state, onFilterButtonClicked: this.onFilterButtonClicked}),
                React.DOM.div({className:"home-body"},
                    BugsProducts({data: this.state.productsBugs}),
                    BugsReporters({data: this.state.bugsReporters}),
                    BugsPriorities({data: this.state.bugPriorities})
                )
            )
        }
    });

    return MainPage;
});
