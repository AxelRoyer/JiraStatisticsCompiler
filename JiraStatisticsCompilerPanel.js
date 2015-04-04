define(['lib/react', 'components/loginPage', 'components/loadingPage', 'components/homePage'], function(React, LoginPage, LoadingPage, HomePage) {
    var JiraStatisticsCompilerPanel = React.createClass({
        render: function() {
            if (this.state.page == "connectionInProgress") {
                return LoadingPage();
            }

            if (this.state.page == "home") {
                return HomePage();
            }

            return LoginPage({login: this.login})
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
