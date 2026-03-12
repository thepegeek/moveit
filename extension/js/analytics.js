// GA4 Measurement Protocol helper
// Works in both the service worker (via importScripts) and extension pages (via <script> tag)

var GA4_MEASUREMENT_ID = 'G-W88GLKP050';
var GA4_API_SECRET = 'Gq5IcP-NR0Kv_SHvWjhW7Q';
var GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect' +
    '?measurement_id=' + GA4_MEASUREMENT_ID +
    '&api_secret=' + GA4_API_SECRET;
var GA4_CLIENT_ID_KEY = 'ga4_client_id';

// In-memory session tracking — resets each time the service worker restarts or page reloads
var _sessionId = Date.now().toString();
var _lastEventTime = Date.now();


function getClientId(callback) {
    chrome.storage.local.get([GA4_CLIENT_ID_KEY], function (items) {
        if (items[GA4_CLIENT_ID_KEY]) {
            callback(items[GA4_CLIENT_ID_KEY]);
        } else {
            var clientId = Math.random().toString(36).slice(2) + '.' + Date.now();
            var update = {};
            update[GA4_CLIENT_ID_KEY] = clientId;
            chrome.storage.local.set(update);
            callback(clientId);
        }
    });
}


function sendEvent(eventName, params) {
    var now = Date.now();
    var engagementTime = now - _lastEventTime;
    _lastEventTime = now;

    getClientId(function (clientId) {
        var body = {
            client_id: clientId,
            events: [{
                name: eventName,
                params: Object.assign({
                    session_id: _sessionId,
                    engagement_time_msec: engagementTime
                }, params || {})
            }]
        };

        fetch(GA4_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(body)
        }).catch(function () {}); // Never let analytics break the extension
    });
}
