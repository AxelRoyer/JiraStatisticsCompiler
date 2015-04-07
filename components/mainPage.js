var React = require('react');
var StatCalculator = require("./StatisticsCalculator");
var FilterPanel = require("./filterPanel");
var BarChart = require("react-chartjs").Bar;

var MainPage = React.createClass({
    getInitialState: function () {
        this.statsManager = new StatCalculator(this.props.data.issues);

        var filteredIssues = this.getFilteredIssues({
            selectedComponent: "all",
            selectedReporter: "all",
            selectedPriority: "all",
            selectedStartDate: "",
            selectedEndDate: ""
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
        var newState = this.computeData(this.getFilteredIssues(filters));
        this.setState(newState);
    },
    computeData: function(filteredIssues) {
        var componentData = null;
        var productsBugs = [];
        var bugsReporters = [];
        var bugPriorities = [];

        var filteredPriorities = this.statsManager.getPriorities(filteredIssues).issues;
        var filteredPrioritiesMap = this.statsManager.getPriorities(filteredIssues).priorityMap;
        var filteredPrioritiesMapArray = [];

        // TODO: refactor priorities
        for (var i = 1; i < 5 ; i++) {
            if (filteredPrioritiesMap[i]) {
                filteredPrioritiesMapArray.push(this.statsManager.getPriorities(filteredIssues).priorityMap[i]);
                bugPriorities.push(filteredPriorities[i].length);
            }
        }

        var filteredComponents = this.statsManager.getComponents(filteredIssues);
        var filteredComponentMap = Object.keys(filteredComponents);

        var filteredReporters = this.statsManager.getReporters(filteredIssues);
        var filteredReportersMap = Object.keys(this.statsManager.getReporters(filteredIssues));

        for (var i = 0; i < filteredComponentMap.length ; i++) {
            productsBugs.push(filteredComponents[filteredComponentMap[i]].length);
        }

        for (var i = 0; i < filteredReportersMap.length ; i++) {
            bugsReporters.push(filteredReporters[filteredReportersMap[i]].length);
        }

        var componentsChartData = {
            labels: filteredComponentMap,
            datasets: [
                {
                    label: "Components",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: productsBugs
                }
            ]
        };

        var prioritiesChartData = {
            labels: filteredPrioritiesMapArray,
            datasets: [
                {
                    label: "Priorities",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: bugPriorities
                }
            ]
        };

        var reportersChartData = {
            labels: filteredReportersMap,
            datasets: [
                {
                    label: "Reporters",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: bugsReporters
                }
            ]
        };

        return {
            productsBugs: componentsChartData,
            bugsReporters: reportersChartData,
            bugPriorities: prioritiesChartData
        };
    },
    getFilteredIssues: function (filters) {
        var filteredIssues = [];
        var components = this.statsManager.getComponents();
        var componentsMap = Object.keys(this.statsManager.getComponents());

        if (filters && filters.selectedComponent === "all") {
            for (var i = 0; i < componentsMap.length ; i++) {
                filteredIssues = filteredIssues.concat(components[componentsMap[i]]);
            }
        } else {
            filteredIssues = components[filters.selectedComponent];
        }

        if (filters && filters.selectedReporter !== "all") {
            filteredIssues = this.statsManager.getReporters(filteredIssues)[filters.selectedReporter]
        }

        if (filters && filters.selectedPriority !== "all") {
            var id = null;
            var prioritiesIssuesObject = this.statsManager.getPriorities(filteredIssues);
            var prioritiesIssuesIssues = this.statsManager.getPriorities(filteredIssues).issues;
            var prioritiesIssuesMap = this.statsManager.getPriorities(filteredIssues).priorityMap;

            for (i = 1; i < 5 ; i++) {
                if (filters.selectedPriority === prioritiesIssuesMap[i]) {
                    id = i;
                    break;
                }
            }

            filteredIssues = prioritiesIssuesIssues[id];
        }

        if (filters && filters.selectedStartDate !== "") {
            filteredIssues = this.statsManager.getIssuesCreatedAfterOrOn(filters.selectedStartDate, filteredIssues);
        }

        if (filters && filters.selectedEndDate !== "") {
            filteredIssues = this.statsManager.getIssuesCreatedBeforeOrOn(filters.selectedStartDate, filteredIssues);
        }

        return filteredIssues;
    },
    render: function () {
        return React.createElement("section", {className:"home-page"},
            React.createElement(FilterPanel, {data: this.state, onFilterButtonClicked: this.onFilterButtonClicked}),
            React.createElement("div", {className:"home-body"},
                React.createElement(BarChart, {data: this.state.productsBugs, options:{},  width:"600", height:"250", redraw:true}),
                React.createElement(BarChart, {data: this.state.bugPriorities, options:{},  width:"600", height:"250", redraw:true}),
                React.createElement(BarChart, {data: this.state.bugsReporters, options:{},  width:"600", height:"450", redraw:true})
            )
        )
    }
});

module.exports = MainPage;