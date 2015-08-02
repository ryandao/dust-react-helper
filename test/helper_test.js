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

  it('should error when given an invalid react component path', function() {
    var compiled = dust.compile('{@react component="./test/heavy_metal" /}', 'metal');
    dust.loadSource(compiled);
    dust.render('metal', null, function(err, out) {
      assert(err.code === 'MODULE_NOT_FOUND')
    });
  });

  it('should error when a react component fails', function() {
    var compiled = dust.compile('{@react component="./test/bad_component" /}', 'bad');
    dust.loadSource(compiled);
    dust.render('bad', null, function(err, out) {
      assert.notEqual(err, null);
    });
  });
});
