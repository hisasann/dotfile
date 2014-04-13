https = require 'https'

module.exports =
# Internal: Interacts with the Travis CI API.
class TravisCI
  # Internal: Request the most recent build status for the repo.
  #
  # nwo      - The string repo owner and name.
  # callback - The function callback that takes error and data arguments.
  #
  # Examples
  #
  #   travis.repo 'tombell/travis-ci-status',  (err, data) ->
  #      ...
  #
  # Returns nothing.
  repo: (nwo, callback) ->
    @request('GET', "/repos/#{nwo}", callback)

  # Internal: Request the specific build for the repo.
  #
  # nwo      - The string repo owner and name.
  # id       - The number build ID.
  # callback - The function callback that takes error and data arguments.
  #
  # Examples
  #
  #   travis.build 'tombell/travis-ci-status', 12345, (err, data) ->
  #     ...
  #
  # Returns nothing.
  build: (nwo, id, callback) ->
    @request('GET', "/repos/#{nwo}/builds/#{id}", callback)

  # Internal: Make a request to the Travis CI API, and return the response body
  # in the callback.
  #
  # method   - The string HTTP method.
  # path     - The string API path.
  # callback - The function callback that takes error and data arguments.
  #
  # Examples
  #
  #   travis.request 'GET', '/repos/tombell/travis-ci-status', (err, data) ->
  #     ...
  #
  # Returns nothing.
  request: (method, path, callback) ->
    options =
      'hostname': 'api.travis-ci.org'
      'port': 443
      'path': path
      'method': method.toUpperCase()
      'headers':
        'Content-Type': 'application/json'

    req = https.request options, (res) ->
      data = ''
      res.on 'data', (chunk) ->
        data += chunk

      res.on 'end', ->
        json = JSON.parse(data)
        callback(null, json)

    req.on 'error', (err) ->
      callback(err, null)

    req.end()
