var React = require('react');
var Select = require('react-select');

var FilterPanel = React.createClass({
    getInitialState: function() {
        return this.props.filters;
    },
    onFilterClicked: function() {
        var date = null;
        var startDate = "";
        var endDate = "";

        if (this.state.selectedStartDate !== "") {
            date = this.state.selectedStartDate.split("-");
            startDate = new Date(date[0], date[1] - 1, date[2]);
        }

        if (this.state.selectedEndDate !== "") {
            date = this.state.selectedEndDate.split("-");
            endDate = new Date(date[0], date[1] - 1, date[2]);
        }

        if (this.state.selectedEndDate !== "" && this.state.selectedStartDate !== "") {
            if (startDate > endDate) {
                alert("start date could not be later than end date");
                return;
            }
        }

        this.props.onFilterButtonClicked({
            selectedComponent: this.state.selectedComponent,
            selectedReporter: this.state.selectedReporter,
            selectedPriority: this.state.selectedPriority,
            selectedStartDate: startDate,
            selectedEndDate: endDate
        });
    },
    selectComponent: function(selectedItem) {
        this.setState({selectedComponent: selectedItem});
    },
    selectReporter: function(selectedItem) {
        this.setState({selectedReporter: selectedItem});
    },
    selectPriority: function(selectedItem) {
        this.setState({selectedPriority: selectedItem});
    },
    selectStartDate: function(event) {
        this.setState({selectedStartDate: event.target.value});
    },
    selectEndDate: function(event) {
        this.setState({selectedEndDate: event.target.value});
    },
    render: function() {
        var components = [
            {value: this.state.selectedComponent, label: "all"}
        ];
        var reporters = [
            {value: this.state.selectedReporter, label: "all"}
        ];
        var priorities = [
            {value: this.state.selectedPriority, label: "all"}
        ];

        for (var i = 0; i < this.props.data.components.length ; i++) {
            components.push({value: this.props.data.components[i], label: this.props.data.components[i]})
        }

        for (var i = 0; i < this.props.data.reporters.length ; i++) {
            reporters.push({value: this.props.data.reporters[i], label: this.props.data.reporters[i]})
        }

        var prioritiesKey = Object.keys(this.props.data.priorities);
        for (var i = 0; i < prioritiesKey.length ; i++) {
            priorities.push({value: this.props.data.priorities[i], label: this.props.data.priorities[i]})
        }

        return React.DOM.menu({className:"home-menu"},
            React.DOM.header({className: "home-menu-header"}, "Filters"),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"From"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.createElement("input", {value: this.state.selectedStartDate, type:"date", onChange: this.selectStartDate})
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"To"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.createElement("input", {value: this.state.selectedEndDate, type:"date", onChange: this.selectEndDate})
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"Component"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.createElement(Select, {name: "componentSelector", value: this.state.selectedComponent, onChange: this.selectComponent, options: components})
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"Reporter"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.createElement(Select, {name: "prioritiesSelector", value: this.state.selectedReporter, onChange: this.selectReporter, options: reporters})
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"Priorities"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.createElement(Select, {name: "reportersSelector", value: this.state.selectedPriority, onChange: this.selectPriority, options: priorities})
                )
            ),
            React.DOM.button({type: "button", onClick: this.onFilterClicked, className: "btn home-menu-item-button"}, "Show")
        )
    }
});

module.exports = FilterPanel;
