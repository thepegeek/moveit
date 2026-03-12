// Populate time interval dropdown and wire up its change handler
function initTimeSettings() {
    var timeSelect = document.querySelector('select#time-options');
    timeSelect.innerHTML = '';

    chrome.storage.sync.get([ACTIVITY_INT_OPT], function (items) {
        var currInterval = items[ACTIVITY_INT_OPT];

        var time = 5;
        do {
            var opt = document.createElement('option');
            opt.text = '0:' + (time < 10 ? '0' : '') + time;
            opt.setAttribute('value', time);
            if (time === currInterval) opt.setAttribute('selected', 'selected');
            timeSelect.appendChild(opt);
            time += 5;
        } while (time <= 55);
    });

    timeSelect.onchange = function () {
        var newTime = parseInt(timeSelect.options[timeSelect.selectedIndex].value);
        var newSettings = {};
        newSettings[ACTIVITY_INT_OPT] = newTime;
        chrome.storage.sync.set(newSettings);
    };
}


// Wire up the enabled checkbox
function initEnabledSettings() {
    var enabledSelect = document.querySelector('input#enabled-option');
    isEnabled(function (enabled) {
        enabledSelect.checked = enabled;
    });

    enabledSelect.onchange = function () {
        if (enabledSelect.checked) {
            enable();
        } else {
            disable();
        }
    };
}


// Format minutes-from-midnight as "9:00 AM"
function minsToLabel(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    var suffix = h < 12 ? 'AM' : 'PM';
    var displayH = h === 0 ? 12 : (h > 12 ? h - 12 : h);
    return displayH + ':' + (m < 10 ? '0' + m : m) + ' ' + suffix;
}


// Build a time select element with hourly options
function buildTimeSelect(id, savedMins) {
    var sel = document.getElementById(id);
    sel.innerHTML = '';
    for (var m = 0; m < 1440; m += 60) {
        var opt = document.createElement('option');
        opt.value = m;
        opt.text = minsToLabel(m);
        if (m === savedMins) opt.setAttribute('selected', 'selected');
        sel.appendChild(opt);
    }
}


// Build day-of-week checkboxes
function buildDayCheckboxes(savedDays) {
    var container = document.getElementById('work-days-row');
    container.innerHTML = '';
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(function (name, idx) {
        var label = document.createElement('label');
        label.className = 'day-label';
        label.innerHTML = name + '<input type="checkbox" data-day="' + idx + '"' +
            (savedDays.indexOf(idx) !== -1 ? ' checked' : '') + '>';
        container.appendChild(label);
    });

    container.querySelectorAll('input[type=checkbox]').forEach(function (cb) {
        cb.onchange = saveWorkDays;
    });
}


function saveWorkDays() {
    var checked = [];
    document.querySelectorAll('#work-days-row input[type=checkbox]').forEach(function (cb) {
        if (cb.checked) checked.push(parseInt(cb.getAttribute('data-day')));
    });
    var opts = {};
    opts[WORK_DAYS_OPT] = checked;
    chrome.storage.sync.set(opts);
}


function initWorkHoursSettings() {
    var keys = [WORK_HOURS_ENABLED_OPT, WORK_HOURS_START_OPT, WORK_HOURS_END_OPT, WORK_DAYS_OPT];
    chrome.storage.sync.get(keys, function (items) {
        var enabled = !!items[WORK_HOURS_ENABLED_OPT];
        var start = items[WORK_HOURS_START_OPT] != null ? items[WORK_HOURS_START_OPT] : WORK_HOURS_START_DEFAULT;
        var end = items[WORK_HOURS_END_OPT] != null ? items[WORK_HOURS_END_OPT] : WORK_HOURS_END_DEFAULT;
        var days = items[WORK_DAYS_OPT] || WORK_DAYS_DEFAULT;

        var toggle = document.getElementById('work-hours-enabled');
        toggle.checked = enabled;
        document.getElementById('work-hours-options').style.display = enabled ? 'block' : 'none';

        buildTimeSelect('work-hours-start', start);
        buildTimeSelect('work-hours-end', end);
        buildDayCheckboxes(days);

        toggle.onchange = function () {
            var opts = {};
            opts[WORK_HOURS_ENABLED_OPT] = toggle.checked;
            chrome.storage.sync.set(opts);
            document.getElementById('work-hours-options').style.display = toggle.checked ? 'block' : 'none';
        };

        document.getElementById('work-hours-start').onchange = function () {
            var opts = {};
            opts[WORK_HOURS_START_OPT] = parseInt(this.value);
            chrome.storage.sync.set(opts);
        };

        document.getElementById('work-hours-end').onchange = function () {
            var opts = {};
            opts[WORK_HOURS_END_OPT] = parseInt(this.value);
            chrome.storage.sync.set(opts);
        };
    });
}


function initCompletionCount() {
    getTodayCompletionCount(function (count) {
        document.getElementById('completion-display').innerText = count;
    });
}


window.onload = function () {
    initTimeSettings();
    initEnabledSettings();
    initWorkHoursSettings();
    initCompletionCount();
};
