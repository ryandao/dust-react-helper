'use strict';

var assert = require('assert');

var string = '{@react component="test_component" /} \
    {@react component="test_component" /} {@react component="test_component" /} \
    {@react component="test_component" /} {@react component="test_component" /}';

suite('dust-react-helper', function() {
  var dust = require('dustjs-linkedin');
  var helper = require('../helper');
  helper.install(dust);
  helper.setReactDir('test');
  var compiled = dust.compile(string, 'test');
  dust.loadSource(compiled);

  bench('#loadSource', function() {
    dust.render('test', null, function(err, out) {
      if (err) {
        throw err;
      }
    });
  });
});
