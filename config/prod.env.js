'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"https://esismaapi.herokuapp.com"',
  API_PATH_REWRITE: {
    '*': 'https://esismaapi.herokuapp.com'
  },
  DOWNLOAD_PATH_REWRITE: {
    '*': 'https://esismaapi.herokuapp.com/get-file'
  },
}
