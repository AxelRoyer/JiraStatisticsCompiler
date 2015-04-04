define(['lib/react', 'LoginPanel', 'components/connectionInProgress'], function(React, LoginPanel, ConnectionPanel) {
    var JiraStatisticsCompilerPanel = React.createClass({
        render: function() {
            if (this.state.page == "connectionInProgress") {
                return ConnectionPanel();
            }

            if (this.state.page == "home") {
                return React.DOM.section({id:"home"}, "HOME")
            }

            return LoginPanel({login: this.login})
        },
        getInitialState: function() {
          return {
              page: "login"
          }
        },
        selectProject: function(projectId) {
          getDataWithJSON(this.showHomePage, this.state.username, this.state.password,
          this.state.url + "/rest/api/latest/search?jql=project=" + this.state.project + " AND issuetype=Bug&maxResults=1000&expand=changelog");
        },
        login: function(url, username, password, project) {
            this.setState({page: "connectionInProgress"});
            this.state.url = url;
            this.state.username = username;
            this.state.password = password;
            this.state.project = project;

            this.setState({
                url: url,
                username: username,
                password: password,
                mode: "loggedIn"
            });
            this.selectProject(80);
        },
        showHomePage: function() {
            this.setState({page: "home"});
        }
    });

    return JiraStatisticsCompilerPanel;
});
