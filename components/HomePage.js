define(['lib/react'], function(React) {
  var HomePage = React.createClass({
    getInitialState: function() {
      return {

      }
    },
    render: function() {
        return React.DOM.section({className:"home-page"},
            React.DOM.menu({className: "home-menu"},"Filters"),
            React.DOM.div({className: "home-body"}, "HOME")
        );
    }
  });

  return HomePage;
});
