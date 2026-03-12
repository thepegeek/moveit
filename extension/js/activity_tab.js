var REVIEW_URL = 'https://chromewebstore.google.com/detail/move-it/kopilngnmfklhhjocdfdlokmodibcbmk/reviews';

function fillInActivity() {
    var activityArea = document.getElementById('activity');
    activityArea.innerText = randomActivity();
}

function addShuffleListener() {
    var shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.onclick = function () {
        fillInActivity();
        sendEvent('activity_shuffled');
    };
}

function addDoneListener() {
    var doneButton = document.getElementById('done-button');
    doneButton.onclick = function () {
        chrome.tabs.getCurrent(function (tab) {
            chrome.tabs.remove(tab.id);
        });
    };
}

function loadCompletionCount() {
    var d = new Date();
    var key = COMPLETIONS_KEY_PREFIX + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    chrome.storage.local.get([key], function (items) {
        var count = items[key] || 0;
        var el = document.getElementById('completion-count');
        if (count > 0) {
            el.innerText = 'Completed today: ' + count;
        }
    });
}

function maybeShowReviewPrompt() {
    chrome.storage.local.get([TOTAL_COMPLETIONS_KEY, REVIEW_PROMPTED_KEY], function (items) {
        var total = items[TOTAL_COMPLETIONS_KEY] || 0;
        var prompted = items[REVIEW_PROMPTED_KEY] || false;

        if (total >= REVIEW_PROMPT_THRESHOLD && !prompted) {
            document.getElementById('review-prompt').style.display = 'block';
            sendEvent('review_prompt_shown', { completions_total: total });
        }
    });
}

function dismissReviewPrompt(rated) {
    var update = {};
    update[REVIEW_PROMPTED_KEY] = true;
    chrome.storage.local.set(update);
    document.getElementById('review-prompt').style.display = 'none';
    sendEvent(rated ? 'review_prompt_accepted' : 'review_prompt_dismissed');
}


window.onload = function () {
    addDoneListener();
    addShuffleListener();
    fillInActivity();
    loadCompletionCount();
    maybeShowReviewPrompt();

    document.getElementById('review-rate').onclick = function () {
        dismissReviewPrompt(true);
        window.open(REVIEW_URL, '_blank');
    };

    document.getElementById('review-dismiss').onclick = function () {
        dismissReviewPrompt(false);
    };
};
