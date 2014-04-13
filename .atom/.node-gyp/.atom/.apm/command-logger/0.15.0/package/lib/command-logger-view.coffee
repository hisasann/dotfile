_ = require 'underscore-plus'
{$$$, ScrollView} = require 'atom'
d3 = require 'd3-browserify'
humanize = require 'humanize-plus'

module.exports =
class CommandLoggerView extends ScrollView
  @content: ->
    @div class: 'pane-item padded command-logger', tabindex: -1, =>
      @div class: 'summary', outlet: 'summary', =>
        @span class: 'text-highlight', outlet: 'categoryHeader'
        @span class: 'text-info', outlet: 'categorySummary'

        @div class: 'text-subtle', """
          Below is a heat map of all the commands you've run in Atom for the
          current project.
        """

        @div class: 'text-subtle', """
          Each colored area represents a different package and you can zoom in
          and out by clicking it.
        """

      @div class: 'tree-map', outlet: 'treeMap'

  ignoredEvents: [
    'core:backspace'
    'core:cancel'
    'core:confirm'
    'core:delete'
    'core:move-down'
    'core:move-left'
    'core:move-right'
    'core:move-up'
    'editor:newline'
    'tree-view:directory-modified'
  ]

  initialize: ({@uri, @eventLog}) ->
    super

  afterAttach: (onDom) ->
    @addTreeMap() if onDom

  copy: ->
    new CommandLoggerView({@uri, @eventLog})

  getUri: -> @uri

  getTitle: -> 'Command Logger'

  createNodes:  ->
    categories = {}
    for eventName, details of @eventLog
      continue if _.contains(@ignoredEvents, eventName)
      categoryStart = eventName.indexOf(':')
      if categoryStart is -1
        categoryName = 'Uncategorized'
      else
        categoryName = _.humanizeEventName(eventName.substring(0, categoryStart))
      category = categories[categoryName]
      unless category
        category =
          name: _.humanizeEventName(categoryName)
          children: []
        categories[categoryName] = category
      category.children.push
        name: "#{_.humanizeEventName(eventName.substring(categoryStart + 1))} #{details.count}"
        size: details.count
    _.toArray(categories)

  createNodeContent: (node) ->
    $$$ ->
      @div style: "height:#{node.dy - 1}px;width:#{node.dx - 1}px", =>
        @span node.name

  updateCategoryHeader: (node) ->
    @categoryHeader.text("#{node.name} Commands")
    reduceRunCount = (previous, current) ->
      if current.size?
        previous + current.size
      else if current.children?.length > 0
        current.children.reduce(reduceRunCount, previous)
      else
        previous
    runCount = node.children.reduce(reduceRunCount, 0)
    reduceCommandCount = (previous, current) ->
      if current.children?.length > 0
        current.children.reduce(reduceCommandCount, previous)
      else
        previous + 1
    commandCount = node.children.reduce(reduceCommandCount, 0)

    commandText = "#{humanize.intComma(commandCount)} #{humanize.pluralize(commandCount, 'command')}"
    invocationText = "#{humanize.intComma(runCount)} #{humanize.pluralize(runCount, 'invocation')}"
    @categorySummary.text(" (#{commandText}, #{invocationText})")

  updateTreeMapSize: ->
    @treeMap.width(@width())
    @treeMap.height(@height() - @summary.outerHeight())

  addTreeMap: ->
    root =
     name: 'All'
     children: @createNodes()
    node = root

    @treeMap.empty()

    @updateCategoryHeader(root)
    @updateTreeMapSize()
    w = @treeMap.width()
    h = @treeMap.height()

    x = d3.scale.linear().range([0, w])
    y = d3.scale.linear().range([0, h])
    color = d3.scale.category20()

    zoom = (d) =>
      @updateCategoryHeader(d)
      kx = w / d.dx
      ky = h / d.dy
      x.domain([d.x, d.x + d.dx])
      y.domain([d.y, d.y + d.dy])

      t = svg.selectAll('g.node')
             .transition()
             .duration(750)
             .attr('transform', (d) -> "translate(#{x(d.x)},#{y(d.y)})")

      t.select('rect')
       .attr('width', (d) -> kx * d.dx - 1)
       .attr('height', (d) -> ky * d.dy - 1)

      t.select('.foreign-object')
       .attr('width', (d) -> kx * d.dx - 1)
       .attr('height', (d) -> ky * d.dy - 1)

      t.select('.command-logger-node-text div')
       .attr('style', (d) -> "height:#{ky * d.dy - 1}px;width:#{kx * d.dx - 1}px")

      node = d
      d3.event.stopPropagation()

    treemap = d3.layout.treemap()
                       .round(false)
                       .size([w, h])
                       .sticky(true)
                       .value((d) -> d.size)

    svg = d3.select(@treeMap[0])
            .append('div')
            .style('width', "#{w}px")
            .style('height', "#{h}px")
            .append('svg')
            .attr('width', w)
            .attr('height', h)
            .append('g')
            .attr('transform', 'translate(.5,.5)')

    nodes = treemap.nodes(root).filter((d) -> not d.children)

    cell = svg.selectAll('g')
              .data(nodes)
              .enter()
              .append('g')
              .attr('class', 'node')
              .attr('transform', (d) -> "translate(#{d.x},#{d.y})")
              .on('click', (d) -> if node is d.parent then zoom(root) else zoom(d.parent))

    cell.append('rect')
        .attr('width', (d) -> Math.max(0, d.dx - 1))
        .attr('height', (d) -> Math.max(0, d.dy - 1))
        .style('fill', (d) -> color(d.parent.name))

    cell.append('foreignObject')
        .attr('width', (d) -> Math.max(0, d.dx - 1))
        .attr('height', (d) -> Math.max(0, d.dy - 1))
        .attr('class', 'foreign-object')
        .append('xhtml:body')
        .attr('class', 'command-logger-node-text')
        .html((d) => @createNodeContent(d))

    d3.select(@[0]).on('click', -> zoom(root))
