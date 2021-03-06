'use strict';

var assert = require('assert');
var helper = require('../helper');

describe('dust-react-helper', function() {
  var dust;
  require('babel/register');

  beforeEach(function() {
    dust = require('dustjs-linkedin');
  });

  it('should install correctly', function() {
    helper.install(dust);
    assert(dust.helpers.react != null);
  });

  it('should render react component', function() {
    helper.install(dust);
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
    helper.install(dust);
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

  it('should load components with jsx paramaters', function() {
    helper.install(dust, {extension: '.jsx'});
    helper.setReactDir('test');
    var compiled = dust.compile('{@react component="jsx_component.jsx" /}', 'test');
    dust.loadSource(compiled);
    dust.render('test', null, function(err, out) {
      if (err) {
        throw err;
      } else {
        assert(out.indexOf('Hello World') > -1);
      }
    });
  });

  it('should add properties to the data', function() {
    helper.install(dust);
    helper.setReactDir('test');
    var compiled = dust.compile('{@react param1=param1 param2="spoon" param3="{param3}" component="param_component" /}', 'test');
    dust.loadSource(compiled);
    dust.render('test', {param1: 'foon', param3: 'knife'}, function(err, out) {
      if (err) {
        throw err;
      } else {
        assert(/foon/.test(out));
        assert(/knife/.test(out));
        assert(/spoon/.test(out));
      }
    });
  });
});
