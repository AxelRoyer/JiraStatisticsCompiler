define(['lib/react'], function(React) {
    var FilterPanel = React.createClass({
    getInitialState: function() {
        return {
            components: this.props.data.components,
            reporters: this.props.data.reporters,
            priorities: this.props.data.priorities,
            selectedComponent: "all",
            selectedReporter: "all",
            selectedPriority: "all"
        };
    },
    onFilterClicked: function() {
        debugger;
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

        for (var i = 0; i < this.state.components.length ; i++) {
            components.push(
                React.DOM.option({value: this.state.components[i]}, this.state.components[i])
            );
        }

        for (var i = 0; i < this.state.reporters.length ; i++) {
            reporters.push(
                React.DOM.option({value: this.state.reporters[i]}, this.state.reporters[i])
            );
        }

        for (var i = 0; i < this.state.priorities.length ; i++) {
            priorities.push(
                React.DOM.option({value: this.state.priorities[i]}, this.state.priorities[i])
            );
        }

        return React.DOM.menu({className:"home-menu"},
            React.DOM.div({className: "menu-item"},
                React.DOM.span({},"Component",
                    React.DOM.select({value: this.state.selectedValue, onChange: this.selectComponent}, components)
                )
            ),
            React.DOM.div({className: "menu-item"},
                React.DOM.span({},"Reporter",
                    React.DOM.select({value: this.state.selectedValue, onChange: this.selectReporter}, reporters)
                )
            ),
            React.DOM.div({className: "menu-item"},
                React.DOM.span({},"Priorities",
                    React.DOM.select({value: this.state.selectedValue, onChange: this.selectPriority}, priorities)
                )
            ),
            React.DOM.button({type: "button", onClick: this.onFilterClicked, className: "btn login-screen-button"}, "Show")
        );
    }
    });

    return FilterPanel;
});
