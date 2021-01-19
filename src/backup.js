// "use strict";
//
// // Global values
// let editorContainer = document.getElementById('editor'),
//     editor = {
//         element: editorContainer,
//         boundaries: editorContainer.getBoundingClientRect(),
//         ghost: document.getElementById('ghostpane')
//     }, captureResize = true
//
// // Update Global values
// window.onresize = (event) => {
//     if (!captureResize) return
//
//     editor.boundaries = editor.element.getBoundingClientRect()
//     captureResize = false
//     setTimeout(() => { captureResize = true }, 500)
//
// }
//
//
// renderBrowser(editor.element, 50, 100, 400, 500, 'facebook.com', {active: true})
//
// renderBrowser(editor.element, 500, 200, 200, 350, 'youtube.com', {active: true})
//
//
//
// // mouse events
// let eventState, redraw = false
// function onMouseHover(event, element) {
//     setElementResizeable(event, element, calculateElementBorderEdges(event, element))
//
//     animate(event, element)
//
//     eventState = event
//     redraw = true
// }
//
//
// let selected = {
//     current: null,
//     previous: null
// }
//
// let oldState, isResizing, isMoving, mouseDown = null
// function onDragStart(event, element) {
//     event.preventDefault()
//
//     let borders = calculateElementBorderEdges(event, element)
//
//     isResizing = borders.onTopEdge || borders.onRightEdge || borders.onBottomEdge || borders.onLeftEdge
//
//     mouseDown = {
//         top: event.clientY - element.top,
//         left: event.clientX - element.left,
//         isResizing: isResizing,
//         isMoving: !isResizing && canMove(event, element),
//         onTopEdge: borders.onTopEdge,
//         onRightEdge: borders.onRightEdge,
//         onBottomEdge: borders.onBottomEdge,
//         onLeftEdge: borders.onLeftEdge
//     }
// }
// function onDragEnd(event, element) {
//     let borders = calculateElementBorderEdges(event, element)
//
//     if (mouseDown && mouseDown.isMoving) {
//
//
//
//     }
//
//     mouseDown = null
// }
//
//
//
//
//
// function animate(event, element) {
//     requestAnimationFrame(animate)
//
//     if (!redraw) return
//
//     redraw = false
//
//     if (mouseDown && mouseDown.isResizing) {
//
//     }
//
//     if (mouseDown && mouseDown.isMoving) {
//
//         console.log('test')
//
//         if (element.top < editor.boundaries.top) {
//
//             if (element.left < editor.boundaries.left) {
//                 setTopLeft(editor.boundaries, element)
//                 editor.ghost.style.opacity = 0.2
//             } else if (element.right > editor.boundaries.right) {
//                 setTopRight(editor.boundaries, element)
//                 editor.ghost.style.opacity = 0.2
//             } else {
//                 setTopHalf(editor.boundaries, element)
//                 editor.ghost.style.opacity = 0.2
//             }
//
//         } else if (element.bottom > editor.boundaries.bottom) {
//
//             if (element.left < editor.boundaries.left) {
//                 setBottomLeft(editor.boundaries, element)
//                 editor.ghost.style.opacity = 0.2
//             } else if (element.right > editor.boundaries.right) {
//                 setBottomRight(editor.boundaries, element)
//                 editor.ghost.style.opacity = 0.2
//             } else {
//                 setBottomHalf(editor.boundaries, element)
//                 editor.ghost.style.opacity = 0.2
//             }
//
//         } else if (element.right > editor.boundaries.right) {
//             setRightHalf(editor.boundaries, editor.ghost)
//             editor.ghost.style.opacity = 0.2
//         } else if (element.left > editor.boundaries.left) {
//             setLeftHalf(editor.boundaries, editor.ghost)
//             editor.ghost.style.opacity = 0.2
//         } else {
//             editor.ghost.style.opacity = 0
//         }
//
//
//         element.style.top = (event.clientY - oldState.y) + 'px'
//         element.style.left = (event.clientX - oldState.x) + 'px'
//
//         return;
//     }
// }
//
//
//
//
//
//
//
//
// //content
// function setActiveTabTitle(title) {
//     document.getElementById('browser-active-title').innerText = title
// }
//
// //config
// function getConfigurations() {
//     let browsers = document.querySelectorAll('.browser')
//     let configurations = [];
//
//     for (let i = 0; i < browsers.length; i++) {
//         configurations.push(renderWindowConfig(browsers[i]))
//     }
//
//     console.log(configurations)
// }
//
//
// function renderWindowConfig(browserElement) {
//     let boundaries = browserElement.getBoundingClientRect(),
//         leftOffset = boundaries.left - editorBoundaries.left,
//         topOffset = boundaries.top - editorBoundaries.top,
//         scaleFactorHeight = screen.height / editorBoundaries.height,
//         scaleFactorWidth = screen.width / editorBoundaries.width
//
//     let browserObject = {
//         left: Math.round(leftOffset * scaleFactorWidth),
//         top: Math.round(topOffset * scaleFactorHeight),
//         height: Math.round(boundaries.height * scaleFactorHeight),
//         width: Math.round(boundaries.width * scaleFactorWidth),
//         url: browserElement.querySelector("[data-url]").dataset.url
//     }
//
//     console.log(browserElement.getElementsByClassName('tab'))
//
//     let tabList = [];
//     let tabElements = browserElement.getElementsByClassName('tab')
//     for (let i = 0; i > tabElements.length; i++) {
//         tabList.push(
//             renderTabConfig(tabList[i], i))
//     }
//
//     return {
//         properties: browserObject,
//         tabs: tabList
//     }
// }
//
// function renderTabConfig(tabElement, position) {
//     return {
//         index: position,
//         active: tabElement.querySelector("[data-active]") ?? false,
//         url: tabElement.querySelector("[data-url]")
//     }
// }
//
// function renderBrowser(container, x, y, width, height, url, options = {
//     focused: false,
//     incognito: false
// }) {
//
//     let browser = document.createElement('div')
//     browser.id = 'pane'
//     browser.className = "browser"
//     browser.style.left = x + 'px'
//     browser.style.top = y + 'px'
//     browser.style.width = width + 'px'
//     browser.style.height = height + 'px'
//
//     let menu = document.createElement('div')
//     menu.className = 'browser-menu'
//     browser.append(menu)
//
//     let context = document.createElement('div')
//     context.className = 'browser-context'
//     browser.addEventListener('mousemove',   (event) => { onMouseHover(event, browser) })
//     browser.addEventListener('mousedown',   (event) => { onDragStart(event, browser) })
//     browser.addEventListener('mouseup',     (event) => { onDragEnd(event, browser)})
//     menu.append(context)
//
//     let states = document.createElement('states')
//     states.className = 'browser-states'
//
//     let closed = document.createElement('div')
//     closed.className = 'state close'
//     closed.addEventListener('click', (event) => {
//         browser.remove()
//     })
//     states.append(closed)
//
//     let minimize = document.createElement('div')
//     minimize.className = 'state minimized'
//     minimize.addEventListener('click', (event) => {
//         inactivateBrowser(browser)
//     })
//     states.append(minimize)
//
//     let fullscreen = document.createElement('div')
//     fullscreen.className = 'state fullscreen'
//     fullscreen.addEventListener('click', (event) => {
//         setFullscreen(editor.element.getBoundingClientRect(), browser)
//     })
//     states.append(fullscreen)
//
//     context.append(states)
//
//     let tabs = document.createElement('div')
//     tabs.innerHTML = '<div class="tabs"><div class="tab active">1</div><div class="tab">+</div></div>'
//     context.append(tabs)
//
//     let search = document.createElement('div')
//     search.className = 'browser-url'
//     menu.append(search)
//
//     let input = document.createElement('input')
//     input.type = 'text'
//     input.className = 'browser-search active'
//     input.placeholder = 'example.com'
//     input.value = url
//     search.append(input)
//
//     let content = document.createElement('div')
//     content.className = 'browser-content'
//     browser.append(content)
//
//     let title = document.createElement('h2')
//     title.innerText = urlToTitle(url)
//     content.append(title)
//
//     container.append(browser)
//
//     return browser
// }
//
// function urlToTitle(url) {
//     return url
// }
//
//
//
//
// function scaleFactorX(container) {
//     return screen.width / container.width
// }
// function scaleFactorY(container) {
//     return screen.height / container.height
// }
//
//
//
//
//
// function inZone(event, boundaries) {
//
//     let borderTopPos = event.clientY - boundaries.top,
//         borderLeftPost = event.clientX - boundaries.left
//
//     return {
//
//     }
// }
// function inZoneMargin(event, boundaries, margin = 10) {
//
// }
//
//
//
// function calculateElementBorderEdges(event, element, margin = 5) {
//     element = element.getBoundingClientRect()
//
//     let borderLeftPos = event.clientX - element.left,
//         borderTopPos = event.clientY - element.top
//
//     return {
//         onTopEdge: borderTopPos < margin,
//         onRightEdge: borderLeftPos >= element.width - margin,
//         onBottomEdge: borderTopPos >= element.height - margin,
//         onLeftEdge: borderLeftPos < margin
//     }
// }
//
// function setElementResizeable(event, element, borders) {
//     if (borders.onTopEdge && borders.onLeftEdge || borders.onBottomEdge && borders.onRightEdge) {
//         element.style.cursor = 'nwse-resize'
//     } else if (borders.onTopEdge && borders.onRightEdge || borders.onBottomEdge && borders.onLeftEdge) {
//         element.style.cursor = 'nesw-resize'
//     } else if (borders.onTopEdge || borders.onBottomEdge) {
//         element.style.cursor = 'ns-resize'
//     } else if (borders.onLeftEdge || borders.onRightEdge) {
//         element.style.cursor = 'ew-resize'
//     } else if (canMove(event, element.getBoundingClientRect())) {
//         element.style.cursor = 'move'
//     } else {
//         element.style.cursor = 'default'
//     }
// }
//
// function canMove(event, boundaries) {
//     return  event.clientX > boundaries.left && event.clientX < boundaries.right &&
//         event.clientY > boundaries.top && event.clientY < boundaries.bottom
// }
//
//
// function removeBrowser() {
//
// }
// function inactivateBrowser(window) {
//     window.style.display = 'none'
// }
//
// function setFullscreen(boundaries, element) {
//     element.style.top = boundaries.top + 'px'
//     element.style.left = boundaries.left + 'px'
//     element.style.height = boundaries.height + 'px'
//     element.style.width = boundaries.width + 'px'
// }
// function setHalfScreenHorizontal(boundaries, element) {
//     element.style.height = boundaries.top / 2 + 'px'
//     element.style.width = boundaries.top + 'px'
// }
// function setHalfScreenVertical(boundaries, element) {
//     element.style.height = boundaries.top + 'px'
//     element.style.width = boundaries.top / 2 + 'px'
// }
// function setQuarterScreen(boundaries, element) {
//     element.style.height = boundaries.top / 2 + 'px'
//     element.style.width = boundaries.top / 2 + 'px'
// }
// function setTopHalf(boundaries, element) {
//     setHalfScreenHorizontal(boundaries)
//     element.top = boundaries.top + 'px'
//     element.left = boundaries.left + 'px'
// }
// function setBottomHalf(boundaries, element) {
//     setHalfScreenHorizontal(boundaries)
//     element.top = boundaries.bottom / 2 + 'px'
//     element.left = boundaries.right / 2 + 'px'
// }
// function setLeftHalf(boundaries, element) {
//     setHalfScreenVertical(boundaries, element)
//     element.top = boundaries.top + 'px'
//     element.left = boundaries.right / 2 + 'px'
// }
// function setRightHalf(boundaries, element) {
//     setHalfScreenVertical(boundaries, element)
//     element.top = boundaries.top + 'px'
//     element.left = boundaries.right / 2 + 'px'
// }
// function setTopLeft(boundaries, element) {
//     setQuarterScreen(boundaries, element)
//     element.top = boundaries.top
//     element.left = boundaries.left
// }
// function setTopRight(boundaries, element) {
//     setQuarterScreen(boundaries, element)
//     element.top = boundaries.top + 'px'
//     element.left = boundaries.right / 2 + 'px'
// }
// function setBottomLeft(boundaries, element) {
//     setQuarterScreen(boundaries, element)
//     element.top = boundaries.bottom / 2 + 'px'
//     element.left = boundaries.left
// }
// function setBottomRight(boundaries, element) {
//     element.top = boundaries.bottom / 2 + 'px'
//     element.left = boundaries.right / 2 + 'px'
// }
//
//
//
//
//
// function getElementX(container, element) {
//     return container.left - element.left
// }
// function getElementY(container, element) {
//     return container.top - element.top
// }
//
// function resize(window) {
//
// }
// function scaleFactor(container) {
//     return {
//         x: screen.width / container.width,
//         y: screen.height / container.height
//     }
// }
//
//
//
// // chrome.windows.create({
// //     focused: false,
// //     height: screen.height,
// //     width: screen.width / 2,
// //     incognito: true,
// //     top: 0,
// //     left: screen.width / 2,
// //     url: 'https://www.dumpert.nl?=it+works'
// // }, (window) => {
// //
// // })
// //
// // chrome.tabs.create({
// //     windowId: 1,
// //     active: true,
// //     index: 2,
// //     url: "http://localhost:8080"
// // }, (tab) => {
// //
// // })
