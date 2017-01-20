import async from 'async'
import path from 'path'
import chalk from 'chalk'
import toJSON from 'shp2json'
import JSONStream from 'JSONStream'
import through2 from 'through2'
import map from 'through2-asyncmap'
import plural from 'plural'
import once from 'once'
import request from 'superagent'
import states from './states'
import _debug from 'debug'
const debug = _debug('neighborhoods')

export default ({ onBoundary, onFinish }) => {
  if (!onBoundary) throw new Error('Missing onBoundary!')
  if (!onFinish) throw new Error('Missing onFinish!')
  onFinish = once(onFinish)
  async.forEach(states, async.ensureAsync(process), onFinish)


  function process(url, cb) {
    cb = once(cb)
    debug(chalk.bold(`Processing boundary file ${url}`))
    let count = 0

    const srcStream = request.get(url).buffer(false)

    toJSON(srcStream)
      .pipe(JSONStream.parse('features.*'))
      .pipe(map.obj((feat, done) => {
        ++count
        onBoundary(feat, done)
      }))
      .once('error', (err) => cb(err))
      .once('finish', () => {
        debug(`  -- ${chalk.cyan(`Parsed ${url} and inserted ${count} boundaries`)}`)
        cb()
      })
  }
}
