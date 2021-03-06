'use strict';

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var path = require('path');

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

var renderComponent = function renderComponent(file, props) {
  var factory = getComponentFactory(file);
  return ReactDOMServer.renderToString(factory(props))
}

module.exports = {
  clearCache: function() {
    getComponentFactory.clear();
    renderComponent.clear();
  },

  install: function(dust, cache_opts) {
    if(!cache_opts) {
      cache_opts = {max: 2000, primitive: true}
    }

    var renderComponent_memo =  memoize(renderComponent, cache_opts)

    dust.helpers.react = function(chunk, context, bodies, params) {
      var file = params.component;
      var props = params.props;
      if (!props) {
        props = {};
      }
      for(var element in params) {
        if (params.hasOwnProperty(element)) {
          if (element !== 'component' && element !== 'noCache') {
            props[element] = context.resolve(params[element]);
          }
        }
      }

      var markup;
      if (params.hasOwnProperty('noCache')) {
        markup = renderComponent(file, props);
      } else {
        markup = renderComponent_memo(file, props);
      }
      chunk.write(markup);
      return chunk;
    };
  },

  setReactDir: function(dir) {
    reactDir = dir;
  }
};
