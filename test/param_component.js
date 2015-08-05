'use strict';

var React = require('react');

var MyComponent = React.createClass({
  render: function() {
    return (
      <div>{this.props.paramStyle}<br />{this.props.immStyle}<br />{this.props.intStyle}</div>
    );
  }
});

module.exports = MyComponent;
