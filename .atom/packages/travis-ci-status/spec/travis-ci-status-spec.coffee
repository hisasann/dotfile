TravisCiStatus = require '../lib/travis-ci-status'
{$, WorkspaceView, View} = require 'atom'

class StatusBarMock extends View
  @content: ->
    @div class: 'status-bar tool-panel panel-bottom', =>
      @div outlet: 'leftPanel', class: 'status-bar-left'

  attach: ->
    atom.workspaceView.appendToTop(this)

  appendLeft: (item) ->
    @leftPanel.append(item)

describe "TravisCiStatus", ->
  activationPromise = null

  beforeEach ->
    spyOn(atom.project, 'getRepo').andReturn({
      getOriginUrl: ->
        'git@github.com:test/test.git'
    })

    atom.workspaceView = new WorkspaceView
    atom.workspaceView.statusBar = new StatusBarMock()
    atom.workspaceView.statusBar.attach()
    atom.packages.emit('activated')

  describe "when the travis-ci-status:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.travis-ci-status')).not.toExist()

      waitsForPromise ->
        atom.packages.activatePackage('travis-ci-status')

      runs ->
        expect(atom.workspaceView.find('.travis-ci-status')).toExist()
