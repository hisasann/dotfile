-- ######################
-- # Right click scroll
-- ######################
local deferred = false
local oldmousepos = {}
local scrollmult = -4

-- Hello World
hs.hotkey.bind({ "cmd", "alt", "ctrl" }, "W", function()
	hs.alert.show("Hello World!")
end)

-- Started right click
overrideRightMouseDown = hs.eventtap.new({ hs.eventtap.event.types.rightMouseDown }, function(e)
	-- hs.alert.show("down")
	deferred = true
	return true
end)

-- Finished right click
overrideRightMouseUp = hs.eventtap.new({ hs.eventtap.event.types.rightMouseUp }, function(e)
	-- hs.alert.show("up")
	if deferred then
		overrideRightMouseDown:stop()
		overrideRightMouseUp:stop()
		hs.eventtap.rightClick(e:location())
		overrideRightMouseDown:start()
		overrideRightMouseUp:start()
		return true
	end
	return false
end)

-- If you hold down the right click and move the trackball up and down, it does the same thing as scrolling.
dragRightToScroll = hs.eventtap.new({ hs.eventtap.event.types.rightMouseDragged }, function(e)
	deferred = false
	oldmousepos = hs.mouse.getAbsolutePosition()
	local dx = e:getProperty(hs.eventtap.event.properties["mouseEventDeltaX"])
	local dy = e:getProperty(hs.eventtap.event.properties["mouseEventDeltaY"])
	local scroll = hs.eventtap.event.newScrollEvent({ dx * scrollmult, dy * scrollmult }, {}, "pixel")
	hs.mouse.setAbsolutePosition(oldmousepos)
	return true, { scroll }
end)

overrideRightMouseDown:start()
overrideRightMouseUp:start()
dragRightToScroll:start()

hs.alert.show("Config Loaded")
