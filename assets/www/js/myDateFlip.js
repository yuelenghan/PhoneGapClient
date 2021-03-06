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
    a.extend(a.mobile.datebox.prototype.options, {themeDateHigh: "b", themeDatePick: "b", themeDate: "a", useSetButton: true, validHours: false, flen: {y: 15, m: 12, d: 15, h: 12, i: 15, a: 3}});
    a.extend(a.mobile.datebox.prototype, {_fbox_pos: function () {
        var b = this, f = null, e = null, d = this.d.intHTML.find(".ui-datebox-flipcontent").innerHeight(), c = null;
        b.d.intHTML.find(".ui-datebox-flipcenter").each(function () {
            f = a(this);
            e = f.innerHeight();
            f.css("top", ((d / 2) - (e / 2) + 4) * -1)
        });
        b.d.intHTML.find("ul").each(function () {
            f = a(this);
            d = f.parent().innerHeight();
            e = f.find("li").first();
            c = f.find("li").size() * e.outerHeight();
            e.css("marginTop", ((c / 2) - (d / 2) + (e.outerHeight() / 2)) * -1)
        })
    }});
    a.extend(a.mobile.datebox.prototype._build, {timeflipbox: function () {
        this._build.flipbox.apply(this)
    }, flipbox: function () {
        var l = this, d = this.options, e, j, m, f, k, g = (l.d.input.val() === "") ? l._startOffset(l._makeDate(l.d.input.val())) : l._makeDate(l.d.input.val()), h = "ui-datebox-", c = a("<div class='ui-overlay-shadow'><ul></ul></div>"), b = a("<div>", {"class": h + "flipcontent"});
        if (typeof l.d.intHTML !== "boolean") {
            l.d.intHTML.empty()
        }
        l.d.input.on("datebox", function (n, i) {
            if (i.method === "postrefresh") {
                l._fbox_pos()
            }
        });
        l.d.headerText = ((l._grabLabel() !== false) ? l._grabLabel() : ((d.mode === "flipbox") ? l.__("titleDateDialogLabel") : l.__("titleTimeDialogLabel")));
        l.d.intHTML = a("<span>");
        l.fldOrder = ((d.mode === "flipbox") ? l.__("dateFieldOrder") : l.__("timeFieldOrder"));
        l._check();
        l._minStepFix();
        if (d.mode === "flipbox") {
            a('<div class="' + h + 'header"><h4>' + l._formatter(l.__("headerFormat"), l.theDate) + "</h4></div>").appendTo(l.d.intHTML)
        }
        l.d.intHTML.append(b);
        for (j = 0; j < l.fldOrder.length; j++) {
            switch (l.fldOrder[j]) {
                case"y":
                    m = l._makeEl(c, {attr: {field: "y", amount: 1}});
                    for (e = d.flen.y * -1; e < (d.flen.y + 1); e++) {
                        f = (e !== 0) ? ((g.get(0) === (l.theDate.get(0) + e)) ? d.themeDateHigh : d.themeDate) : d.themeDatePick;
                        a("<li>", {"class": "ui-body-" + f}).html("<span>" + (l.theDate.get(0) + e) + "</span>").appendTo(m.find("ul"))
                    }
                    m.appendTo(b);
                    break;
                case"m":
                    m = l._makeEl(c, {attr: {field: "m", amount: 1}});
                    for (e = d.flen.m * -1; e < (d.flen.m + 1); e++) {
                        k = l.theDate.copy([0], [0, 0, 1]);
                        k.adj(1, e);
                        f = (e !== 0) ? ((g.get(1) === k.get(1) && g.get(0) === k.get(0)) ? d.themeDateHigh : d.themeDate) : d.themeDatePick;
                        a("<li>", {"class": "ui-body-" + f}).html("<span>" + l.__("monthsOfYearShort")[k.getMonth()] + "</span>").appendTo(m.find("ul"))
                    }
                    m.appendTo(b);
                    break;
                case"d":
                    m = l._makeEl(c, {attr: {field: "d", amount: 1}});
                    for (e = d.flen.d * -1; e < (d.flen.d + 1); e++) {
                        k = l.theDate.copy();
                        k.adj(2, e);
                        f = (e !== 0) ? ((g.comp() === k.comp()) ? d.themeDateHigh : d.themeDate) : d.themeDatePick;
                        if ((d.blackDates !== false && a.inArray(k.iso(), d.blackDates) > -1) || (d.blackDays !== false && a.inArray(k.getDay(), d.blackDays) > -1)) {
                            f += " " + h + "griddate-disable"
                        }
                        a("<li>", {"class": "ui-body-" + f}).html("<span>" + k.getDate() + "</span>").appendTo(m.find("ul"))
                    }
                    m.appendTo(b);
                    break;
                case"h":
                    m = l._makeEl(c, {attr: {field: "h", amount: 1}});
                    for (e = d.flen.h * -1; e < (d.flen.h + 1); e++) {
                        k = l.theDate.copy();
                        k.adj(3, e);
                        f = (e !== 0) ? d.themeDate : d.themeDatePick;
                        if (d.validHours !== false && a.inArray(k.get(3), d.validHours) < 0) {
                            f += " " + h + "griddate-disable"
                        }
                        a("<li>", {"class": "ui-body-" + f}).html("<span>" + ((l.__("timeFormat") === 12) ? ((k.get(3) === 0) ? "12" : ((k.get(3) < 13) ? k.get(3) : (k.get(3) - 12))) : k.get(3)) + "</span>").appendTo(m.find("ul"))
                    }
                    m.appendTo(b);
                    break;
                case"i":
                    m = l._makeEl(c, {attr: {field: "i", amount: d.minuteStep}});
                    for (e = d.flen.i * -1; e < (d.flen.i + 1); e++) {
                        k = l.theDate.copy();
                        k.adj(4, (e * d.minuteStep));
                        f = (e !== 0) ? d.themeDate : d.themeDatePick;
                        a("<li>", {"class": "ui-body-" + f}).html("<span>" + l._zPad(k.get(4)) + "</span>").appendTo(m.find("ul"))
                    }
                    m.appendTo(b);
                    break;
                case"a":
                    if (l.__("timeFormat") !== 12) {
                        break
                    }
                    m = l._makeEl(c, {attr: {field: "a", amount: 1}});
                    k = a("<li class='ui-body-" + d.themeDate + "'><span> </span></li>");
                    for (e = 0; e < d.flen.a; e++) {
                        k.clone().appendTo(m.find("ul"))
                    }
                    if (l.theDate.get(3) < 12) {
                        k.clone().appendTo(m.find("ul"))
                    }
                    f = (l.theDate.get(3) > 11) ? [d.themeDate, d.themeDatePick] : [d.themeDatePick, d.themeDate];
                    a("<li>", {"class": "ui-body-" + f[0]}).html("<span>" + l.__("meridiem")[0] + "</span>").appendTo(m.find("ul"));
                    a("<li>", {"class": "ui-body-" + f[1]}).html("<span>" + l.__("meridiem")[1] + "</span>").appendTo(m.find("ul"));
                    if (l.theDate.get(3) > 11) {
                        k.clone().appendTo(m.find("ul"))
                    }
                    for (e = 0; e < d.flen.a; e++) {
                        k.clone().appendTo(m.find("ul"))
                    }
                    m.appendTo(b);
                    break
            }
        }
        a("<div>", {"class": h + "flipcenter ui-overlay-shadow"}).css("pointerEvents", "none").appendTo(l.d.intHTML);
        if (d.useSetButton || d.useClearButton) {
            j = a("<div>", {"class": h + "controls"});
            if (d.useSetButton) {
                a('<a href="#">' + ((d.mode === "flipbox") ? l.__("setDateButtonLabel") : l.__("setTimeButtonLabel")) + "</a>").appendTo(j).buttonMarkup({theme: d.theme, icon: "check", iconpos: "left", corners: true, shadow: true}).on(d.clickEventAlt, function (i) {
                    i.preventDefault();
                    if (l.dateOK === true) {
                        l.d.input.trigger("datebox", {method: "set", value: l._formatter(l.__fmt(), l.theDate), date: l.theDate});
                        l.d.input.trigger("datebox", {method: "close"})
                    }
                })
            }
            if (d.useClearButton) {
                a('<a href="#">' + l.__("clearButton") + "</a>").appendTo(j).buttonMarkup({theme: d.theme, icon: "delete", iconpos: "left", corners: true, shadow: true}).on(d.clickEventAlt, function (i) {
                    i.preventDefault();
                    l.d.input.val("");
                    l.d.input.trigger("datebox", {method: "clear"});
                    l.d.input.trigger("datebox", {method: "close"})
                })
            }
            if (d.useCollapsedBut) {
                j.addClass("ui-datebox-collapse")
            }
            j.appendTo(l.d.intHTML)
        }
        if (l.wheelExists) {
            l.d.intHTML.on("mousewheel", ".ui-overlay-shadow", function (i, n) {
                i.preventDefault();
                l._offset(a(this).jqmData("field"), ((n < 0) ? -1 : 1) * a(this).jqmData("amount"))
            })
        }
        l.d.intHTML.on(l.drag.eStart, "ul", function (n, i) {
            if (!l.drag.move) {
                if (typeof i !== "undefined") {
                    n = i
                }
                l.drag.move = true;
                l.drag.target = a(this).find("li").first();
                l.drag.pos = parseInt(l.drag.target.css("marginTop").replace(/px/i, ""), 10);
                l.drag.start = l.touch ? n.originalEvent.changedTouches[0].pageY : n.pageY;
                l.drag.end = false;
                n.stopPropagation();
                n.preventDefault()
            }
        });
        l.d.intHTML.on(l.drag.eStart, "." + h + "flipcenter", function (i) {
            if (!l.drag.move) {
                l.drag.target = l.touch ? i.originalEvent.changedTouches[0].pageX - a(i.currentTarget).offset().left : i.pageX - a(i.currentTarget).offset().left;
                l.drag.tmp = l.d.intHTML.find("." + h + "flipcenter").innerWidth() / ((a.inArray("a", l.fldOrder) > -1 && l.__("timeFormat") !== 12) ? l.fldOrder.length - 1 : l.fldOrder.length);
                a(l.d.intHTML.find("ul").get(parseInt(l.drag.target / l.drag.tmp, 10))).trigger(l.drag.eStart, i)
            }
        })
    }});
    a.extend(a.mobile.datebox.prototype._drag, {timeflipbox: function () {
        this._drag.flipbox.apply(this)
    }, flipbox: function () {
        var b = this, d = this.options, c = this.drag;
        a(document).on(c.eMove, function (f) {
            if (c.move && (d.mode === "flipbox" || d.mode === "timeflipbox")) {
                c.end = b.touch ? f.originalEvent.changedTouches[0].pageY : f.pageY;
                c.target.css("marginTop", (c.pos + c.end - c.start) + "px");
                f.preventDefault();
                f.stopPropagation();
                return false
            }
        });
        a(document).on(c.eEnd, function (f) {
            if (c.move && (d.mode === "flipbox" || d.mode === "timeflipbox")) {
                c.move = false;
                if (c.end !== false) {
                    f.preventDefault();
                    f.stopPropagation();
                    c.tmp = c.target.parent().parent();
                    b._offset(c.tmp.jqmData("field"), (parseInt((c.start - c.end) / c.target.innerHeight(), 10) * c.tmp.jqmData("amount")))
                }
                c.start = false;
                c.end = false
            }
        })
    }})
})(jQuery);