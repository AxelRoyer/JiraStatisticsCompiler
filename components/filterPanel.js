define(['lib/react'], function(React) {
  var FilterPanel = React.createClass({
    getInitialState: function() {
        return {
            products: this.props.data.products,
            reporters: this.props.data.reporters
        };
    },
    render: function() {
        return React.DOM.menu({className:"filters"},
            React.DOM.select({value: this.products}),
            React.DOM.div({className: "connection-message"}, "Please wait")
        );
    }
  });

  return FilterPanel;
});
