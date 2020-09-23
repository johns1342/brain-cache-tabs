
let windowID = document.getElementById("windowID")
let tabIndex = document.getElementById("tabIndex")

let windowCount = document.getElementById("windowCount")
let tabCount = document.getElementById("tabCount")

let resultsDiv = document.getElementById("resultsDiv")

let searchText = document.getElementById("searchText")
console.log("searchText = " + searchText)

let tabData = []

searchText.addEventListener("keyup", function(ev) {
    console.log("key pressed: " + ev.key)
    console.log("input value: " + searchText.value)
    let searchString = searchText.value.toLowerCase()
    let child
    while (child = resultsDiv.lastChild) {
        resultsDiv.removeChild(child)
    }
    for (i = 0; i < tabData.length; i++) {
        if (tabData[i].searchText.includes(searchString)) {
            console.log("  found title: " + tabData[i].title)
            let item = document.createElement("div")
            item.setAttribute("windowId", tabData[i].windowId)
            item.setAttribute("tabId", tabData[i].tabId)
            item.classList.add("item")

            let favIcon = document.createElement("span")
            let img = document.createElement("img")
            if (tabData[i].favIconUrl) {
                img.src = tabData[i].favIconUrl
            }
            img.classList.add("favicon")
            favIcon.appendChild(img)

            let title = document.createElement("span")
            title.innerText = tabData[i].title
            title.classList.add("title")

            item.appendChild(favIcon)
            item.appendChild(title)

            resultsDiv.appendChild(item)
        }

    }
})

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
        tabData = []
        for (let i = 0; i < windowIDs.length; i++) {
            chrome.tabs.query({windowId: windowIDs[i]}, function(tabs) {
                console.log(tabs)
                // let tabIDs = []
                for (const v of Object.values(tabs)) {
                    // tabIDs.push(v.id)
                    console.log("title: " + v.title)
                    console.log("  url: " + v.url)
                    console.log("favIconUrl: " + v.favIconUrl)
                    tabData.push({
                        windowId: v.winowId,
                        tabId: v.id,
                        title: v.title,
                        url: v.url,
                        favIconUrl: v.favIconUrl,
                        searchText: v.title.toLowerCase() + "||" + v.url.toLowerCase(),
                    })
                }
                tabsTotal += tabs.length
                tabCount.innerText = tabsTotal
                // console.log(tabIDs)
            })
        }
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