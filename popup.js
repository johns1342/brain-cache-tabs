
let windowID = document.getElementById("windowID")
let tabIndex = document.getElementById("tabIndex")

let windowCount = document.getElementById("windowCount")
let tabCount = document.getElementById("tabCount")

window.onload = function() {
    console.log("onload " + Date())
    let windowsTotal = 0
    let tabsTotal = 0

    chrome.windows.getCurrent(function(window) {
        windowID.innerText = window.id
        chrome.tabs.query({windowId: window.id, active: true}, function(tabs) {
            if (tabs.length == 1) {
                tabIndex.innerText = tabs[0].index
            } else {
                tabIndex.innerText = tabs.length + " active tabs"
            }
        })
    })

    chrome.windows.getAll(function(windows) {
        console.log(windows)
        let windowIDs = []
        for (const v of Object.values(windows)) {
            windowIDs.push(v.id)
        }
        windowsTotal = windowIDs.length
        windowCount.innerText = windowsTotal
        console.log(windowIDs)
        let firstID = windowIDs[0]
        chrome.tabs.query({windowId: firstID}, function(tabs) {
            console.log(tabs)
            let tabIDs = []
            for (const v of Object.values(tabs)) {
                tabIDs.push(v.id)
                console.log("title: " + v.title)
                console.log("  url: " + v.url)
                console.log("favIconUrl: " + v.favIconUrl)
            }
            tabsTotal += tabIDs.length
            tabCount.innerText = tabsTotal
            console.log(tabIDs)
        })
    })
}

let changeColor = document.getElementById("changeColor")

chrome.storage.sync.get("color", function(data) {
    changeColor.style.backgroundColor = data.color
    changeColor.setAttribute("value", data.color)
})
changeColor.onclick = function(element) {
    let color = element.target.value
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'}
        )
    })
}

chrome.windows.getAll(function(windows) {
    console.log(windows)
    let windowIDs = []
    for (const v of Object.values(windows)) {
        windowIDs.push(v.id)
    }
    console.log(windowIDs)
    let firstID = windowIDs[0]
    chrome.tabs.query({windowId: firstID}, function(tabs) {
        console.log(tabs)
        let tabIDs = []
        for (const v of Object.values(tabs)) {
            tabIDs.push(v.id)
            console.log("title: " + v.title)
            console.log("  url: " + v.url)
            console.log("favIconUrl: " + v.favIconUrl)
        }
        console.log(tabIDs)
    })
})