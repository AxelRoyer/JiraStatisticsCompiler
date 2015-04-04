define(['lib/react', 'components/loginPage', 'components/loadPage', 'components/mainPage'], function(React, LoginPage, LoadingPage, MainPage) {
    var JiraStatisticsCompilerPanel = React.createClass({
        render: function() {
            if (this.state.page == "connectionInProgress") {
                return LoadingPage();
            }

            if (this.state.page == "main") {
                return MainPage({data: this.state.data});
            }

            return LoginPage({login: this.login})
        },
        getInitialState: function() {
          return {
              page: "login"
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
            this.setState({data: data, page:"main"});
        }
    });

    return JiraStatisticsCompilerPanel;
});
