'use strict';

var React = require('react');
var path = require('path');

var reactDir;

var memoize = require('memoizee');

var renderComponent;
var getComponentFactory = memoize(function getComponentFactory(file) {
  var component;

  if (reactDir) {
    component = require(path.resolve(path.join(reactDir, file)));
  } else {
    component = require(path.resolve(file));
  }
  return React.createFactory(component);
});

module.exports = {

  clearCache: function() {
    getComponentFactory.clear();
    renderComponent.clear();
  },

  install: function(dust, jsx_opts, cache_opts) {
    require('node-jsx').install(jsx_opts);

    if(!cache_opts) {
      cache_opts = {max: 2000}
    }

    renderComponent = memoize(function renderComponent(file, props) {
      var factory = getComponentFactory(file);
      return React.renderToString(factory(props))
    }, cache_opts)


    dust.helpers.react = function(chunk, context, bodies, params) {
      var file = params.component;
      var props = params.props;
      var markup = renderComponent(file, props);
      chunk.write(markup);
      return chunk;
    };
  },

  setReactDir: function(dir) {
    reactDir = dir;
  }
};
