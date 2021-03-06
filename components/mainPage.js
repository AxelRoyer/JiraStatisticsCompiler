var React = require('react');
var StatCalculator = require("./StatisticsCalculator");
var FilterPanel = require("./filterPanel");
var BarChart = require("react-chartjs").Bar;

var MainPage = React.createClass({
    getInitialState: function () {
        this.statsManager = new StatCalculator(this.props.data.issues);

        var initialFilters = {
            selectedComponent: "all",
            selectedReporter: "all",
            selectedPriority: "all",
            selectedStartDate: "",
            selectedEndDate: new Date()          
        }
        
        var filteredIssues = this.getFilteredIssues(initialFilters);

        var computedData = this.computeData(filteredIssues);

        return {
            data: this.props.data,
            components: Object.keys(this.statsManager.getComponents()),
            reporters: Object.keys(this.statsManager.getReporters()),
            priorities: this.statsManager.getPriorities().priorityMap,
            productsBugs: computedData.productsBugs,
            bugsReporters: computedData.bugsReporters,
            bugPriorities: computedData.bugPriorities,
            resolutionTimes: computedData.resolutionTimes,
            resolutionStatus: computedData.resolutionStatus,
            columnDuration: computedData.columnDuration,
            filters: initialFilters
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
        var resolutionTimeChartData = [];
        var resolutionStatusChartData = [];
        var resolutionStatusData = [];

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

        var resolutionTimeData = this.statsManager.getResolutionTime(filteredIssues);
        var noResolutionTimesId = Object.keys(resolutionTimeData);

        for (var i = 0; i < noResolutionTimesId.length ; i++) {
            resolutionTimeChartData.push(resolutionTimeData[noResolutionTimesId[i]].length);

            if (noResolutionTimesId[i] !== "no resolution time") {
                noResolutionTimesId[i] = noResolutionTimesId[i] + " days";
            }
        }

        var resolutionStatusTempData = this.statsManager.getResolution(filteredIssues);
        var resolutionStatusId = Object.keys(resolutionStatusTempData);

        for (var i = 0; i < resolutionStatusId.length ; i++) {
            resolutionStatusData.push(resolutionStatusTempData[resolutionStatusId[i]].length);
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

        resolutionTimeChartData = {
            labels: noResolutionTimesId,
            datasets: [
                {
                    label: "Resolution time",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: resolutionTimeChartData
                }
            ]
        };

        resolutionStatusChartData = {
            labels: resolutionStatusId,
            datasets: [
                {
                    label: "Resolution Status",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: resolutionStatusData
                }
            ]
        };

        return {
            productsBugs: componentsChartData,
            bugsReporters: reportersChartData,
            bugPriorities: prioritiesChartData,
            resolutionTimes: resolutionTimeChartData,
            resolutionStatus: resolutionStatusChartData,
            columnDuration: this.getColumnDurationChartData(this.statsManager.getColumnDuration(filteredIssues))
        };
    },
    getColumnDurationChartData: function(data) {
        var columns = {};
        var issuesColumns = null;
        var issueData = null;
        var chartData = [];
        var chartLabels = null;
        var columnsNo = {};

        for (var i = 0 ; i < data.length ; i++) {
            issueData = data[i];
            issuesColumns = Object.keys(issueData.columnDuration);

            for (var k = 0 ; k < issuesColumns.length ; k++) {
                if (!columns[issuesColumns[k]]) {
                    columns[issuesColumns[k]] = issueData.columnDuration[issuesColumns[k]];
                    columnsNo[issuesColumns[k]] = 1;
                } else {
                    columnsNo[issuesColumns[k]] = columnsNo[issuesColumns[k]] + 1;
                    columns[issuesColumns[k]] = columns[issuesColumns[k]] + issueData.columnDuration[issuesColumns[k]];
                }
            }
        }

        chartLabels = Object.keys(columns);

        for (var j = 0 ; j < chartLabels.length ; j++) {
            chartData.push(columns[chartLabels[j]] / columnsNo[chartLabels[j]]);
        }

        return {
            labels: chartLabels,
            datasets: [
                {
                    label: "Resolution Status",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: chartData
                }
            ]
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
            filteredIssues = this.statsManager.getIssuesCreatedBeforeOrOn(filters.selectedEndDate, filteredIssues);
        }

        return filteredIssues;
    },
    render: function () {
        return React.createElement("section", {className:"home-page"},
            React.createElement(FilterPanel, {data: this.state, onFilterButtonClicked: this.onFilterButtonClicked, filters: this.state.filters}),
            React.createElement("div", {className:"home-body"},
                React.createElement("header", {}, "Filtered by products"),
                React.createElement(BarChart, {data: this.state.productsBugs, options:{},  width:"800", height:"250", redraw:true}),
                React.createElement("header", {}, "Filtered by priorities"),
                React.createElement(BarChart, {data: this.state.bugPriorities, options:{},  width:"800", height:"250", redraw:true}),
                React.createElement("header", {}, "Filtered by reporters"),
                React.createElement(BarChart, {data: this.state.bugsReporters, options:{},  width:"800", height:"450", redraw:true}),
                React.createElement("header", {}, "Filtered by resolution time"),
                React.createElement(BarChart, {data: this.state.resolutionTimes, options:{},  width:"800", height:"450", redraw:true}),
                React.createElement("header", {}, "Filtered by resolution Status"),
                React.createElement(BarChart, {data: this.state.resolutionStatus, options:{},  width:"800", height:"450", redraw:true}),
                React.createElement("header", {}, "Filtered by column duration (average)"),
                React.createElement(BarChart, {data: this.state.columnDuration, options:{},  width:"800", height:"450", redraw:true})
            )
        )
    }
});

module.exports = MainPage;