/** @jsx React.DOM */

define(['lib/react', 'StatCalculator', 'components/filterPanel'], function(React, StatCalculator, FilterPanel) {
    var HomePage = React.createClass({
        getInitialState: function () {
            //localStorage.setItem("issues", JSON.stringify(this.props.data.issues));
            //this.statsManager = new StatCalculator(this.props.data.issues);
            this.statsManager = new StatCalculator(JSON.parse(localStorage.getItem("issues")));
            this.components = Object.keys(this.statsManager.getComponents());
            this.reports = Object.keys(this.statsManager.getReporters());
            this.priorities = this.statsManager.getPriorities().priorityMap;

            return {
                data: this.props.data
            }
        },
        selectOption: function (e) {
            this.setState({
                selectedValue: e.target.value
            })
        },
        render: function () {
            var options = [
                React.DOM.option({value: "a"}, "a"),
                React.DOM.option({value: "b"}, "b"),
                React.DOM.option({value: "c"}, "c")
            ];

            return React.DOM.select({value: this.state.selectedValue, onChange: this.selectOption}, options);
        }
    });

    return HomePage;
});
