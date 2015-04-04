define(['lib/react'], function(React) {
  var LoginPanel = React.createClass({
    getInitialState: function() {
      return {
        url: "https://jira.caplin.com",
        username: "jonp",
        password: "",
        project: ""
      }
    },
    changeUrl: function(e) {
      this.setState({
        url: e.target.value
      });
    },
    changeUsername: function(e) {
      this.setState({
        username: e.target.value
      });
    },
    changeProject: function(e) {
      this.setState({
          project: e.target.value
      });
    },
    changePassword: function(e) {
      this.setState({
        password: e.target.value
      });
    },
    handleKeyPress: function(e,f,g) {
      if (e.which == 13) {
        this.login();
      }
    },
    login: function() {
        debugger;
      this.props.login(this.state.url, this.state.username, this.state.password, this.state.project);
    },
    render: function() {
      return React.DOM.div({className: "login-screen"},
          React.DOM.div({className: "login-screen-body"},
              React.DOM.div({className: "login-screen-title"}, "CONNECTION"),
              React.DOM.div({className: "login-screen-input-group"},
                React.DOM.input({type: "text", onChange: this.changeUrl, value: this.state.url, className: "login-screen-input"}),
                React.DOM.div({className: "login-screen-label"}, "url")
              ),
              React.DOM.div({className: "login-screen-input-group"},
                  React.DOM.input({type: "text", onChange: this.changeProject, value: this.state.project, className: "login-screen-input"}),
                  React.DOM.div({className: "login-screen-label"}, "Project")
              ),
              React.DOM.div({className: "login-screen-input-group"},
                React.DOM.input({type: "text", onChange: this.changeUsername, value: this.state.username, className: "login-screen-input"}),
                React.DOM.div({className: "login-screen-label"}, "User")
              ),
              React.DOM.div({className: "login-screen-input-group"},
                React.DOM.input({type: "password", onKeyUp: this.handleKeyPress, onChange: this.changePassword, value: this.state.password, className: "login-screen-input"}),
                  React.DOM.div({className: "login-screen-label"}, "Pass")
              ),
              React.DOM.button({type: "button", onClick: this.login, className: "btn login-screen-button"}, "LOGIN")
        )
      );
    }
  });

  return LoginPanel;
});
