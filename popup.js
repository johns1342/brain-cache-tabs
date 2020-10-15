
let currentWindowId
let gatherButton = document.getElementById("gather")
let windowCount = document.getElementById("windowCount")
let tabCount = document.getElementById("tabCount")

let resultsDiv = document.getElementById("resultsDiv")

let searchText = document.getElementById("searchText")
console.log("searchText = " + searchText)

let tabData = []
let searchResults = []

function create_item(result) {
    let item = document.createElement("div")
    item.setAttribute("windowId", result.windowId)
    item.setAttribute("tabId", result.tabId)
    item.classList.add("item")
    item.addEventListener("click", function(event) {
        let windowId = event.currentTarget.getAttribute("windowId")
        let tabId = event.currentTarget.getAttribute("tabId")
        console.log(event.currentTarget.getAttribute("windowId"))
        console.log(event.currentTarget.getAttribute("tabId"))
        console.log(event)
        chrome.tabs.update(parseInt(tabId), {active: true})
        chrome.windows.update(parseInt(windowId), {focused: true})
    })

    let favIcon = document.createElement("span")
    let img = document.createElement("img")
    if (result.favIconUrl) {
        img.src = result.favIconUrl
    } else if (result.url.startsWith("chrome://")) {
        img.src = "chrome://favicon/" + result.favIconUrl
    }
    img.classList.add("favicon")
    favIcon.appendChild(img)

    let title = document.createElement("span")
    title.innerText = result.title
    title.classList.add("title")

    item.appendChild(favIcon)
    item.appendChild(title)
    return item
}

function refresh_results(searchString) {
    console.log("searchString = " + searchString)
    console.log("!searchString = " + !searchString)
    let child
    while (child = resultsDiv.lastChild) {
        resultsDiv.removeChild(child)
    }
    let items = []
    searchResults = []
    for (i = 0, tl = tabData.length; i < tl; i++) {
        if (!searchString || tabData[i].searchText.includes(searchString)) {
            console.log("  found title: " + tabData[i].title)
            items.push(create_item(tabData[i]))
            searchResults.push(tabData[i])
        }
    }
    resultsDiv.append(...items)
}

gatherButton.addEventListener("click", function(ev) {
    console.log("gather " + searchResults.length + "tabs")
    tabIds = searchResults.map(_ => _.tabId)
    tabIds = []
    for (i = 0, srl = searchResults.length; i < srl; i++) {
        if (searchResults[i].windowId != currentWindowId) {
            tabIds.push(searchResults[i].tabId)
        }
    }
    chrome.tabs.move(
        tabIds,
        {
            windowId: currentWindowId,
            index: -1
        })
    window.close()
})

searchText.addEventListener("keyup", function(ev) {
    console.log("key pressed: " + ev.key)
    console.log("input value: " + searchText.value)
    let searchString = searchText.value.toLowerCase()
    refresh_results(searchString)
})

window.onload = function() {
    console.log("onload " + Date())
    let windowsTotal = 0
    let tabsTotal = 0

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
                    let item = {
                        windowId: v.windowId,
                        tabId: v.id,
                        title: v.title,
                        url: v.url,
                        favIconUrl: v.favIconUrl,
                        searchText: v.title.toLowerCase() + "||" + 
                            v.url.toLowerCase().replace(/^https?:\/\//, ''),
                    }
                    tabData.push(item)
                    resultsDiv.append(create_item(item))
                    searchResults.push(item)
                }
                tabsTotal += tabs.length
                tabCount.innerText = tabsTotal
                // console.log(tabIDs)
            })
        }
    })
    searchText.focus()
}

chrome.windows.getCurrent(function (window) {
    currentWindowId = window.id
})