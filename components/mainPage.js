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
    //
    //var ResolutionDate = React.createClass({
    //    render: function() {
    //        return Rd3.BarChart({data: this.props.data, width: 800, height: 300, title: "Resolution time", fill: '#3182bd'});
    //    }
    //});

    var MainPage = React.createClass({
        getInitialState: function () {
            this.statsManager = new StatCalculator(this.props.data.issues);

            var data = this.props.data;

            var returnValue = this.computeData({});
            returnValue.data = data;

            return returnValue;
        },
        selectOption: function (e) {
            this.setState({
                selectedValue: e.target.value
            })
        },
        onFilterButtonClicked: function(filters) {
            this.computeData(filters);
        },
        computeData: function(filters) {
            var components = Object.keys(this.statsManager.getComponents());
            var reporters = Object.keys(this.statsManager.getReporters());
            var priorities = this.statsManager.getPriorities().priorityMap;

            var productsBugs = [];

            for (var i = 0; i < components.length ; i++) {
                productsBugs.push({label: components[i], value: this.statsManager.getComponents()[components[i]].length});
            }

            var bugsReporters = [];

            for (var i = 0; i < reporters.length ; i++) {
                if (this.statsManager.getReporters()[reporters[i]].length > 5) {
                    bugsReporters.push({label: reporters[i], value: this.statsManager.getReporters()[reporters[i]].length});
                }
            }

            var bugPriorities = [];

            for (var i = 1; i <= Object.keys(priorities).length ; i++) {
                bugPriorities.push({label: priorities[i], value: this.statsManager.getPriorities().issues[i].length});
            }

            return {
                productsBugs: productsBugs,
                bugsReporters: bugsReporters,
                bugPriorities: bugPriorities,
                components: components,
                reporters: reporters,
                priorities: priorities
            };
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
