/*!
 * clean-stacktrace-relative-paths <https://github.com/tunnckoCore/clean-stacktrace-relative-paths>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var path = require('path')
var isCI = require('is-ci')
var test = require('mukla')
var cleanStack = require('clean-stacktrace')
var relativePaths = require('./index')

test('should export a function that returns a mapper function', function (done) {
  var mapper = relativePaths()
  test.strictEqual(typeof mapper, 'function')
  done()
})

test('should allow passing custom cwd', function (done) {
  var er = new Error('abc error foo')
  var mapper = relativePaths('../qux')
  var stack = cleanStack(er.stack, mapper)

  var fp = '..' + path.sep + 'clean-stacktrace-relative-paths' + path.sep + 'test.js'
  test.strictEqual(stack.indexOf(fp) > 5, true)
  done()
})

test('should be used as `mapper` function to `clean-stacktrace`', function (done) {
  var error = new Error('fixture err')
  var stack = cleanStack(error.stack, relativePaths())
  test.ok(/\(test\.js:/.test(stack))
  done()
})

test('should work for paths non in parens', function qxu (done) {
  var line = 'at Function.qxu (/home/charlike/apps/clean-stacktrace-relative-paths/test.js:44:15)'
  var relative = relativePaths()
  var res = relative(line)

  if (isCI) {
    test.strictEqual(/at Function\.qxu/.test(res), true)
    test.strictEqual(/\.\./.test(res), true)
    test.strictEqual(/test\.js:44:15/.test(res), true)
  } else {
    test.strictEqual(res, 'at Function.qxu (test.js:44:15)')
  }
  done()
})

test('should work for lines like "at /full/absolute/path.js:3:1" with no "place"', function (done) {
  var line = 'at /home/charlike/apps/clean-stacktrace-relative-paths/test.js:3:1'
  var res = relativePaths()(line)

  if (isCI) {
    test.strictEqual(/at \.\./i.test(res), true)
    test.strictEqual(/test\.js:3:1/i.test(res), true)
  } else {
    test.strictEqual(res, 'at test.js:3:1')
  }
  done()
})
