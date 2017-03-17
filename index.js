/*!
 * clean-stacktrace-relative-paths <https://github.com/tunnckoCore/clean-stacktrace-relative-paths>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')

/**
 * > Cleans stack traces to use relative paths,
 * instead of absolute paths. Pass a `cwd` if you want
 * to customize, otherwise `process.cwd()` is used by default.
 *
 * Meant to be used as `mapper` argument in [clean-stacktrace][]
 *
 * **Example**
 *
 * ```js
 * const cleanStack = require('clean-stacktrace')
 * const relativePaths = require('clean-stacktrace-relative-paths')
 *
 * const error = new Error('Missing unicorn')
 * console.log(error.stack)
 * // =>
 * // Error: Missing unicorn
 * //     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
 * //     at Module._compile (module.js:409:26)
 * //     at Object.Module._extensions..js (module.js:416:10)
 * //     at Module.load (module.js:343:32)
 * //     at Function.Module._load (module.js:300:12)
 * //     at Function.Module.runMain (module.js:441:10)
 * //     at startup (node.js:139:18)
 *
 * const mapper = relativePaths()
 * const stack = cleanStack(error.stack, mapper)
 * console.log(stack)
 * // =>
 * // Error: Missing unicorn
 * //     at Object.<anonymous> (unicorn.js:2:15)
 * ```
 *
 * @name   relativePaths
 * @param  {String} `[cwd]` custom current working directory
 * @return {Function} a function that can be passed as `mapper` to [clean-stacktrace][]
 * @api public
 */

module.exports = function relativePaths (cwd) {
  return function mapper (line) {
    var m = /at\s+([^\s/]+)?\s?(.*)$/.exec(line)
    if (m) {
      /* istanbul ignore next */
      var filepath = (m[2] && m[2].length ? m[2] : m[1])
      filepath = filepath.replace(/^\(/, '').replace(/\)$/, '')

      var relative = path.relative(cwd || process.cwd(), filepath)
      return line.replace(filepath, relative)
    }

    return line
  }
}
