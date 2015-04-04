define(['lib/react', 'components/loginPage', 'components/loadPage', 'components/HomePage'], function(React, LoginPage, LoadingPage, HomePage) {
    var JiraStatisticsCompilerPanel = React.createClass({
        render: function() {
            if (this.state.page == "connectionInProgress") {
                return LoadingPage();
            }

            if (this.state.page == "home") {
                return HomePage({data: this.state.data});
            }

            return LoginPage({login: this.login})
        },
        getInitialState: function() {
          return {
              page: "home"
          }
        },
        selectProject: function(projectId, url, project, username, password) {
          getDataWithJSON(this.showHomePage, username, password,
            url + "/rest/api/latest/search?jql=project=" + project + " AND issuetype=Bug&maxResults=1000&expand=changelog");
        },
        login: function(url, username, password, project) {
            this.setState({page: "connectionInProgress"});
            this.selectProject(80, url, project, username, password);
        },
        showHomePage: function(data) {
            this.setState({data: data});
            this.setState({page: "home"});
        }
    });

    return JiraStatisticsCompilerPanel;
});
