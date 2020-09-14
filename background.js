chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: "#3aa757"}, function() {
        console.log("The color is green")
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
    })
    
    // not having this means it never enables the popup...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: "developer.chrome.com"},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }])
    })
})