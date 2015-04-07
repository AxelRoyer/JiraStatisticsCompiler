/** @jsx React.DOM */
var React = require('react');
var LoginPage = require("./../components/loginPage");
var MainPage = require("./../components/mainPage");
var LoadingPage = require("./../components/loadPage");
var IssueHandler = require("./../components/IssueHandler");

var App = React.createClass({
	getInitialState: function () {
		return {
			page: "login"
		}
	},
	selectProject: function (projectId, url, project, username, password) {
		getDataWithJSON(this.showHomePage, username, password,
			url + "/rest/api/latest/search?jql=project=" + project + " AND issuetype=Bug&maxResults=1000&expand=changelog", this.onLoadingError);
	},
	login: function (url, username, password, project) {
		this.setState({page: "connectionInProgress"});
		this.selectProject(80, url, project, username, password);
	},
	showHomePage: function (data) {
		this.setState({data: data, page:"home"});
	},
	onLoadingError: function () {
		this.setState({page: "login"});
		alert("wrong details");
	},
	render: function() {
		if (this.state.page === "home") {
			return React.createElement(MainPage, {data: this.state.data});
		} else if (this.state.page === "connectionInProgress") {
			return React.createElement(LoadingPage, {});
		} else {
			return React.createElement(LoginPage, {login: this.login});
		}
	}
});
	
module.exports = App;
