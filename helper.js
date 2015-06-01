'use strict';

var React = require('react');
var path = require('path');
require('node-jsx').install();

var reactDir;

module.exports = {
  install: function(dust) {
    dust.helpers.react = function(chunk, context, bodies, params) {
      var file = params.component;
      var component;

      if (reactDir) {
        component = require(path.resolve(path.join(reactDir, file)));
      } else {
        component = require(path.resolve(file));
      }

      var markup = React.renderToString(React.createElement(component));
      chunk.write(markup);
      return chunk;
    };
  },

  setReactDir: function(dir) {
    reactDir = dir;
  }
};
