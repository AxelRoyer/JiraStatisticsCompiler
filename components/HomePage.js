/** @jsx React.DOM */

define(['lib/react', 'StatCalculator', 'components/filterPanel'], function(React, StatCalculator, FilterPanel) {
    var HomePage = React.createClass({
        getInitialState: function () {
            //localStorage.setItem("issues", JSON.stringify(this.props.data.issues));
            //this.statsManager = new StatCalculator(this.props.data.issues);




            return {
                data: this.props.data,
                components: Object.keys(this.statsManager.getComponents()),
                reports: Object.keys(this.statsManager.getReporters()),
                priorities: this.statsManager.getPriorities().priorityMap
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

            for (var i = 0; i = this.state.components.length ; i++) {
                this.state.components.push
            }

            return React.DOM.select({value: this.state.selectedValue, onChange: this.selectOption}, this.state.components);
        }
    });

    return HomePage;
});
