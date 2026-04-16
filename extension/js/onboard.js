(function () {
    var currentStep = 1;

    // Populate hour select (1–12)
    function buildHourSelect() {
        var sel = document.getElementById('time-hour');
        for (var h = 1; h <= 12; h++) {
            var opt = document.createElement('option');
            opt.value = h;
            opt.text = h + ':00';
            sel.appendChild(opt);
        }
        // Default to next round hour, sensible range
        var now = new Date();
        var nextHour = now.getHours() + 1;
        var ampm = nextHour >= 12 ? 'PM' : 'AM';
        var displayHour = nextHour > 12 ? nextHour - 12 : (nextHour === 0 ? 12 : nextHour);
        sel.value = displayHour;
        document.getElementById('time-ampm').value = ampm;
    }

    // Toggle time fields based on checkbox
    document.getElementById('use-specific-time').addEventListener('change', function () {
        var fields = document.getElementById('time-fields');
        if (this.checked) {
            fields.classList.remove('hidden');
        } else {
            fields.classList.add('hidden');
        }
    });

    // Navigate between steps
    window.goTo = function (step) {
        document.getElementById('screen-' + currentStep).classList.remove('active');
        document.getElementById('dot-' + currentStep).classList.remove('active');
        document.getElementById('dot-' + currentStep).classList.add('done');

        currentStep = step;
        document.getElementById('screen-' + currentStep).classList.add('active');
        document.getElementById('dot-' + currentStep).classList.remove('done');
        document.getElementById('dot-' + currentStep).classList.add('active');

        if (step === 3) buildSummary();
    };

    // Build summary card on step 3
    function buildSummary() {
        var interval = parseInt(document.getElementById('interval-select').value);
        var useSpecific = document.getElementById('use-specific-time').checked;
        var firstLabel;

        if (useSpecific) {
            var hour = parseInt(document.getElementById('time-hour').value);
            var minute = parseInt(document.getElementById('time-minute').value);
            var ampm = document.getElementById('time-ampm').value;
            firstLabel = hour + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + ampm;
        } else {
            firstLabel = 'In ' + interval + ' minutes';
        }

        document.getElementById('summary').innerHTML =
            '<div class="summary-row"><span class="summary-key">First reminder</span><span class="summary-val">' + firstLabel + '</span></div>' +
            '<div class="summary-row"><span class="summary-key">Repeats every</span><span class="summary-val">' + interval + ' minutes</span></div>' +
            '<div class="summary-row"><span class="summary-key">Work hours only</span><span class="summary-val">Mon &ndash; Fri, 9am &ndash; 5pm</span></div>';
    }

    // Finish — save settings and tell the service worker
    window.finish = function () {
        var interval = parseInt(document.getElementById('interval-select').value);
        var useSpecific = document.getElementById('use-specific-time').checked;

        var settings = {};
        settings[ACTIVITY_INT_OPT] = interval;
        settings[ENABLED_OPT] = true;
        settings[WORK_HOURS_ENABLED_OPT] = WORK_HOURS_ENABLED_DEFAULT;
        settings[WORK_HOURS_START_OPT] = WORK_HOURS_START_DEFAULT;
        settings[WORK_HOURS_END_OPT] = WORK_HOURS_END_DEFAULT;
        settings[WORK_DAYS_OPT] = WORK_DAYS_DEFAULT;

        var firstAlertMins = null;

        if (useSpecific) {
            var hour = parseInt(document.getElementById('time-hour').value);
            var minute = parseInt(document.getElementById('time-minute').value);
            var ampm = document.getElementById('time-ampm').value;
            var hour24 = ampm === 'PM' ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
            firstAlertMins = hour24 * 60 + minute;
        }

        chrome.storage.sync.set(settings, function () {
            chrome.runtime.sendMessage({
                type: 'ONBOARD_COMPLETE',
                firstAlertMins: firstAlertMins,
                interval: interval
            });
            window.close();
        });
    };

    // Init
    buildHourSelect();

})();
