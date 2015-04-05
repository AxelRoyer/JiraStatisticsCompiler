/** @jsx React.DOM */

define(['lib/react', 'StatCalculator', 'components/filterPanel', 'lib/rd3'], function(React, StatCalculator, FilterPanel, Rd3) {
    var BarChart = React.createClass({
        render: function() {
            return Rd3.BarChart({data: this.props.data, width: 500, height: 200, title: 'Bar Chart', fill: '#3182bd'});
        }
    });

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

            var barData = [
                {label: 'A', value: 5},
                {label: 'B', value: 6},
                {label: 'F', value: 7}
            ];

            return React.DOM.section({className:"home-page"},
                FilterPanel({data: this.state, onFilterButtonClicked: this.onFilterButtonClicked}),
                React.DOM.div({className:"home-body"},
                    BarChart({data: barData})
                )
            )
        }
    });

    return MainPage;
});
