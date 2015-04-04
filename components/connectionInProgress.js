define(['lib/react'], function(React) {
  var ConnectionInProgress = React.createClass({
    getInitialState: function() {
      return {
        url: "https://jira.caplin.com",
        username: "jonp",
        password: "",
        project: ""
      }
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

  return ConnectionInProgress;
});
