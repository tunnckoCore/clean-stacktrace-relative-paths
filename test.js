/*!
 * clean-stacktrace-relative-paths <https://github.com/tunnckoCore/clean-stacktrace-relative-paths>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var path = require('path')
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
  // test.ok(/\(\.\./i.test(stack))
  // test.ok(/clean-stacktrace-relative-paths/i.test(stack))
  // test.ok(/test\.js:/i.test(stack))
  done()
})

test('should be used as `mapper` function to `clean-stacktrace`', function (done) {
  var error = new Error('fixture err')
  var stack = cleanStack(error.stack, relativePaths())
  test.ok(/\(test\.js:/.test(stack))
  done()
})
