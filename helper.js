'use strict';

var React = require('react');
var path = require('path');
require('node-jsx').install();

var reactDir;

var memoize = require('memoizee');

var getComponentFactory = memoize(function getComponentFactory(file) {
  var component;

  if (reactDir) {
    component = require(path.resolve(path.join(reactDir, file)));
  } else {
    component = require(path.resolve(file));
  }
  return React.createFactory(component);
});

var renderComponent = memoize(function renderComponent(factory, props) {
   return React.renderToString(factory(props))
}, { max: 2000 })

module.exports = {
  install: function(dust) {
    dust.helpers.react = function(chunk, context, bodies, params) {
      var file = params.component;
      var props = params.props;
      var factory = getComponentFactory(file);
      var markup = renderComponent(factory, props);
      chunk.write(markup);
      return chunk;
    };
  },

  setReactDir: function(dir) {
    reactDir = dir;
  }
};
