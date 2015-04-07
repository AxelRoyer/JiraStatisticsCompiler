var React = require('react');

var ConnectionInProgress = React.createClass({
    getInitialState: function() {
      return {}
    },
    render: function() {
        return React.DOM.section({className:"connection-page"},
            React.DOM.div({className: "connection-body"},
                React.DOM.div({className: "connection-title"}, "Connection in progress"),
                React.DOM.div({className: "connection-message"}, "Please wait")
            )
        );
    }
});

module.exports = ConnectionInProgress;