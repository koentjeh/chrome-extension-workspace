let configSelector = document.getElementById('config-selector')



let data = [
    {
        "name": "left of screen",
        "options": {
            incognito: true,
            url: "http://www.dumpert.nl?q=it+works",
            focused: true
        },
        "tabs": [
            {

            }
        ]
    }
]




chrome.windows.create({
    focused: false,
    height: screen.height,
    width: screen.width / 2,
    incognito: true,
    top: 0,
    left: screen.width / 2,
    url: 'https://www.dumpert.nl?=it+works'
}, (window) => {

})

chrome.tabs.create({
    windowId: 1,
    active: true,
    index: 2,
    url: "http://localhost:8080"
}, (tab) => {

})
