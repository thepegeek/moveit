// Helper functions used by the settings popup.
// Alarm management is handled by the service worker (chrome_listeners.js)
// via chrome.storage.onChanged listeners.

function enable(callback) {
    if (!callback) callback = function () {};
    var opts = {};
    opts[ENABLED_OPT] = true;
    chrome.storage.sync.set(opts, callback);
}

function disable(callback) {
    if (!callback) callback = function () {};
    var opts = {};
    opts[ENABLED_OPT] = false;
    chrome.storage.sync.set(opts, callback);
}

function isEnabled(callback) {
    chrome.storage.sync.get([ENABLED_OPT], function (items) {
        callback(items[ENABLED_OPT]);
    });
}

function getTodayCompletionCount(callback) {
    var d = new Date();
    var key = 'completions_' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    chrome.storage.local.get([key], function (items) {
        callback(items[key] || 0);
    });
}
