const { smart } = require('webpack-merge')

const base = require('./webpack.base.config')
const dev = require('./webpack.prod.config')

module.exports = smart(base, dev)