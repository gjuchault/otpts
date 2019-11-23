import request from 'request'
import semver from 'semver'
const { version } = require('../package.json')

request.get('https://api.npms.io/v2/package/otpts', { json: true }, (err, res, body) => {
  if (err || !body || !body.collected) {
    process.exit(1)
  }

  if (!semver.gt(version, body.collected.metadata.version)) {
    process.exit(1)
  }
})
