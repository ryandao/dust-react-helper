'use strict';

var React = require('react');

var MyComponent = React.createClass({
  render: function() {
    return (
      <div>{this.props.param1}<br />{this.props.param2}<br />{this.props.param3}</div>
    );
  }
});

module.exports = MyComponent;
