'use strict';

var assert = require('assert');

describe('dust-react-helper', function() {
  var dust = require('dustjs-linkedin');
  var helper = require('../helper');
  helper.install(dust);

  it('should install correctly', function() {
    assert(dust.helpers.react != null);
  });

  it('should render react component', function() {
    var compiled = dust.compile('{@react component="./test/test_component" /}', 'test');
    dust.loadSource(compiled);
    dust.render('test', null, function(err, out) {
      if (err) {
        throw err;
      } else {
        assert(out.indexOf('Hello World') > -1);
      }
    });
  });

  it('should load component according to reactDir', function() {
    helper.setReactDir('test');
    var compiled = dust.compile('{@react component="test_component" /}', 'test');
    dust.loadSource(compiled);
    dust.render('test', null, function(err, out) {
      if (err) {
        throw err;
      } else {
        assert(out.indexOf('Hello World') > -1);
      }
    });
  });
});
