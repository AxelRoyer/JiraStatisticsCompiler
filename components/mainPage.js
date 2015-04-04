/** @jsx React.DOM */

define(['lib/react', 'StatCalculator', 'components/filterPanel'], function(React, StatCalculator, FilterPanel) {
    var MainPage = React.createClass({
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
        onFilterButtonClicked: function(filters) {
            debugger;
        },
        render: function () {
            return React.DOM.section({className:"home-page"},
                FilterPanel({data: this.state, onFilterButtonClicked: this.onFilterButtonClicked}),
                React.DOM.div({className:"home-body"}, "BODY")
            );
        }
    });

    return MainPage;
});
