{spawn} = require 'child_process'

BuildMatrixView = require './build-matrix-view'
BuildStatusView = require './build-status-view'
TravisCi = require './travis-ci'

module.exports =
  # Internal: The build matrix bottom panel view.
  buildMatrixView: null

  # Internal: The build status status bar entry view.
  buildStatusView: null

  # Internal: Active the package and initializes any views.
  #
  # Returns nothing.
  activate: ->
    return unless @isGitHubRepo()
    atom.travis = new TravisCi

    atom.workspaceView.command 'travis-ci-status:open-on-travis', =>
      @openOnTravis()

    createStatusEntry = =>
      nwo = @getNameWithOwner()
      @buildMatrixView = new BuildMatrixView(nwo)
      @buildStatusView = new BuildStatusView(nwo, @buildMatrixView)

    if atom.workspaceView.statusBar
      createStatusEntry()
    else
      atom.packages.once 'activated', ->
        createStatusEntry()

  # Internal: Deactive the package and destroys any views.
  #
  # Returns nothing.
  deactivate: ->
    atom.travis = null
    @buildStatusView?.destroy()
    @buildMatrixView?.destroy()

  # Internal: Serialize each view state so it can be restored when activated.
  #
  # Returns an object containing key/value pairs of view state data.
  serialize: ->

  # Internal: Get whether the project repository exists and is hosted on GitHub.
  #
  # Returns true if the repository exists and is hosted on GitHub, else false.
  isGitHubRepo: ->
    repo = atom.project.getRepo()
    return false unless repo?
    /github\.com:/i.test(repo.getOriginUrl())

  # Internal: Get the repoistory's name with owner.
  #
  # Returns a string of the name with owner, or null if the origin URL doesn't
  # exist.
  getNameWithOwner: ->
    repo = atom.project.getRepo()
    url  = repo.getOriginUrl()
    return null unless url?
    url.replace(/git@github\.com:/i, '')
      .replace(/https:\/\/github\.com\//i, '')
      .replace(/\.git/i, '')

  # Internal: Open the project on Travis CI in the default browser.
  #
  # Returns nothing.
  openOnTravis: ->
    nwo = @getNameWithOwner()
    url = "https://travis-ci.org/#{nwo}"
    spawn('open', [url])
