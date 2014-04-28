/**
 * Created by Administrator on 2014/4/25.
 */
/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
(function (a) {
    a.widget("mobile.datebox", a.mobile.widget, {options: {version: "2-1.4.0-2013070300", mobVer: parseInt(a.mobile.version.replace(/\./g, "")), theme: false, themeDefault: "a", themeHeader: "a", mode: false, centerHoriz: false, centerVert: false, transition: "pop", useAnimation: true, hideInput: false, hideFixedToolbars: false, lockInput: true, enhanceInput: true, zindex: "500", clickEvent: "vclick", clickEventAlt: "click", resizeListener: true, defaultValue: false, showInitialValue: false, dialogEnable: false, dialogForce: false, enablePopup: false, popupPosition: false, popupForceX: false, popupForceY: false, useModal: false, useInline: false, useInlineBlind: false, useHeader: true, useImmediate: false, useNewStyle: false, useAltIcon: false, overrideStyleClass: false, useButton: true, useFocus: false, useClearButton: false, useCollapsedBut: false, usePlaceholder: false, openCallback: false, openCallbackArgs: [], closeCallback: false, closeCallbackArgs: [], startOffsetYears: false, startOffsetMonths: false, startOffsetDays: false, afterToday: false, beforeToday: false, notToday: false, maxDays: false, minDays: false, maxYear: false, minYear: false, blackDates: false, blackDatesRec: false, blackDays: false, minHour: false, maxHour: false, minuteStep: 1, minuteStepRound: 0, rolloverMode: {m: true, d: true, h: true, i: true, s: true}, useLang: "default", lang: {"default": {setDateButtonLabel: "Set Date", setTimeButtonLabel: "Set Time", setDurationButtonLabel: "Set Duration", calTodayButtonLabel: "Jump to Today", titleDateDialogLabel: "Set Date", titleTimeDialogLabel: "Set Time", daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], daysOfWeekShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsOfYearShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], durationLabel: ["Days", "Hours", "Minutes", "Seconds"], durationDays: ["Day", "Days"], timeFormat: 24, headerFormat: "%A, %B %-d, %Y", tooltip: "Open Date Picker", nextMonth: "Next Month", prevMonth: "Previous Month", dateFieldOrder: ["m", "d", "y"], timeFieldOrder: ["h", "i", "a"], slideFieldOrder: ["y", "m", "d"], dateFormat: "%Y-%m-%d", useArabicIndic: false, isRTL: false, calStartDay: 0, clearButton: "Clear", durationOrder: ["d", "h", "i", "s"], meridiem: ["AM", "PM"], timeOutput: "%k:%M", durationFormat: "%Dd %DA, %Dl:%DM:%DS", calDateListLabel: "Other Dates", calHeaderFormat: "%B %Y"}}}, _enhanceDate: function () {
        a.extend(this._date.prototype, {copy: function (c, b) {
            if (typeof c === "undefined") {
                c = [0, 0, 0, 0, 0, 0, 0]
            }
            if (typeof b === "undefined") {
                b = [0, 0, 0, 0, 0, 0, 0]
            }
            while (c.length < 7) {
                c.push(0)
            }
            while (b.length < 7) {
                b.push(0)
            }
            return new Date(((b[0] > 0) ? b[0] : this.getFullYear() + c[0]), ((b[1] > 0) ? b[1] : this.getMonth() + c[1]), ((b[2] > 0) ? b[2] : this.getDate() + c[2]), ((b[3] > 0) ? b[3] : this.getHours() + c[3]), ((b[4] > 0) ? b[4] : this.getMinutes() + c[4]), ((b[5] > 0) ? b[5] : this.getSeconds() + c[5]), ((b[6] > 0) ? b[5] : this.getMilliseconds() + c[6]))
        }, adj: function (c, b) {
            if (typeof b !== "number") {
                throw new Error("Adjustment value not specified")
            }
            if (typeof c !== "number") {
                throw new Error("Adjustment type not specified")
            }
            switch (c) {
                case 0:
                    this.setFullYear(this.getFullYear() + b);
                    break;
                case 1:
                    this.setMonth(this.getMonth() + b);
                    break;
                case 2:
                    this.setDate(this.getDate() + b);
                    break;
                case 3:
                    this.setHours(this.getHours() + b);
                    break;
                case 4:
                    this.setMinutes(this.getMinutes() + b);
                    break;
                case 5:
                    this.setSeconds(this.getSeconds() + b);
                    break;
                case 6:
                    this.setMilliseconds(this.getMilliseconds() + b);
                    break
            }
            return this
        }, setD: function (c, b) {
            switch (c) {
                case 0:
                    this.setFullYear(b);
                    break;
                case 1:
                    this.setMonth(b);
                    break;
                case 2:
                    this.setDate(b);
                    break;
                case 3:
                    this.setHours(b);
                    break;
                case 4:
                    this.setMinutes(b);
                    break;
                case 5:
                    this.setSeconds(b);
                    break;
                case 6:
                    this.setMilliseconds(b);
                    break
            }
            return this
        }, get: function (b) {
            switch (b) {
                case 0:
                    return this.getFullYear();
                case 1:
                    return this.getMonth();
                case 2:
                    return this.getDate();
                case 3:
                    return this.getHours();
                case 4:
                    return this.getMinutes();
                case 5:
                    return this.getSeconds()
            }
            return false
        }, iso: function () {
            return String(this.getFullYear()) + "-" + ((this.getMonth() < 9) ? "0" : "") + String(this.getMonth() + 1) + "-" + ((this.getDate() < 10) ? "0" : "") + String(this.getDate())
        }, comp: function () {
            return parseInt(this.iso().replace(/-/g, ""), 10)
        }, getEpoch: function () {
            return(this.getTime() - this.getMilliseconds()) / 1000
        }, getArray: function () {
            return[this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()]
        }, setFirstDay: function (b) {
            this.setD(2, 1).adj(2, (b - this.getDay()));
            if (this.get(2) > 10) {
                this.adj(2, 7)
            }
            return this
        }, setDWeek: function (c, b) {
            if (c === 4) {
                return this.setD(1, 0).setD(2, 1).setFirstDay(4).adj(2, -3).adj(2, (b - 1) * 7)
            }
            return this.setD(1, 0).setD(2, 1).setFirstDay(c).adj(2, (b - 1) * 7)
        }, getDWeek: function (c) {
            var d, b;
            switch (c) {
                case 0:
                    d = this.copy([0, -1 * this.getMonth()]).setFirstDay(0);
                    return Math.floor((this.getTime() - (d.getTime() + ((this.getTimezoneOffset() - d.getTimezoneOffset()) * 60000))) / 604800000) + 1;
                case 1:
                    d = this.copy([0, -1 * this.getMonth()]).setFirstDay(1);
                    return Math.floor((this.getTime() - (d.getTime() + ((this.getTimezoneOffset() - d.getTimezoneOffset()) * 60000))) / 604800000) + 1;
                case 4:
                    if (this.getMonth() === 11 && this.getDate() > 28) {
                        return 1
                    }
                    d = this.copy([0, -1 * this.getMonth()], true).setFirstDay(4).adj(2, -3);
                    b = Math.floor((this.getTime() - (d.getTime() + ((this.getTimezoneOffset() - d.getTimezoneOffset()) * 60000))) / 604800000) + 1;
                    if (b < 1) {
                        d = this.copy([-1, -1 * this.getMonth()]).setFirstDay(4).adj(2, -3);
                        return Math.floor((this.getTime() - d.getTime()) / 604800000) + 1
                    }
                    return b;
                default:
                    return 0
            }
        }})
    }, _event: function (d, c) {
        var b = a(this).data(parseInt(a.mobile.version.replace(/\./g, ""), 10) > 110 ? "mobile-datebox" : "datebox");
        if (!d.isPropagationStopped()) {
            switch (c.method) {
                case"close":
                    b.close();
                    break;
                case"open":
                    b.open();
                    break;
                case"set":
                    a(this).val(c.value);
                    a(this).trigger("change");
                    break;
                case"doset":
                    if (a.isFunction(b["_" + b.options.mode + "DoSet"])) {
                        b["_" + b.options.mode + "DoSet"].apply(b, [])
                    } else {
                        a(this).trigger("datebox", {method: "set", value: b._formatter(b.__fmt(), b.theDate), date: b.theDate})
                    }
                    break;
                case"dooffset":
                    if (c.type) {
                        b._offset(c.type, c.amount, true)
                    }
                    break;
                case"dorefresh":
                    b.refresh();
                    break;
                case"doreset":
                    b.hardreset();
                    break;
                case"doclear":
                    a(this).val("").trigger("change");
                    break;
                case"clear":
                    a(this).trigger("change")
            }
        }
    }, _hoover: function (b) {
        a(b).toggleClass("ui-btn-up-" + a(b).jqmData("theme") + " ui-btn-down-" + a(b).jqmData("theme"))
    }, _ord: {"default": function (c) {
        var b = c % 10;
        if (c > 9 && c < 21) {
            return"th"
        }
        if (b > 3) {
            return"th"
        }
        return["th", "st", "nd", "rd"][b]
    }}, __: function (d) {
        var c = this.options, b = "override" + d.charAt(0).toUpperCase() + d.slice(1);
        if (typeof c[b] !== "undefined") {
            return c[b]
        }
        if (typeof c.lang[c.useLang][d] !== "undefined") {
            return c.lang[c.useLang][d]
        }
        if (typeof c[c.mode + "lang"] !== "undefined" && typeof c[c.mode + "lang"][d] !== "undefined") {
            return c[c.mode + "lang"][d]
        }
        return c.lang["default"][d]
    }, __fmt: function () {
        var b = this, c = this.options;
        switch (c.mode) {
            case"timebox":
            case"timeflipbox":
                return b.__("timeOutput");
            case"durationbox":
            case"durationflipbox":
                return b.__("durationFormat");
            default:
                return b.__("dateFormat")
        }
    }, _zPad: function (b) {
        return((b < 10) ? "0" + String(b) : String(b))
    }, _dRep: function (j, g) {
        var h = 48, b = 57, c = 1584, d = null, e = null, f = "";
        if (g === -1) {
            h += c;
            b += c;
            c = -1584
        }
        for (d = 0; d < j.length; d++) {
            e = j.charCodeAt(d);
            if (e >= h && e <= b) {
                f = f + String.fromCharCode(e + c)
            } else {
                f = f + String.fromCharCode(e)
            }
        }
        return f
    }, _doIndic: function () {
        var b = this;
        b.d.intHTML.find("*").each(function () {
            if (a(this).children().length < 1) {
                a(this).text(b._dRep(a(this).text()))
            } else {
                if (a(this).hasClass("ui-datebox-slideday")) {
                    a(this).html(b._dRep(a(this).html()))
                }
            }
        });
        b.d.intHTML.find("input").each(function () {
            a(this).val(b._dRep(a(this).val()))
        })
    }, _parser: {"default": function (b) {
        return false
    }}, _n: function (c, b) {
        return(c < 0) ? b : c
    }, _pa: function (b, c) {
        if (typeof c === "boolean") {
            return new this._date(b[0], b[1], b[2], 0, 0, 0, 0)
        }
        return new this._date(c.getFullYear(), c.getMonth(), c.getDate(), b[0], b[1], b[2], 0)
    }, _makeDate: function (k) {
        k = a.trim(((this.__("useArabicIndic") === true) ? this._dRep(k, -1) : k));
        var n = this, c = this.options, e = n.__fmt(), m = null, h = [], l = null, b = null, f = new n._date(), j = {year: -1, mont: -1, date: -1, hour: -1, mins: -1, secs: -1, week: false, wtyp: 4, wday: false, yday: false, meri: 0}, g;
        if (typeof c.mode === "undefined") {
            return f
        }
        if (typeof n._parser[c.mode] !== "undefined") {
            return n._parser[c.mode].apply(n, [k])
        }
        if (c.mode === "durationbox" || c.mode === "durationflipbox") {
            e = e.replace(/%D([a-z])/gi, function (d, o) {
                switch (o) {
                    case"d":
                    case"l":
                    case"M":
                    case"S":
                        return"(" + d + "|[0-9]+)";
                    default:
                        return".+?"
                }
            });
            e = new RegExp("^" + e + "$");
            m = e.exec(k);
            l = e.exec(n.__fmt());
            if (m === null || m.length !== l.length) {
                if (typeof c.defaultValue === "number" && c.defaultValue > 0) {
                    return new n._date((n.initDate.getEpoch() + parseInt(c.defaultValue, 10)) * 1000)
                }
                return new n._date(n.initDate.getTime())
            }
            b = n.initDate.getEpoch();
            for (g = 0; g < m.length; g++) {
                if (l[g].match(/^%Dd$/i)) {
                    b = b + (parseInt(m[g], 10) * 60 * 60 * 24)
                }
                if (l[g].match(/^%Dl$/i)) {
                    b = b + (parseInt(m[g], 10) * 60 * 60)
                }
                if (l[g].match(/^%DM$/i)) {
                    b = b + (parseInt(m[g], 10) * 60)
                }
                if (l[g].match(/^%DS$/i)) {
                    b = b + (parseInt(m[g], 10))
                }
            }
            return new n._date((b * 1000))
        }
        e = e.replace(/%(0|-)*([a-z])/gi, function (d, o, p) {
            h.push(p);
            switch (p) {
                case"p":
                case"P":
                case"b":
                case"B":
                    return"(" + d + "|.+?)";
                case"H":
                case"k":
                case"I":
                case"l":
                case"m":
                case"M":
                case"S":
                case"V":
                case"U":
                case"u":
                case"W":
                case"d":
                    return"(" + d + "|" + ((o === "-") ? "[0-9]{1,2}" : "[0-9]{2}") + ")";
                case"j":
                    return"(" + d + "|[0-9]{3})";
                case"s":
                    return"(" + d + "|[0-9]+)";
                case"g":
                case"y":
                    return"(" + d + "|[0-9]{2})";
                case"E":
                case"G":
                case"Y":
                    return"(" + d + "|[0-9]{1,4})";
                default:
                    h.pop();
                    return".+?"
            }
        });
        e = new RegExp("^" + e + "$");
        m = e.exec(k);
        l = e.exec(n.__fmt());
        if (m === null || m.length !== l.length) {
            if (c.defaultValue !== false) {
                switch (typeof c.defaultValue) {
                    case"object":
                        if (c.defaultValue.length === 3) {
                            f = n._pa(c.defaultValue, ((c.mode === "timebox" || c.mode === "timeflipbox") ? f : false))
                        }
                        break;
                    case"number":
                        f = new n._date(c.defaultValue * 1000);
                        break;
                    case"string":
                        if (c.mode === "timebox" || c.mode === "timeflipbox") {
                            b = c.defaultValue.split(":");
                            if (b.length === 3) {
                                f = n._pa([b[0], b[1], b[2]], f)
                            } else {
                                if (b.length === 2) {
                                    f = n._pa([b[0], b[1], 0], f)
                                }
                            }
                        } else {
                            b = c.defaultValue.split("-");
                            if (b.length === 3) {
                                f = n._pa([b[0], b[1] - 1, b[2]], false)
                            }
                        }
                        break
                }
            }
            if (isNaN(f.getDate())) {
                f = new n._date()
            }
        } else {
            for (g = 1; g < m.length; g++) {
                switch (h[g - 1]) {
                    case"s":
                        return new n._date(parseInt(m[g], 10) * 1000);
                    case"Y":
                    case"G":
                        j.year = parseInt(m[g], 10);
                        break;
                    case"E":
                        j.year = parseInt(m[g], 10) - 543;
                        break;
                    case"y":
                    case"g":
                        if (c.afterToday === true || parseInt(m[g], 10) < 38) {
                            j.year = parseInt("20" + m[g], 10)
                        } else {
                            j.year = parseInt("19" + m[g], 10)
                        }
                        break;
                    case"m":
                        j.mont = parseInt(m[g], 10) - 1;
                        break;
                    case"d":
                        j.date = parseInt(m[g], 10);
                        break;
                    case"H":
                    case"k":
                    case"I":
                    case"l":
                        j.hour = parseInt(m[g], 10);
                        break;
                    case"M":
                        j.mins = parseInt(m[g], 10);
                        break;
                    case"S":
                        j.secs = parseInt(m[g], 10);
                        break;
                    case"u":
                        j.wday = parseInt(m[g], 10) - 1;
                        break;
                    case"w":
                        j.wday = parseInt(m[g], 10);
                        break;
                    case"j":
                        j.yday = parseInt(m[g], 10);
                        break;
                    case"V":
                        j.week = parseInt(m[g], 10);
                        j.wtyp = 4;
                        break;
                    case"U":
                        j.week = parseInt(m[g], 10);
                        j.wtyp = 0;
                        break;
                    case"W":
                        j.week = parseInt(m[g], 10);
                        j.wtyp = 1;
                        break;
                    case"p":
                    case"P":
                        j.meri = ((m[g].toLowerCase() === n.__("meridiem")[0].toLowerCase()) ? -1 : 1);
                        break;
                    case"b":
                        b = a.inArray(m[g], n.__("monthsOfYearShort"));
                        if (b > -1) {
                            j.mont = b
                        }
                        break;
                    case"B":
                        b = a.inArray(m[g], n.__("monthsOfYear"));
                        if (b > -1) {
                            j.mont = b
                        }
                        break
                }
            }
            if (j.meri !== 0) {
                if (j.meri === -1 && j.hour === 12) {
                    j.hour = 0
                }
                if (j.meri === 1 && j.hour !== 12) {
                    j.hour = j.hour + 12
                }
            }
            f = new n._date(n._n(j.year, 0), n._n(j.mont, 0), n._n(j.date, 1), n._n(j.hour, 0), n._n(j.mins, 0), n._n(j.secs, 0), 0);
            if (j.year < 100 && j.year !== -1) {
                f.setFullYear(j.year)
            }
            if ((j.mont > -1 && j.date > -1) || (j.hour > -1 && j.mins > -1 && j.secs > -1)) {
                return f
            }
            if (j.week !== false) {
                f.setDWeek(j.wtyp, j.week);
                if (j.date > -1) {
                    f.setDate(j.date)
                }
            }
            if (j.yday !== false) {
                f.setD(1, 0).setD(2, 1).adj(2, (j.yday - 1))
            }
            if (j.wday !== false) {
                f.adj(2, (j.wday - f.getDay()))
            }
        }
        return f
    }, _customformat: {"default": function (c, b) {
        return false
    }}, _formatter: function (f, c) {
        var b = this, g = this.options, d, e = {part: [0, 0, 0, 0], tp: 0};
        if (g.mode === "durationbox" || g.mode === "durationflipbox") {
            e.tp = this.theDate.getEpoch() - this.initDate.getEpoch();
            e.part[0] = parseInt(e.tp / (60 * 60 * 24), 10);
            e.tp -= (e.part[0] * 60 * 60 * 24);
            e.part[1] = parseInt(e.tp / (60 * 60), 10);
            e.tp -= (e.part[1] * 60 * 60);
            e.part[2] = parseInt(e.tp / (60), 10);
            e.tp -= (e.part[2] * 60);
            e.part[3] = e.tp;
            if (!f.match(/%Dd/)) {
                e.part[1] += (e.part[0] * 24)
            }
            if (!f.match(/%Dl/)) {
                e.part[2] += (e.part[1] * 60)
            }
            if (!f.match(/%DM/)) {
                e.part[3] += (e.part[2] * 60)
            }
        }
        f = f.replace(/%(D|X|0|-)*([1-9a-zA-Z])/g, function (h, j, k) {
            if (j === "X") {
                if (typeof b._customformat[g.mode] !== "undefined") {
                    return b._customformat[g.mode](k, c, g)
                }
                return h
            }
            if (j === "D") {
                switch (k) {
                    case"d":
                        return e.part[0];
                    case"l":
                        return b._zPad(e.part[1]);
                    case"M":
                        return b._zPad(e.part[2]);
                    case"S":
                        return b._zPad(e.part[3]);
                    case"A":
                        return((e.part[0] > 1) ? b.__("durationDays")[1] : b.__("durationDays")[0]);
                    default:
                        return h
                }
            }
            switch (k) {
                case"%":
                    return"%";
                case"a":
                    return b.__("daysOfWeekShort")[c.getDay()];
                case"A":
                    return b.__("daysOfWeek")[c.getDay()];
                case"b":
                    return b.__("monthsOfYearShort")[c.getMonth()];
                case"B":
                    return b.__("monthsOfYear")[c.getMonth()];
                case"C":
                    return c.getFullYear().toString().substr(0, 2);
                case"d":
                    return((j === "-") ? c.getDate() : b._zPad(c.getDate()));
                case"H":
                case"k":
                    return((j === "-") ? c.getHours() : b._zPad(c.getHours()));
                case"I":
                case"l":
                    return((j === "-") ? ((c.getHours() === 0 || c.getHours() === 12) ? 12 : ((c.getHours() < 12) ? c.getHours() : (c.getHours() - 12))) : b._zPad(((c.getHours() === 0 || c.getHours() === 12) ? 12 : ((c.getHours() < 12) ? c.getHours() : c.getHours() - 12))));
                case"m":
                    return((j === "-") ? c.getMonth() + 1 : b._zPad(c.getMonth() + 1));
                case"M":
                    return((j === "-") ? c.getMinutes() : b._zPad(c.getMinutes()));
                case"p":
                    return((c.getHours() < 12) ? b.__("meridiem")[0].toUpperCase() : b.__("meridiem")[1].toUpperCase());
                case"P":
                    return((c.getHours() < 12) ? b.__("meridiem")[0].toLowerCase() : b.__("meridiem")[1].toLowerCase());
                case"s":
                    return c.getEpoch();
                case"S":
                    return((j === "-") ? c.getSeconds() : b._zPad(c.getSeconds()));
                case"u":
                    return((j === "-") ? c.getDay() + 1 : b._zPad(c.getDay() + 1));
                case"w":
                    return c.getDay();
                case"y":
                    return c.getFullYear().toString().substr(2, 2);
                case"Y":
                    return c.getFullYear();
                case"E":
                    return c.getFullYear() + 543;
                case"V":
                    return((j === "-") ? c.getDWeek(4) : b._zPad(c.getDWeek(4)));
                case"U":
                    return((j === "-") ? c.getDWeek(0) : b._zPad(c.getDWeek(0)));
                case"W":
                    return((j === "-") ? c.getDWeek(1) : b._zPad(c.getDWeek(1)));
                case"o":
                    if (typeof b._ord[g.useLang] !== "undefined") {
                        return b._ord[g.useLang](c.getDate())
                    }
                    return b._ord["default"](c.getDate());
                case"j":
                    d = new Date(c.getFullYear(), 0, 1);
                    d = Math.ceil((c - d) / 86400000) + 1;
                    return((d < 100) ? ((d < 10) ? "00" : "0") : "") + String(d);
                case"G":
                    if (c.getDWeek(4) === 1 && c.getMonth() > 0) {
                        return c.getFullYear() + 1
                    }
                    if (c.getDWeek(4) > 51 && c.getMonth() < 11) {
                        return c.getFullYear() - 1
                    }
                    return c.getFullYear();
                case"g":
                    if (c.getDWeek(4) === 1 && c.getMonth() > 0) {
                        return parseInt(c.getFullYear().toString().substr(2, 2), 10) + 1
                    }
                    if (c.getDWeek(4) > 51 && c.getMonth() < 11) {
                        return parseInt(c.getFullYear().toString().substr(2, 2), 10) - 1
                    }
                    return c.getFullYear().toString().substr(2, 2);
                default:
                    return h
            }
        });
        if (b.__("useArabicIndic") === true) {
            f = b._dRep(f)
        }
        return f
    }, _btwn: function (d, b, c) {
        return(d > b && d < c)
    }, _minStepFix: function () {
        var d = this.theDate.get(4), c, b = this, e = this.options;
        if (e.minuteStep > 1 && d % e.minuteStep > 0) {
            if (e.minuteStepRound < 0) {
                d = d - (d % e.minuteStep)
            } else {
                if (e.minStepRound > 0) {
                    d = d + (e.minuteStep - (d % e.minuteStep))
                } else {
                    if (d % e.minuteStep < e.minuteStep / 2) {
                        d = d - (d % e.minuteStep)
                    } else {
                        d = d + (e.minuteStep - (d % e.minuteStep))
                    }
                }
            }
            b.theDate.setMinutes(d)
        }
    }, _offset: function (f, d, g) {
        var b = this, e = this.options, c = false;
        f = (f || "").toLowerCase();
        if (typeof(g) === "undefined") {
            g = true
        }
        b.d.input.trigger("datebox", {method: "offset", type: f, amount: d});
        if (f !== "a" && (typeof e.rolloverMode[f] === "undefined" || e.rolloverMode[f] === true)) {
            c = a.inArray(f, ["y", "m", "d", "h", "i", "s"])
        } else {
            switch (f) {
                case"y":
                    c = 0;
                    break;
                case"m":
                    if (b._btwn(b.theDate.getMonth() + d, -1, 12)) {
                        c = 1
                    }
                    break;
                case"d":
                    if (b._btwn(b.theDate.getDate() + d, 0, (32 - b.theDate.copy([0], [0, 0, 32, 13]).getDate() + 1))) {
                        c = 2
                    }
                    break;
                case"h":
                    if (b._btwn(b.theDate.getHours() + d, -1, 24)) {
                        c = 3
                    }
                    break;
                case"i":
                    if (b._btwn(b.theDate.getMinutes() + d, -1, 60)) {
                        c = 4
                    }
                    break;
                case"s":
                    if (b._btwn(b.theDate.getSeconds() + d, -1, 60)) {
                        c = 5
                    }
                    break;
                case"a":
                    b._offset("h", ((d > 0) ? 1 : -1) * 12, false);
                    break
            }
        }
        if (c !== false) {
            b.theDate.adj(c, d)
        }
        if (g === true) {
            b.refresh()
        }
        if (e.useImmediate) {
            b.d.input.trigger("datebox", {method: "doset"})
        }
    }, _startOffset: function (b) {
        var c = this.options;
        if (c.startOffsetYears !== false) {
            b.adj(0, c.startOffsetYears)
        }
        if (c.startOffsetMonths !== false) {
            b.adj(1, c.startOffsetMonths)
        }
        if (c.startOffsetDays !== false) {
            b.adj(2, c.startOffsetDays)
        }
        return b
    }, _create: function () {
        a(document).trigger("dateboxcreate");
        var j = this, b = a.extend(this.options, (typeof this.element.jqmData("options") !== "undefined") ? this.element.jqmData("options") : this._getLongOptions(this.element)), k = (b.theme === false && typeof(a(this).jqmData("theme")) === "undefined") ? ((typeof(this.element.parentsUntil(":jqmData(theme)").parent().jqmData("theme")) === "undefined") ? b.themeDefault : this.element.parentsUntil(":jqmData(theme)").parent().jqmData("theme")) : b.theme, l = b.useAnimation ? b.transition : "none", g = b.useNewStyle === false ? {input: this.element, wrap: this.element.wrap('<div class="ui-input-datebox ui-shadow-inset ui-corner-all ' + (this.element.jqmData("mini") === true ? "ui-mini " : "") + "ui-body-" + k + '"></div>').parent(), mainWrap: a("<div>", {"class": "ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden " + l + " ui-body-" + k}).css("zIndex", b.zindex), intHTML: false} : {input: this.element, wrap: this.element, mainWrap: a("<div>", {"class": "ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden " + l + " ui-body-" + k}).css("zIndex", b.zindex), intHTML: false}, e = (typeof window.ontouchstart !== "undefined"), f = {eStart: (e ? "touchstart" : "mousedown") + ".datebox", eMove: (e ? "touchmove" : "mousemove") + ".datebox", eEnd: (e ? "touchend" : "mouseup") + ".datebox", eEndA: (e ? "mouseup.datebox touchend.datebox touchcancel.datebox touchmove.datebox" : "mouseup.datebox"), move: false, start: false, end: false, pos: false, target: false, delta: false, tmp: false}, c = {}, h = (typeof a.mobile.ns !== "undefined") ? a.mobile.ns : "";
        a.extend(j, {d: g, ns: h, drag: f, touch: e});
        if (b.usePlaceholder !== false) {
            if (b.usePlaceholder === true && j._grabLabel() !== false) {
                j.d.input.attr("placeholder", j._grabLabel())
            }
            if (typeof b.usePlaceholder === "string") {
                j.d.input.attr("placeholder", b.usePlaceholder)
            }
        }
        b.theme = k;
        j.clearFunc = false;
        j.disabled = false;
        j.runButton = false;
        j._date = window.Date;
        j._enhanceDate();
        j.baseID = j.d.input.attr("id");
        j.initDate = new j._date();
        j.theDate = (b.defaultValue) ? j._makeDate(b.defaultValue) : ((j.d.input.val() !== "") ? j._makeDate(j.d.input.val()) : new j._date());
        j.initDone = false;
        if (b.showInitialValue === true) {
            j.d.input.val(j._formatter(j.__fmt(), j.theDate))
        }
        if (b.useButton === true && b.useInline === false && b.useNewStyle === false) {
            j.d.open = a('<a href="#" class="ui-input-clear" title="' + this.__("tooltip") + '">' + this.__("tooltip") + "</a>").on(b.clickEvent, function (d) {
                d.preventDefault();
                if (!j.disabled) {
                    j.d.input.trigger("datebox", {method: "open"});
                    j.d.wrap.parent().addClass("ui-focus");
                    j.d.input.parent().removeClass("ui-focus")
                }
                setTimeout(function () {
                    a(d.target).closest("a").removeClass(a.mobile.activeBtnClass)
                }, 300)
            }).appendTo(j.d.wrap).buttonMarkup({icon: "grid", iconpos: "notext", corners: true, shadow: true}).css({"vertical-align": "middle", display: "inline-block"})
        }
        j.d.screen = a("<div>", {"class": "ui-datebox-screen ui-datebox-hidden" + ((b.useModal) ? " ui-datebox-screen-modal" : "")}).css({"z-index": b.zindex - 1}).on(b.clickEventAlt, function (d) {
            d.preventDefault();
            j.d.input.trigger("datebox", {method: "close"})
        });
        if (b.enhanceInput === true && navigator.userAgent.match(/Android/i)) {
            j.inputType = "number"
        } else {
            j.inputType = "text"
        }
        if (b.hideInput) {
            j.d.wrap.parent().hide()
        }
        if (b.mobVer < 140) {
            a("label[for='" + j.d.input.attr("id") + "']").addClass("ui-input-text").css("verticalAlign", "middle")
        }
        j.d.wrap.on(b.clickEvent, function () {
            if (!j.disabled && (b.noButtonFocusMode || b.focusMode)) {
                j.d.input.trigger("datebox", {method: "open"});
                j.d.wrap.addClass("ui-focus");
                j.d.input.removeClass("ui-focus")
            }
        });
        j.d.input.removeClass("ui-corner-all ui-shadow-inset").bind(j.touch ? "touchend" : "click", function (d) {
            if (j.disabled === false && b.useNewStyle === true && b.useFocus === false) {
                if (((j.touch ? d.originalEvent.changedTouches[0].pageX : d.pageX) - d.target.offsetLeft) > (d.target.offsetWidth - 20)) {
                    j.d.input.trigger("datebox", {method: "open"});
                    j.d.wrap.parent().addClass("ui-focus");
                    j.d.input.removeClass("ui-focus")
                }
            }
        }).focus(function () {
            if (j.disabled === false && b.useFocus === true) {
                j.d.input.trigger("datebox", {method: "open"});
                j.d.wrap.addClass("ui-focus");
                j.d.input.removeClass("ui-focus");
                if (b.useNewStyle === false) {
                    j.d.input.parent().removeClass("ui-focus");
                    j.d.wrap.parent().addClass("ui-focus")
                }
            }
            if (b.useNewStyle === false) {
                j.d.input.removeClass("ui-focus")
            }
        }).blur(function () {
            j.d.wrap.removeClass("ui-focus");
            j.d.input.removeClass("ui-focus")
        }).change(function () {
            j.theDate = j._makeDate(j.d.input.val());
            j.refresh()
        }).attr("readonly", b.lockInput).on("datebox", j._event);
        if (b.useNewStyle === true) {
            j.d.input.addClass("ui-corner-all " + ((b.useAltIcon === true) ? "ui-icon-datebox-alt" : "ui-icon-datebox"));
            if (b.overrideStyleClass !== false) {
                j.d.input.addClass(b.overrideStyleClass)
            }
        } else {
            j.d.input.parent().css("border", "none").removeClass("ui-shadow-inset")
        }
        j.d.wrap.parent().on(b.clickEvent, function () {
            if (!j.disabled && b.useFocus === true && b.useNewStyle === false) {
                j.d.input.trigger("datebox", {method: "open"});
                j.d.wrap.addClass("ui-focus");
                j.d.input.removeClass("ui-focus");
                setTimeout(function () {
                    j.d.wrap.removeClass("ui-focus");
                    j.d.wrap.parent().addClass("ui-focus")
                }, 500)
            }
        });
        if (typeof a.event.special.mousewheel !== "undefined") {
            j.wheelExists = true
        }
        if (j.d.input.is(":disabled")) {
            j.disable()
        }
        if (b.useInline === true || b.useInlineBlind) {
            j.open()
        }
        j.applyMinMax(false, false);
        a(document).trigger("dateboxaftercreate")
    }, applyMinMax: function (e, d) {
        var b = this, f = this.options, c = {};
        if (typeof e === "undefined") {
            e = false
        }
        if (typeof d === "undefined") {
            d = true
        }
        if ((d === true || f.minDays === false) && typeof(b.d.input.attr("min")) !== "undefined") {
            c.today = new b._date();
            c.lod = 24 * 60 * 60 * 1000;
            c.todayc = new b._date(c.today.getFullYear(), c.today.getMonth(), c.today.getDate(), 0, 0, 0, 0);
            c.fromel = b.d.input.attr("min").split("-");
            c.compdt = new b._date(c.fromel[0], c.fromel[1] - 1, c.fromel[2], 0, 0, 0, 0);
            f.minDays = parseInt((((c.compdt.getTime() - c.todayc.getTime()) / c.lod)) * -1, 10)
        }
        if ((d === true || f.maxDays === false) && typeof(b.d.input.attr("max")) !== "undefined") {
            c.today = new b._date();
            c.lod = 24 * 60 * 60 * 1000;
            c.todayc = new b._date(c.today.getFullYear(), c.today.getMonth(), c.today.getDate(), 0, 0, 0, 0);
            c.fromel = b.d.input.attr("max").split("-");
            c.compdt = new b._date(c.fromel[0], c.fromel[1] - 1, c.fromel[2], 0, 0, 0, 0);
            f.maxDays = parseInt((((c.compdt.getTime() - c.todayc.getTime()) / c.lod)), 10)
        }
        if (e === true) {
            b.refresh()
        }
    }, _build: {"default": function () {
        this.d.headerText = "Error";
        this.d.intHTML = a("<div class='ui-body-b'><h2 style='text-align:center'>There is no mode by that name loaded / mode not given</h2></div>")
    }}, _applyCoords: function (h) {
        var b = h.widget, j = h.widget.options, f = {h: a.mobile.activePage.find(".ui-header").jqmData("position"), f: a.mobile.activePage.find(".ui-footer").jqmData("position"), fh: a.mobile.activePage.find(".ui-footer").outerHeight(), hh: a.mobile.activePage.find(".ui-header").outerHeight()}, c = {x: b.d.wrap.offset().left + (b.d.wrap.outerWidth() / 2), y: b.d.wrap.offset().top + (b.d.wrap.outerHeight() / 2)}, d = {w: b.d.mainWrap.outerWidth(), h: b.d.mainWrap.outerHeight()}, g = {t: a(window).scrollTop(), h: a(window).height(), w: a.mobile.activePage.width(), ah: a(document).height()}, k = {y: (j.centerVert) ? g.t + ((g.h / 2) - (d.h / 2)) : c.y - (d.h / 2), x: (g.w < 400 || j.centerHoriz) ? (g.w / 2) - (d.w / 2) : c.x - (d.w / 2)};
        if (j.centerVert === false) {
            if (j.hideFixedToolbars === true && (typeof f.f !== "undefined" || typeof f.h !== "undefined")) {
                a.mobile.activePage.find(":jqmData(position='fixed')").fixedtoolbar("hide");
                f.f = undefined;
                f.h = undefined
            }
            if (typeof f.f !== "undefined") {
                if ((k.y + d.h) > (g.h - f.fh - 2)) {
                    k.y = g.h - f.fh - 2 - d.h
                }
            } else {
                if ((k.y + d.h) > (g.ah - f.fh - 2)) {
                    k.y = g.ah - f.fh - 2 - d.h
                }
                if ((g.h + g.t) < (d.h + k.y + 2)) {
                    k.y = g.h + g.t - d.h - 2
                }
            }
            if (typeof f.h !== "undefined") {
                if ((g.t + f.hh + 2) > k.y) {
                    k.y = g.t + f.hh + 2
                }
            } else {
                if (f.hh + 2 > k.y) {
                    k.y = f.hh + 2
                }
                if (k.y < g.t + 2) {
                    k.y = g.t + 2
                }
            }
        }
        b.d.mainWrap.css({position: "absolute", top: k.y, left: k.x})
    }, _drag: {"default": function () {
        return false
    }}, open: function () {
        var b = this, g = this.options, e = {}, f = {history: false}, d = "data-" + this.ns, c = g.useAnimation ? g.transition : "none";
        if (g.useFocus === true && b.fastReopen === true) {
            b.d.input.blur();
            return false
        }
        if (b.clearFunc !== false) {
            clearTimeout(b.clearFunc);
            b.clearFunc = false
        }
        if (g.openCallback !== false) {
            if (!a.isFunction(g.openCallback)) {
                if (typeof window[g.openCallback] !== "undefined") {
                    g.openCallback = window[g.openCallback]
                } else {
                    g.openCallback = new Function(g.openCallback)
                }
            }
            if (g.openCallback.apply(b, a.merge([b.theDate], g.openCallbackArgs)) === false) {
                return false
            }
        }
        b.theDate = b._makeDate(b.d.input.val());
        if (b.d.input.val() === "") {
            b._startOffset(b.theDate)
        }
        b.d.input.blur();
        if (typeof b._build[g.mode] === "undefined") {
            b._build["default"].apply(b, [])
        } else {
            b._build[g.mode].apply(b, [])
        }
        if (typeof b._drag[g.mode] !== "undefined") {
            b._drag[g.mode].apply(b, [])
        }
        b.d.input.trigger("datebox", {method: "refresh"});
        if (b.__("useArabicIndic") === true) {
            b._doIndic()
        }
        if ((g.useInline === true || g.useInlineBlind === true) && b.initDone === false) {
            b.d.mainWrap.append(b.d.intHTML);
            b.d.input.parent().parent().append(b.d.mainWrap);
            b.d.mainWrap.removeClass("ui-datebox-hidden");
            if (g.useInline === true) {
                b.d.mainWrap.addClass("ui-datebox-inline")
            } else {
                b.d.mainWrap.addClass("ui-datebox-inlineblind");
                b.d.mainWrap.hide()
            }
            b.initDone = false;
            b.d.input.trigger("datebox", {method: "postrefresh"})
        }
        if (g.useImmediate) {
            b.d.input.trigger("datebox", {method: "doset"})
        }
        if (g.useInline) {
            return true
        }
        if (g.useInlineBlind) {
            if (b.initDone) {
                b.d.mainWrap.slideDown()
            } else {
                b.initDone = true
            }
            return true
        }
        if (b.d.intHTML.is(":visible")) {
            return false
        }
        if (g.enablePopup === true) {
            b.d.dialogPage = false;
            b.d.mainWrap.empty();
            if (g.useHeader === true) {
                b.d.headHTML = a('<div class="ui-header ui-bar-' + g.themeHeader + '"></div>');
                a("<a class='ui-btn-left' href='#'>Close</a>").appendTo(b.d.headHTML).buttonMarkup({theme: g.themeHeader, icon: "delete", iconpos: "notext", corners: true, shadow: true}).on(g.clickEventAlt, function (h) {
                    h.preventDefault();
                    b.d.input.trigger("datebox", {method: "close"})
                });
                a('<h1 class="ui-title">' + b.d.headerText + "</h1>").appendTo(b.d.headHTML);
                b.d.mainWrap.append(b.d.headHTML)
            }
            b.d.mainWrap.append(b.d.intHTML).css("zIndex", g.zindex);
            b.d.input.trigger("datebox", {method: "postrefresh"});
            if (g.useAnimation === true) {
                e.transition = g.transition
            } else {
                e.transition = "none"
            }
            if (g.popupForceX !== false && g.popupForceY !== false) {
                e.x = g.popupForceX;
                e.y = g.popupForceY
            }
            if (g.popupPosition !== false) {
                e.positionTo = g.popupPosition
            } else {
                if (typeof b.baseID !== undefined) {
                    e.positionTo = "#" + b.baseID
                } else {
                    e.positionTo = "window"
                }
            }
            if (g.useModal === true) {
                f.overlayTheme = "a"
            }
            b.d.mainWrap.removeClass("ui-datebox-hidden").popup(f).popup("open", e);
            b.refresh()
        } else {
            if (g.dialogForce || (g.dialogEnable && window.width() < 400)) {
                b.d.dialogPage = a("<div " + d + "role='dialog' " + d + "theme='" + g.theme + "' ><div " + d + "role='header' " + d + "theme='" + g.themeHeader + "'><h1>" + b.d.headerText + "</h1></div><div " + d + "role='content'></div>").appendTo(a.mobile.pageContainer).page().css("minHeight", "0px").addClass(c);
                b.d.dialogPage.find(".ui-header").find("a").off("click vclick").on(g.clickEventAlt, function (h) {
                    h.preventDefault();
                    b.d.input.trigger("datebox", {method: "close"})
                });
                b.d.mainWrap.append(b.d.intHTML).css({marginLeft: "auto", marginRight: "auto"}).removeClass("ui-datebox-hidden");
                b.d.dialogPage.find(".ui-content").append(b.d.mainWrap);
                b.d.input.trigger("datebox", {method: "postrefresh"});
                a.mobile.activePage.off("pagehide.remove");
                a.mobile.changePage(b.d.dialogPage, {transition: c})
            } else {
                b.d.dialogPage = false;
                b.d.mainWrap.empty();
                if (g.useHeader === true) {
                    b.d.headHTML = a('<div class="ui-header ui-bar-' + g.themeHeader + '"></div>');
                    a("<a class='ui-btn-left' href='#'>Close</a>").appendTo(b.d.headHTML).buttonMarkup({theme: g.themeHeader, icon: "delete", iconpos: "notext", corners: true, shadow: true}).on(g.clickEventAlt, function (h) {
                        h.preventDefault();
                        b.d.input.trigger("datebox", {method: "close"})
                    });
                    a('<h1 class="ui-title">' + b.d.headerText + "</h1>").appendTo(b.d.headHTML);
                    b.d.mainWrap.append(b.d.headHTML)
                }
                b.d.mainWrap.append(b.d.intHTML).css("zIndex", g.zindex);
                b.d.mainWrap.appendTo(a.mobile.activePage);
                b.d.screen.appendTo(a.mobile.activePage);
                b.d.input.trigger("datebox", {method: "postrefresh"});
                b._applyCoords({widget: b});
                if (g.useModal === true) {
                    if (g.useAnimation) {
                        b.d.screen.fadeIn("slow")
                    } else {
                        b.d.screen.show()
                    }
                } else {
                    setTimeout(function () {
                        b.d.screen.removeClass("ui-datebox-hidden")
                    }, 500)
                }
                b.d.mainWrap.addClass("ui-overlay-shadow in").removeClass("ui-datebox-hidden");
                a(document).on("orientationchange.datebox", {widget: b}, function (h) {
                    b._applyCoords(h.data)
                });
                if (g.resizeListener === true) {
                    a(window).on("resize.datebox", {widget: b}, function (h) {
                        b._applyCoords(h.data)
                    })
                }
            }
        }
    }, close: function () {
        var b = this, c = this.options;
        if (c.useInlineBlind === true) {
            b.d.mainWrap.slideUp();
            return true
        }
        if (c.useInline === true || b.d.intHTML === false) {
            return true
        }
        if (b.d.dialogPage !== false) {
            a(b.d.dialogPage).dialog("close");
            if (!a.mobile.activePage.jqmData("mobile-page").options.domCache) {
                a.mobile.activePage.on("pagehide.remove", function () {
                    a(this).remove()
                })
            }
            b.d.intHTML.detach().empty();
            b.d.mainWrap.detach().empty();
            b.d.wrap.removeClass("ui-focus");
            b.clearFunc = setTimeout(function () {
                b.d.dialogPage.empty().remove();
                b.clearFunc = false
            }, 1500)
        } else {
            if (c.enablePopup === true) {
                b.d.mainWrap.popup("close");
                b.d.wrap.removeClass("ui-focus")
            } else {
                if (c.useModal) {
                    if (c.useAnimation) {
                        b.d.screen.fadeOut("slow")
                    } else {
                        b.d.screen.hide()
                    }
                } else {
                    b.d.screen.addClass("ui-datebox-hidden")
                }
                b.d.screen.detach();
                b.d.mainWrap.addClass("ui-datebox-hidden").removeAttr("style").removeClass("in ui-overlay-shadow").empty().detach();
                b.d.intHTML.detach();
                b.d.wrap.removeClass("ui-focus");
                a(document).off("orientationchange.datebox");
                if (c.resizeListener === true) {
                    a(window).off("resize.datebox")
                }
            }
        }
        b.d.wrap.parent().removeClass("ui-focus");
        a(document).off(b.drag.eMove);
        a(document).off(b.drag.eEnd);
        a(document).off(b.drag.eEndA);
        if (c.useFocus) {
            b.fastReopen = true;
            setTimeout(function (d) {
                return function () {
                    d.fastReopen = false
                }
            }(b), 300)
        }
        if (c.closeCallback !== false) {
            if (!a.isFunction(c.closeCallback)) {
                if (typeof window[c.closeCallback] !== "undefined") {
                    c.closeCallback = window[c.closeCallback]
                } else {
                    c.closeCallback = new Function(c.closeCallback)
                }
            }
            c.closeCallback.apply(b, a.merge([b.theDate], c.closeCallbackArgs))
        }
    }, refresh: function () {
        if (typeof this._build[this.options.mode] === "undefined") {
            this._build["default"].apply(this, [])
        } else {
            this._build[this.options.mode].apply(this, [])
        }
        if (this.__("useArabicIndic") === true) {
            this._doIndic()
        }
        this.d.mainWrap.append(this.d.intHTML);
        this.d.input.trigger("datebox", {method: "postrefresh"})
    }, _check: function () {
        var b = this, d = null, c = this.options;
        b.dateOK = true;
        if (c.afterToday !== false) {
            d = new b._date();
            if (b.theDate < d) {
                b.theDate = d
            }
        }
        if (c.beforeToday !== false) {
            d = new b._date();
            if (b.theDate > d) {
                b.theDate = d
            }
        }
        if (c.maxDays !== false) {
            d = new b._date();
            d.adj(2, c.maxDays);
            if (b.theDate > d) {
                b.theDate = d
            }
        }
        if (c.minDays !== false) {
            d = new b._date();
            d.adj(2, -1 * c.minDays);
            if (b.theDate < d) {
                b.theDate = d
            }
        }
        if (c.minHour !== false) {
            if (b.theDate.getHours() < c.minHour) {
                b.theDate.setHours(c.minHour)
            }
        }
        if (c.maxHour !== false) {
            if (b.theDate.getHours() > c.maxHour) {
                b.theDate.setHours(c.maxHour)
            }
        }
        if (c.maxYear !== false) {
            d = new b._date(c.maxYear, 0, 1);
            d.adj(2, -1);
            if (b.theDate > d) {
                b.theDate = d
            }
        }
        if (c.minYear !== false) {
            d = new b._date(c.minYear, 0, 1);
            if (b.theDate < d) {
                b.theDate = d
            }
        }
        if (a.inArray(c.mode, ["timebox", "durationbox", "durationflipbox", "timeflipbox"]) > -1) {
            if (c.mode === "timeflipbox" && c.validHours !== false) {
                if (a.inArray(b.theDate.getHours(), c.validHours) < 0) {
                    b.dateOK = false
                }
            }
        } else {
            if (c.blackDatesRec !== false) {
                for (i = 0; i < c.blackDatesRec.length; i++) {
                    if ((c.blackDatesRec[i][0] === -1 || c.blackDatesRec[i][0] === year) && (c.blackDatesRec[i][1] === -1 || c.blackDatesRec[i][1] === month) && (c.blackDatesRec[i][2] === -1 || c.blackDatesRec[i][2] === date)) {
                        b.dateOK = false
                    }
                }
            }
            if (c.blackDates !== false) {
                if (a.inArray(b.theDate.iso(), c.blackDates) > -1) {
                    b.dateOK = false
                }
            }
            if (c.blackDays !== false) {
                if (a.inArray(b.theDate.getDay(), c.blackDays) > -1) {
                    b.dateOK = false
                }
            }
        }
    }, _grabLabel: function () {
        var b = this, c = this.options;
        if (typeof c.overrideDialogLabel === "undefined") {
            if (typeof b.d.input.attr("placeholder") !== "undefined") {
                return b.d.input.attr("placeholder")
            }
            if (typeof b.d.input.attr("title") !== "undefined") {
                return b.d.input.attr("title")
            }
            if (b.d.wrap.parent().find("label[for='" + b.d.input.attr("id") + "']").text() !== "") {
                return b.d.wrap.parent().find("label[for='" + b.d.input.attr("id") + "']").text()
            }
            return false
        }
        return c.overrideDialogLabel
    }, _makeEl: function (d, e) {
        var b = false, c = false;
        c = d.clone();
        if (typeof e.attr !== "undefined") {
            for (b in e.attr) {
                if (e.attr.hasOwnProperty(b)) {
                    c.jqmData(b, e.attr[b])
                }
            }
        }
        return c
    }, _getLongOptions: function (d) {
        var c, e = {}, f, b;
        if (a.mobile.ns === "") {
            f = "datebox"
        } else {
            f = a.mobile.ns.substr(0, a.mobile.ns.length - 1) + "Datebox"
        }
        for (c in d.data()) {
            if (c.substr(0, f.length) === f && c.length > f.length) {
                b = c.substr(f.length);
                b = b.charAt(0).toLowerCase() + b.slice(1);
                e[b] = d.data(c)
            }
        }
        return e
    }, disable: function () {
        this.d.input.attr("disabled", true);
        this.d.wrap.addClass("ui-disabled").blur();
        this.disabled = true;
        this.d.input.trigger("datebox", {method: "disable"})
    }, enable: function () {
        this.d.input.attr("disabled", false);
        this.d.wrap.removeClass("ui-disabled");
        this.disabled = false;
        this.d.input.trigger("datebox", {method: "enable"})
    }, _setOption: function () {
        a.Widget.prototype._setOption.apply(this, arguments);
        this.refresh()
    }, getTheDate: function () {
        return this.theDate
    }, getLastDur: function () {
        return this.lastDuration
    }, setTheDate: function (b) {
        this.theDate = b;
        this.refresh()
    }, callFormat: function (c, b) {
        return this._formatter(c, b)
    }});
    a(document).on("pagebeforecreate", function (b) {
        a(":jqmData(role='datebox')", b.target).each(function () {
            a(this).prop("type", "text")
        })
    });
    a(document).on("pagecreate create", function (b) {
        a(document).trigger("dateboxbeforecreate");
        a(":jqmData(role='datebox')", b.target).each(function () {
            var c = typeof(a(this).data(parseInt(a.mobile.version.replace(/\./g, ""), 10) > 111 ? "mobile-datebox" : "datebox"));
            if (c === "undefined") {
                a(this).datebox()
            }
        })
    })
})(jQuery);