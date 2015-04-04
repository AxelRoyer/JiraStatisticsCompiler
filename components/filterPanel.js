define(['lib/react'], function(React) {
  var FilterPanel = React.createClass({
    getInitialState: function() {
        debugger;
        return {
            components: this.props.data.components,
            reporters: this.props.data.reporters
        };
    },
    render: function() {
        var options = [];

        for (var i = 0; i < this.state.components.length ; i++) {
            options.push(
                React.DOM.option({value: this.state.components[i]}, this.state.components[i])
            )
        }

        return React.DOM.menu({className:"home-menu"},
            React.DOM.select({value: this.state.selectedValue, onChange: this.selectOption}, options)
        );
    }
  });

  return FilterPanel;
});
