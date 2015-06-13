'use strict';

var assert = require('assert');
var helper = require('../helper');

describe('dust-react-helper', function() {
  var dust;
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
});
