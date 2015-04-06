define(['lib/react'], function(React) {
    var FilterPanel = React.createClass({
    getInitialState: function() {
        return {
            selectedComponent: "all",
            selectedReporter: "all",
            selectedPriority: "all",
            selectedStartDate: "all",
            selectedEndDate: "all"
        };
    },
    onFilterClicked: function() {
        var date = null;
        var startDate = null;
        var endDate = null;

        if (this.state.selectedStartDate !== "all") {
            date = this.state.selectedStartDate.split("-");
            startDate = new Date(date[0], date[1], date[2]);
        }

        if (this.state.selectedEndDate !== "all") {
            date = this.state.selectedEndDate.split("-");
            endDate = new Date(date[0], date[1], date[2]);
        }

        if (this.state.selectedEndDate !== "all" && this.state.selectedStartDate !== "all") {
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
    selectComponent: function(e) {
        this.setState({selectedComponent: e.target.value});
    },
    selectReporter: function(e) {
        this.setState({selectedReporter: e.target.value});
    },
    selectPriority: function(e) {
        this.setState({selectedPriority: e.target.value});
    },
    selectStartDate: function(e) {
        this.setState({selectedStartDate: e.target.value});
    },
    selectEndDate: function(e) {
        this.setState({selectedEndDate: e.target.value});
    },
    render: function() {
        var components = [
            React.DOM.option({value: "all"}, "all")
        ];
        var reporters = [
            React.DOM.option({value: "all"}, "all")
        ];
        var priorities = [
            React.DOM.option({value: "all"}, "all")
        ];

        for (var i = 0; i < this.props.data.components.length ; i++) {
            components.push(
                React.DOM.option({value: this.props.data.components[i]}, this.props.data.components[i])
            );
        }

        for (var i = 0; i < this.props.data.reporters.length ; i++) {
            reporters.push(
                React.DOM.option({value: this.props.data.reporters[i]}, this.props.data.reporters[i])
            );
        }

        var prioritiesKey = Object.keys(this.props.data.priorities);
        for (var i = 0; i < prioritiesKey.length ; i++) {
            priorities.push(
                React.DOM.option({value: this.props.data.priorities[i]}, this.props.data.priorities[i])
            );
        }

        return React.DOM.menu({className:"home-menu"},
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"From"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.DOM.input({value: this.state.selectedValue, type:"date", onChange: this.selectStartDate})
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"To"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.DOM.input({value: this.state.selectedValue, type:"date", onChange: this.selectEndDate})
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"Component"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.DOM.select({value: this.state.selectedValue, onChange: this.selectComponent}, components)
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"Reporter"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.DOM.select({value: this.state.selectedValue, onChange: this.selectReporter}, reporters)
                )
            ),
            React.DOM.div({className: "home-menu-item"},
                React.DOM.span({className:"home-menu-item-label"},"Priorities"),
                React.DOM.span({className:"home-menu-item-input"},
                    React.DOM.select({value: this.state.selectedValue, onChange: this.selectPriority}, priorities)
                )
            ),
            React.DOM.button({type: "button", onClick: this.onFilterClicked, className: "btn home-menu-item-button"}, "Show")
        );
    }
    });

    return FilterPanel;
});
