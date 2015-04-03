function StatisticsCalculator(issueArray) {
  this.issueArray = issueArray;
}

StatisticsCalculator.prototype.getPriorities = function(optionalIssues) {
  var issues = optionalIssues ? optionalIssues : this.issueArray;
  var priorityMap = {};
  var issueMap = {};

  function initialiseMapKeyIfEmpty(key) {
    if (!issueMap[key]) {
      issueMap[key] = [];
    }
  }

  issues.forEach(function(issue) {
    var priorityKey = issue.fields.priority.id;
    var priorityName = issue.fields.priority.name;

    initialiseMapKeyIfEmpty(priorityKey);
    issueMap[priorityKey].push(issue);
    priorityMap[priorityKey] = priorityName;
  })

  return {issues: issueMap, priorityMap: priorityMap}
}

StatisticsCalculator.prototype.getComponents = function(optionalIssues) {
  var issues = optionalIssues ? optionalIssues : this.issueArray;
  var componentMap = {};

  function initialiseComponentIfEmpty(key) {
    if (!componentMap[key]) {
      componentMap[key] = [];
    }
  }

  issues.forEach(function(issue) {
    issue.fields.components.forEach(function(component) {
      initialiseComponentIfEmpty(component.name);
      componentMap[component.name].push(issue);
    })
  })

  return componentMap;
}

StatisticsCalculator.prototype.getResolution = function(optionalIssues) {
    var issues = optionalIssues ? optionalIssues : this.issueArray;
    var resolutionMap = {};

    function initialiseResolutionIfEmpty(key) {
      if (!resolutionMap[key]) {
        resolutionMap[key] = [];
      }
    }

    issues.forEach(function(issue) {
      var resolution = issue.fields.resolution ? issue.fields.resolution.name : "No Resolution"

      initialiseResolutionIfEmpty(resolution);
      resolutionMap[resolution].push(issue);
    })

    return resolutionMap;
}

StatisticsCalculator.prototype.getReporters = function(optionalIssues) {
    var issues = optionalIssues ? optionalIssues : this.issueArray;
    var reporterMap = {};

    function initialiseReporterIfEmpty(key) {
      if (!reporterMap[key]) {
        reporterMap[key] = [];
      }
    }

    issues.forEach(function(issue) {
      var reporter = issue.fields.reporter.displayName

      initialiseReporterIfEmpty(reporter);
      reporterMap[reporter].push(issue);
    })

    return reporterMap;
}
