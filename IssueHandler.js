define(['StatCalculator'], function(StatCalculator) {
    function IssueHandler() {
        this.issues = [];
    }

    IssueHandler.prototype.addIssue = function(issue) {
        this.issues.push(issue);
    };

    IssueHandler.prototype.getIssue = function(issueId) {
        for (var i=0; i < this.issues.length; i++) {
            var issue = this.issues[i];

            if (issue.id.match(/\d+/)[0] === issueId) {
                return issue;
            }
        }
        return null;
    };

    getDataWithJSON = function(successCallback, username, password, requestUrl, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://cors-anywhere.herokuapp.com/" + requestUrl);

        if (this.username !== "") {
            this.setAuthorizationHeader(xhr, username, password);
        }

        xhr.onreadystatechange = function(response) {
            console.log(xhr.readyState);
            if (xhr.readyState == 4) {
                //statisticsCalculator = new StatCalculator(JSON.parse(window.localStorage.getItem("jiraData")).issues);
                successCallback(JSON.parse(xhr.responseText));
            }
        };

        xhr.setRequestHeader("x-requested-with", "love");
        xhr.send();
    };

    setAuthorizationHeader = function(xhr, username, password) {
        var authHeader = "Basic "+btoa(username + ":" + password);
        xhr.setRequestHeader("Authorization", authHeader);
    };

    return IssueHandler;
});
