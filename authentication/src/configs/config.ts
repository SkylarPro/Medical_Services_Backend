const fs = require('fs')
const ini = require('ini')
const configFile = fs.readFileSync(__dirname + '/settings.ini', 'utf-8')
const config = ini.parse(configFile)
export default config