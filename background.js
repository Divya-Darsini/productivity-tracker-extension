let currentSite = null;
let startTime = null;
let pendingActivities = [];

// Load pending activities from storage on startup
chrome.storage.local.get(['pendingActivities'], (data) => {
    pendingActivities = data.pendingActivities || [];
});

// Listen to tab updates and track site usage
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    await handleSiteSwitch(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        await handleSiteSwitch(tabId);
    }
});

// Handle switching to a new site
async function handleSiteSwitch(tabId) {
    const tab = await chrome.tabs.get(tabId);
    if (!tab.url) return;

    const url = new URL(tab.url);
    const domain = url.hostname;

    const now = new Date();

    // Save previous site time
    if (currentSite && startTime) {
        const duration = Math.floor((now - startTime) / 1000);
        pendingActivities.push({
            site: currentSite,
            startTime: startTime.toISOString(),
            durationSeconds: duration
        });
        await chrome.storage.local.set({ pendingActivities });
    }

    // Start tracking new site
    currentSite = domain;
    startTime = now;
}

// Flush pending activities to the server
async function flushPendingToServer() {
    const { token } = await chrome.storage.local.get('token');
    if (!token) {
        console.warn("No token found. Please log in first.");
        return;
    }

    if (pendingActivities.length === 0) {
        console.log("No activities to sync.");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/activities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ activities: pendingActivities })
        });

        if (res.ok) {
            console.log("Activities synced successfully.");
            pendingActivities = [];
            await chrome.storage.local.set({ pendingActivities });
        } else {
            console.error("Failed to sync:", await res.text());
        }
    } catch (err) {
        console.error("Error syncing to server:", err);
    }
}

// Listen for messages from popup or options
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "syncData") {
        flushPendingToServer();
    }
});
