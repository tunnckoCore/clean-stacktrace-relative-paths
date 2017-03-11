/*!
 * clean-stacktrace-relative-paths <https://github.com/tunnckoCore/clean-stacktrace-relative-paths>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')

module.exports = function (cwd) {
  return function cleanStacktraceRelativePaths (line) {
    var m = /.*\((.*)\).*/.exec(line) || []

    return m[1]
      ? line.replace(m[1], path.relative(cwd || process.cwd(), m[1]))
      : line
  }
}
