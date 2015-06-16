'use strict';

var React = require('react');

var MyComponent = React.createClass({
  render: function() {
    throw new Error('this component is broken');
  }
});

module.exports = MyComponent;
