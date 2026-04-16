importScripts('analytics.js');

var ACTIVITIES = [
    "10 Jumping Jacks",
    "Wiggle your whole body for 10 seconds",
    "Bring Right Elbow to Left Knee and Left Elbow to Right Knee 10 Times",
    "Jump in Place 10 times",
    "Rub your entire right arm with your left hand",
    "Squeeze your right hand firmly with your left hand",
    "10 Wall Pushups",
    "10 Pushups",
    "Spin in a circle 3 times to the right, then the left",
    "Touch left hand to the bottom of right foot, do the opposite and then repeat 10 times",
    "Shake the right side of your body",
    "Make ten small circle with your arms",
    "Ten jumps over a pencil on the floor",
    "Jump as high as you can 7 times",
    "Rub your entire left arm with your right hand",
    "Make 10 large circles with your arms",
    "Complete 8 situps or crunches",
    "March in place on the spot to a count of 10",
    "Take 10 deep breaths",
    "Climb a ladder on the spot for a count of 10",
    "Run on spot for 15 seconds",
    "High Knees on the spot for a count of 10",
    "Punch or jab the air for a count of 10",
    "Hop from your left to right foot for 10 seconds",
    "Hold a wall sit position for 20 seconds",
    "Plank on the spot for 10 seconds",
    "Complete 10 on the spot triple jumps",
    "Slowly stretch your neck, chest, shoulders, and hips",
    "Sitting in a chair, pretend to complete the front crawl/freestyle swim for 30 seconds",
    "Hold on to the seat of your chair and pedal your legs as if riding a bike for 30 seconds",
    "Sit in your chair and using your imaginary paddle to paddle a canoe (both sides) for 30 seconds",
    "Try to blink one eye while snapping on the opposite side's hand 15 times in a row",
    "Walk around the room using only your heels",
    "15 Jumping Jacks",
    "Complete 10 Standing Squats",
    "Jog on the spot for 15 seconds",
    "Close your eyes and do nothing for a minute",
    "Pretend to complete 5 jump shots",
    "Arm pump. Pump both of your arms over your head for 30 seconds.",
    "Shoulder raises. Raise your shoulder to your ear, hold and then relax. Repeat for 30 seconds",
    "Tricep dips. Put your arms behind your back, resting on your chair and slowly raise and lower yourself",
    "Neck rotations. Drop your chin and roll your neck. Raise your chin up and bend your neck to each side",
    "Stand up and do 10 calf raises",
    "Do 10 squats with your chair",
    "Perform 10 lunges on each leg",
    "Do 5 push-ups against a wall",
    "Stand up and jog in place for 30 seconds",
    "Jump up and down 10 times",
    "Do 10 arm circles forwards and backwards",
    "Do 10 standing calf raises",
    "Hold a squat for 30 seconds",
    "Run in place with high knees for 30 seconds",
    "Do 10 jumping lunges",
    "Do 10 jumping squats",
    "Complete 10 mountain climbers",
    "Do 10 burpees",
    "Hold a plank for 30 seconds",
    "Do 10 hip raises",
    "Do 10 leg lifts while sitting in a chair",
    "Do 10 leg raises while standing",
    "Do 10 squats while holding a water bottle in each hand",
    "Do 10 pushups with your feet on a chair",
    "Do 10 tricep dips with your hands on a chair",
    "Do 10 bicep curls with a water bottle",
    "Do 10 overhead presses with a water bottle",
    "Do 10 lateral raises with a water bottle",
    "Do 10 crunches",
    "Do 10 bicycles",
    "Do 10 Russian twists with a water bottle",
    "Do 10 leg lifts on each leg while lying on your back",
    "Do 10 glute bridges",
    "Do 10 fire hydrants on each leg",
    "Do 10 donkey kicks on each leg",
    "Do 10 bird dogs on each side",
    "Do 10 scissor kicks",
    "Do 10 plank jacks",
    "Do 10 frog jumps",
    "Do 10 star jumps",
    "Do 10 butt kicks",
    "Do 10 jump squats",
    "Do 10 tuck jumps",
    "Do 10 skater jumps",
    "Do 10 lateral shuffles to the right and left",
    "Do 10 walking lunges",
    "Do 10 side lunges on each leg",
    "Do 10 sumo squats",
    "Do 10 air punches",
    "Do 10 karate chops with each arm",
    "Do 10 hip circles",
    "Do 10 wrist circles in each direction",
    "Do 10 ankle circles in each direction",
    "Do 10 standing twists with a water bottle",
    "Do 10 squats with a water bottle",
    "Do 10 lunges with a water bottle in each hand",
    "Do 10 calf raises on the edge of a step",
    "Do 10 dips with your hands on a step",
    "Do 10 step-ups on a step",
    "Do 10 box jumps onto a step",
    "Do 10 bench dips with your hands on a bench",
    "Do 10 sit-ups with your feet under a bench",
    "Do 10 leg lifts with your hands on a bench",
    "Do 10 push-ups with your feet on a bench",
    "Do 10 jumping jacks while holding a water bottle in each hand",
    "Do 10 bear crawls",
    "Do 10 spiderman crawls",
    "Do 10 inchworms",
    "Do 10 squat jumps onto a bench",
    "Do 10 tuck jumps onto a bench",
    "Do 10 box step-ups with a knee raise",
    "Do 10 mountain climbers with your hands on a bench",
    "Do 10 Bulgarian split squats on each leg",
    "Do 10 jump lunges onto a bench",
    "Do 10 plank shoulder taps",
    "Squat down and touch the ground, then jump up as high as you can 5 times",
    "Take a deep breath and touch your toes, hold for 10 seconds and repeat 3 times",
    "Do 10 calf raises on each leg",
    "Pretend to jump rope for 30 seconds",
    "Do 10 lunges on each leg",
    "March in place and bring your knees up high for 30 seconds",
    "Do 10 tricep dips using a chair",
    "Stand up and touch your toes, then reach up high and touch the ceiling 10 times",
    "Do 10 squats and hold the last one for 10 seconds",
    "Pretend to jump over a hurdle 10 times",
    "Do 10 pushups with a shoulder tap",
    "Hold a wall sit for 30 seconds",
    "Jump as high as you can and touch the ceiling 5 times",
    "Do 10 Russian twists",
    "Do 10 bicycle crunches",
    "Walk on your hands and feet like a crab for 30 seconds",
    "Do 10 single-leg deadlifts on each leg",
    "Do 10 lateral jumps over an imaginary line",
    "Do 10 jumping jacks, but clap your hands above your head each time",
    "Do 10 pushups and then hold the plank position for 30 seconds",
    "Jump over an imaginary jump rope for 30 seconds",
    "Do 10 diamond pushups",
    "Do 10 commandos",
    "Do 10 high knees and 10 butt kicks, alternating each for 30 seconds",
    "Do 10 sit-ups and then hold the boat pose for 30 seconds",
    "Do 10 supermans",
    "Do 10 jump lunges and then hold a lunge for 10 seconds",
    "Do 10 up-down planks",
    "Do 10 alternating side planks",
    "Do 10 pike pushups",
    "Do 10 backward lunges and then hold a lunge for 10 seconds",
    "Do 10 decline pushups",
    "Do 10 skaters",
    "Do 10 leg raises",
    "Do 10 wall angels",
    "Do 10 T pushups",
    "Do 10 cross jacks",
    "Do 10 tricep pushups",
    "Do 10 side plank dips on each side",
    "Do 10 alternating side lunges",
    "Do 10 plank up-downs",
    "Do 10 squat jumps and hold the last one for 10 seconds",
    "Do 10 bear plank shoulder taps",
    "Do 10 windshield wipers",
    "Do 10 inchworm pushups",
    "Do 10 flutter kicks",
    "Do 10 side plank leg lifts on each side"
];

function randomActivity() {
    return ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
}


// Chrome API settings names
var ACTIVITY_INT_OPT = "activity_interval",
    ENABLED_OPT = "activities_enabled",
    WORK_HOURS_ENABLED_OPT = "work_hours_enabled",
    WORK_HOURS_START_OPT = "work_hours_start",
    WORK_HOURS_END_OPT = "work_hours_end",
    WORK_DAYS_OPT = "work_days",
    COMPLETIONS_KEY_PREFIX = "completions_",
    TOTAL_COMPLETIONS_KEY = "total_completions",
    REVIEW_PROMPTED_KEY = "review_prompted",
    REVIEW_PROMPT_THRESHOLD = 10;

// Defaults
var ACTIVITY_INT_DEFAULT = 15,
    ENABLED_OPT_DEFAULT = true,
    WORK_HOURS_ENABLED_DEFAULT = false,
    WORK_HOURS_START_DEFAULT = 540,   // 9:00 AM in minutes
    WORK_HOURS_END_DEFAULT = 1020,    // 5:00 PM in minutes
    WORK_DAYS_DEFAULT = [1, 2, 3, 4, 5]; // Mon–Fri


// Listen for storage changes that require a timer reset
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.hasOwnProperty(ACTIVITY_INT_OPT)) {
        isEnabled(function (enabled) {
            if (enabled) setExerciseTimeInterval(changes[ACTIVITY_INT_OPT].newValue);
        });
    }
    if (changes.hasOwnProperty(ENABLED_OPT)) {
        if (changes[ENABLED_OPT].newValue) {
            resetTimer();
            sendEvent('extension_enabled');
        } else {
            chrome.alarms.clearAll();
            sendEvent('extension_disabled');
        }
    }
});


// Set default settings on installation
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        // Open onboarding tab — timer starts after user completes setup
        chrome.tabs.create({ url: 'onboard.html' });
        sendEvent('extension_installed', { version: chrome.runtime.getManifest().version });
    } else {
        resetTimer();
        sendEvent('extension_updated', {
            version: chrome.runtime.getManifest().version,
            previous_version: details.previousVersion || ''
        });
    }
});


// Handle onboarding completion — set first alert or start normal timer
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type !== 'ONBOARD_COMPLETE') return;

    if (message.firstAlertMins !== null && message.firstAlertMins !== undefined) {
        // Calculate minutes until the chosen time (next occurrence)
        var now = new Date();
        var currentMins = now.getHours() * 60 + now.getMinutes();
        var delay = message.firstAlertMins - currentMins;
        if (delay <= 0) delay += 1440; // Roll to next day if time already passed
        // Store so alarm handler knows this is the first-ever alert
        chrome.storage.local.set({ first_alert_pending: true });
        chrome.alarms.create({ delayInMinutes: delay });
    } else {
        // No specific time — start interval immediately
        setExerciseTimeInterval(message.interval);
    }
});


chrome.runtime.onStartup.addListener(function () {
    isEnabled(function (enabled) {
        if (enabled) resetTimer();
    });
});


// Capture activity alarms — check enabled + work hours before showing activity
chrome.alarms.onAlarm.addListener(function (alarm) {
    // If this is the scheduled first alert, clear the flag then proceed normally
    chrome.storage.local.get(['first_alert_pending'], function (items) {
        if (items.first_alert_pending) {
            chrome.storage.local.remove('first_alert_pending');
        }
        isEnabled(function (enabled) {
            if (!enabled) return;
            isInWorkHours(function (inHours) {
                if (!inHours) {
                    resetTimer();
                    return;
                }
                forceCompleteExercise(function () {}, function () {
                    incrementCompletionCount();
                    resetTimer();
                });
            });
        });
    });
});


function forceCompleteExercise(callback, activityDoneCallback) {
    var activityTab = new ActivityTab(activityDoneCallback);
    activityTab.start(callback);
}

function ActivityTab(finishedCallback) {
    this.finishedCallback = finishedCallback;
    var self = this;

    this.start = function (callback) {
        chrome.tabs.query({ active: true }, function (tabs) {
            self.previousTab = tabs[0];

            var newTabSettings = {
                active: true,
                url: 'activity_tab.html'
            };
            chrome.tabs.create(newTabSettings, function (activityTab) {
                self.tab = activityTab;
                chrome.tabs.onActivated.addListener(self.tabChangeListener);
                chrome.tabs.onRemoved.addListener(self.tabCloseListener);
                callback();
            });
        });
    };

    this.tabChangeListener = function (activeInfo) {
        // Force users back to our tab if they navigate away
        if (activeInfo.tabId !== self.tab.id) {
            chrome.tabs.update(self.tab.id, { active: true });
        }
    };
    this.tabChangeListener = this.tabChangeListener.bind(this);

    this.tabCloseListener = function (tabId, removeInfo) {
        if (tabId === self.tab.id) {
            self.activityIsDone();
        } else if (self.previousTab && tabId === self.previousTab.id) {
            self.previousTab = null;
        }
    };
    this.tabCloseListener = this.tabCloseListener.bind(this);

    this.activityIsDone = function () {
        chrome.tabs.onActivated.removeListener(this.tabChangeListener);
        chrome.tabs.onRemoved.removeListener(this.tabCloseListener); // Fixed: was tabRemoveListener

        if (this.previousTab) {
            chrome.tabs.update(this.previousTab.id, { active: true });
        }

        this.finishedCallback();
    };
    this.activityIsDone = this.activityIsDone.bind(this);
}


function setExerciseTimeInterval(intervalInMinutes) {
    chrome.alarms.create({ delayInMinutes: intervalInMinutes }).catch(console.log);
}


// Fixed: check isEnabled before re-arming the alarm
function resetTimer() {
    isEnabled(function (enabled) {
        if (!enabled) return;
        chrome.storage.sync.get([ACTIVITY_INT_OPT], function (items) {
            setExerciseTimeInterval(items[ACTIVITY_INT_OPT]);
        });
    });
}


function enable(callback) {
    if (!callback) callback = function () {};
    resetTimer();
    var opts = {};
    opts[ENABLED_OPT] = true;
    chrome.storage.sync.set(opts, callback);
}

function disable(callback) {
    if (!callback) callback = function () {};
    chrome.alarms.clearAll();
    var opts = {};
    opts[ENABLED_OPT] = false;
    chrome.storage.sync.set(opts, callback);
}

function isEnabled(callback) {
    chrome.storage.sync.get([ENABLED_OPT], function (items) {
        callback(items[ENABLED_OPT]);
    });
}


// Returns true via callback if current time is within configured work hours (or if work hours is disabled)
function isInWorkHours(callback) {
    var keys = [WORK_HOURS_ENABLED_OPT, WORK_HOURS_START_OPT, WORK_HOURS_END_OPT, WORK_DAYS_OPT];
    chrome.storage.sync.get(keys, function (items) {
        if (!items[WORK_HOURS_ENABLED_OPT]) {
            callback(true);
            return;
        }
        var now = new Date();
        var currentMins = now.getHours() * 60 + now.getMinutes();
        var currentDay = now.getDay();
        var workDays = items[WORK_DAYS_OPT] || WORK_DAYS_DEFAULT;
        var dayOk = workDays.indexOf(currentDay) !== -1;
        var timeOk = currentMins >= items[WORK_HOURS_START_OPT] && currentMins < items[WORK_HOURS_END_OPT];
        callback(dayOk && timeOk);
    });
}


// Completion counter — stored per calendar day in local storage
function getTodayKey() {
    var d = new Date();
    return COMPLETIONS_KEY_PREFIX + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function incrementCompletionCount() {
    var todayKey = getTodayKey();
    chrome.storage.local.get([todayKey, TOTAL_COMPLETIONS_KEY], function (items) {
        var newDailyCount = (items[todayKey] || 0) + 1;
        var newTotalCount = (items[TOTAL_COMPLETIONS_KEY] || 0) + 1;
        var updated = {};
        updated[todayKey] = newDailyCount;
        updated[TOTAL_COMPLETIONS_KEY] = newTotalCount;
        chrome.storage.local.set(updated);
        sendEvent('activity_completed', { completions_today: newDailyCount, completions_total: newTotalCount });
    });
}

function getTodayCompletionCount(callback) {
    var key = getTodayKey();
    chrome.storage.local.get([key], function (items) {
        callback(items[key] || 0);
    });
}
