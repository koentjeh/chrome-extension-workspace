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
    focused: true,
    height: screen.height,
    width: screen.width / 2,
    incognito: false,
    top: 0,
    left: 0,
    url: 'https://jira.maxserv.com/issues/?filter=16208'
}, (window) => {

})

chrome.windows.create({
    focused: false,
    height: screen.height,
    width: screen.width / 2,
    incognito: false,
    top: 0,
    left: screen.width / 2,
    url: 'https://jira.maxserv.com/secure/Tempo.jspa#/my-work/week?type=TIME'
}, (window) => {

})

chrome.windows.getCurrent((window) => {
    chrome.windows.remove(window.id)
})

// chrome.tabs.create({
//     windowId: 99,
//     active: false,
//     index: 1,
//     url: "https://jira.maxserv.com/secure/Tempo.jspa#/my-work/week?type=TIME"
// }, (tab) => {
//
// })
