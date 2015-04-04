/** @jsx React.DOM */

define(['lib/react', 'StatCalculator', 'components/filterPanel'], function(React, StatCalculator, FilterPanel) {
    var HomePage = React.createClass({
        getInitialState: function () {
            this.statsManager = new StatCalculator(this.props.data.issues);

            return {
                data: this.props.data,
                components: Object.keys(this.statsManager.getComponents()),
                reporters: Object.keys(this.statsManager.getReporters()),
                priorities: this.statsManager.getPriorities().priorityMap
            }
        },
        selectOption: function (e) {
            this.setState({
                selectedValue: e.target.value
            })
        },
        render: function () {
            return React.DOM.section({className:"home-page"},
                FilterPanel({data: this.state}),
                React.DOM.div({className:"home-body"}, "BODY")
            );
        }
    });

    return HomePage;
});
