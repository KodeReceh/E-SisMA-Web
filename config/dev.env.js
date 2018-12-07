'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://restapi.fz"',
  API_PATH_REWRITE: {
    '^/api': ''
  },
  DOWNLOAD_PATH_REWRITE: {
    '^/download': '/get-file/'
  },
})
