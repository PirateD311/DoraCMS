//达叔公司代码
(function () {
    var fromurl = document.referrer;
    if (fromurl.substr(0, 7) == 'http://') {
        fromurl = fromurl.replace('http://', '');
    } else {
        fromurl = fromurl.replace('https://', '');
    }
    fromurl = fromurl.split('\/');
    fromurl = fromurl[0];
    var urlfrom = fromurl.split('.');
    if (urlfrom.length > 2) {
        urlfrom = urlfrom[1] + '.' + urlfrom[2];
    } else {
        urlfrom = fromurl;
    }
    var gmate = document.getElementsByTagName('meta'), isviewport = 1;
    for (var i = 0, len = gmate.length; i < len; i++) {
        if (gmate[i] && gmate[i].getAttribute('name') == 'viewport') {
            isviewport = 0;
        }
    }
    if (isviewport) {
        var node = document.createElement('meta');
        node.content = 'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no';
        node.name = 'viewport';
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(node, head.firstChild);
    }

    var zone = { "border": "FFFFFF", "headline": "0000FF", "background": "FFFFFF", "description": "444444", "dispurl": "008000", "width": "640", "height": "150", "zoneid": "1036", "htmlcontrol": "" };
    var siteid = 34;
    var styre_cancel = 'position:absolute;top:0;left:0;cursor:pointer;width:20px;height:20px;z-index:2147483647;display: block;'
    var styre_rcancel = 'position:absolute;top:0;right:0;cursor:pointer;width:20px;height:20px;z-index:2147483647;display: none;'
    var switch_type = 0;
    var winHeights = 0;
    var winHeight = 0;
    if (window.innerHeight) {
        winHeights = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        winHeights = document.body.clientHeight;
    }
    var system = { win: false, mac: false, iPhone: false, xll: false, ipad: false, Android: false, Ios: false };
    var p = navigator.platform;
    var u = navigator.userAgent;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.iPhone = p.indexOf('iPhone') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);
    system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
    system.Android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (system.win || system.mac || system.xll) { } else {
        var quwei_hidecolor_div = 'disply:none'
    }
    var quwei_hidetop = winHeights * (30 / 100);
    var domain = {
        jsurl: "http://mess.gc2l9.cn:84/", imgurl: "http://photo.mall053.com/"
    };
    var __ua = navigator.userAgent.toLowerCase(), __B = {
        ver: (__ua.match(/(?:rv|me|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
        opera: /opera/.test(__ua),
        maxthon: /maxthon/.test(__ua),
        theworld: /theworld/.test(__ua),
        qq: /qqbrowser/.test(__ua),
        sogou: /se /.test(__ua),
        liebao: /liebao/.test(__ua),
        firefox: /mozilla/.test(__ua) && !/(compatible|webkit)/.test(__ua),
        chrome: /chrome|crios/.test(__ua),
        safari: /webkit/.test(__ua),
        uc: /ucbrowser|ucweb|rv:1.2.3.4|uc/.test(__ua),
        ie: /msie/.test(__ua) && !/opera/.test(__ua),
        ios: !!__ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: /android|linux/.test(__ua),
        iphone: /iphone/.test(__ua),
        ipad: /ipad/.test(__ua)
    };
    var Base64 = {
        k: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64.B(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63; if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + Base64.k.charAt(enc1) + Base64.k.charAt(enc2) +
                    Base64.k.charAt(enc3) + Base64.k.charAt(enc4);
            }
            return output;
        },
        B: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
    }
    function __G(d, c) {
        c = c || window;
        if ("string" === typeof d || d instanceof String) {
            return c.document.getElementById(d)
        } else {
            if (d && d.nodeName && (d.nodeType == 1 || d.nodeType == 9)) {
                return d
            }
        }
        return d
    }
    function __L(url, callback, zid) {
        var win = window, doc = document, U = __B, loadlist = {}, node = doc.createElement("script"), head = doc.getElementsByTagName('head')[0];
        function clear() {
            node.onload = node.onreadystatechange = node.onerror = null; head.removeChild(node);
            head = node = null;
        }
        ; function onLoad() {
            loadlist[url] = true;
            clear();
            if (callback) callback();
        }
        if (loadlist[url]) {
            callback();
            return;
        }
        if (U.ie && (U.ver < 9 || (doc.documentMode && doc.documentMode < 9))) {
            node.onreadystatechange = function () {
                if (/loaded|complete/.test(node.readyState)) {
                    node.onreadystatechange = null;
                    onLoad();
                }
            };
        } else {
            if (U.ver >= 10) {
                node.onerror = function () {
                    setTimeout(clear, 0);
                };
                node.onload = function () {
                    setTimeout(onLoad, 0);
                };
            } else {
                node.onerror = clear;
                node.onload = onLoad;
            }
        }
        node.async = true;
        node.src = url;
        if (zid) node.id = zid;
        head.insertBefore(node, head.firstChild);
    }
    function __E(a, f) {
        if (a.length && a.slice) {
            for (i = 0; i < a.length; i++) {
                switch (typeof a[i]) {
                    case "string":
                    case "function":
                        f(a[i]());
                        break;
                    default:
                        break
                }
            }
        }
    }
    function __M(o, t) {
        if (!o || !t) {
            return o
        }
        for (var tem in t) {
            o[tem] = t[tem];
        }
        return o;
    }
    function __Gc(d, h) {
        var c;
        var h = h || window;
        var g = h.document;
        var e = new RegExp("(^| )" + d + "=([^;]*)(;|\x24)");
        var f = e.exec(g.cookie);
        if (f) {
            c = f[2]
        }
        return c
    }
    function __Sc(e, f, d) {
        d = d || {};
        var c = d.expires;
        if ("number" == typeof d.expires) {
            c = new Date();
            c.setTime(c.getTime() + d.expires)
        }
        document.cookie = e + "=" + f + (d.path ? "; path=" + d.path : "") + (c ? "; expires=" + c.toGMTString() : "") + (d.domain ? "; domain=" + d.domain : "") + (d.secure ? "; secure" : "")
    }
    function __P() {
        var win = window, doc = document, p = [];
        function r() {
            var c;
            try {
                c = win.opener ? win.opener.document.location.href : doc.referrer
            } catch (e) {
                c = doc.referrer
            }
            function K(r) {
                var s = ["wd", "p", "q", "keyword", "kw", "w", "key", "word", "query", "q1", "name"];
                if (r != "" && r != null) {
                    for (var i = 0; i < s.length; i++) {
                        var re = new RegExp("[^1-9a-zA-Z]" + s[i] + "=\([^&]*\)");
                        var kk = r.match(re);
                        if (kk != null) {
                            return kk[1]
                        }
                    }
                }
                return ""
            }
            c = c ? {
                r: encodeURIComponent(c),
                k: encodeURIComponent(K(c))
            } : {
                    r: encodeURIComponent(c)
                };
            return c;
        }

        function u() {
            var c;
            try {
                c = win.top.document.location.href;
            } catch (e) {
                c = doc.location.href;
            }
            return {
                u: encodeURIComponent(c)
            };
        }
        function sE() {
            var e = 0, m = navigator.mimeTypes, i;
            if (navigator.mimeTypes != null && navigator.mimeTypes.length > 0) {
                for (i in m) {
                    if (m[i]['type'] == 'application/vnd.chromium.remoting-viewer') {
                        e = '1';
                    }
                }
            }
            if (e != '1') {
                var _tk = "track" in document.createElement("track"), _se = "scoped" in document.createElement("style"), _vl = "v8Locale" in window;
                if (_tk && !_se && !_vl) {
                    e = '2';
                }
                if (_tk && _se && _vl) {
                    e = '3';
                }
            }
            return {
                se: e
            };
        }
        function j() {
            return {
                j: navigator.javaEnabled() ? 1 : 0
            };
        }

        function p() {
            return {
                p: navigator.plugins.length
            };
        }

        function m() {
            return {
                m: navigator.mimeTypes.length
            };
        }

        function f() {
            var v = 0;
            if (navigator.plugins && navigator.mimeTypes.length) {
                var b = navigator.plugins["Shockwave Flash"];
                if (b && b.description)
                    v = b.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".")
            } else if (__B.ie && !window.opera) {
                var c = null;
                try {
                    c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
                } catch (e) {
                    var a = 0;
                    try {
                        c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        a = 6;
                        c.AllowScriptAccess = "always"
                    } catch (e) {
                        if (a == 6)
                            return a.toString()
                    }
                    try {
                        c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                    } catch (e) {

                    }
                }
                if (c != null) {
                    var a = c.GetVariable("$version").split(" ")[1];
                    v = a.replace(/,/g, ".")
                }
            }
            return {
                f: v
            }
        }

        function res() {
            var D = screen, v = D.width + "x" + D.height;
            return {
                res: v
            }
        }

        function t() {
            var v = document.title;
            return {
                t: encodeURIComponent(v)
            }
        }

        function l() {
            var v = navigator.browserLanguage || navigator.language;
            return {
                l: v
            }
        }

        function c() {
            var v = navigator.cookieEnabled;
            v = v ? 1 : 0;
            return {
                c: v
            }
        }

        function H() {
            return document.body && {
                h: document.body.clientHeight
            };
        }

        var b = {};
        __E([j, p, m, f, r, u, res, t, l, c, H, sE], function (a) {
            __M(b, a)
        });
        for (var e in b) {
            p.push(e + "=" + b[e]);
        }
        return Base64.encode(p.join("&"));
    }
    function __ZD(arand) {
        setTimeout(function () {
            var a = ['top', 'left'], b = 0;
            u = setInterval(function () {
                document.getElementById(arand).style[a[b % 2]] = (b++) % 4 < 2 ? '0px' : '4px';
                if (b > 14) { window.document.getElementById(arand).style.top = '0px'; window.document.getElementById(arand).style.left = '0px'; clearInterval(u); }
            }, 32);
        }, 3000);
    }
    function __ZT(arand) {
        setTimeout(function () {
            var a = ['bottom', 'left'], b = 0;
            u = setInterval(function () {
                document.getElementById(arand).style[a[b % 2]] = (b++) % 4 < 2 ? '0px' : '4px';
                if (b > 16) { document.getElementById(arand).style.bottom = '0px'; document.getElementById(arand).style.left = '0px'; clearInterval(u); }
            }, 32);
        }, 3000);
    }
    function __A(c, d, e) {
        c = __G(c);
        d = d.replace(/^on/i, "").toLowerCase();
        if (c.addEventListener) {
            c.addEventListener(d, e, false)
        } else {
            if (c.attachEvent) {
                c.attachEvent("on" + d, e)
            }
        }
        return c
    }
    function __UA(c, d, e) {
        c = __G(c);
        d = d.replace(/^on/i, "").toLowerCase();
        if (c.removeEventListener) {
            c.removeEventListener(d, e, false)
        } else {
            if (c.detachEvent) {
                c.detachEvent("on" + d, e)
            }
        }
        return c
    }
    function __LC() {
        var c;
        try {
            c = window.top.document.location.host;
        } catch (e) {
            c = document.location.host;
        }
        return Base64.encode(c);
    }
    function __IH(el, where, html) {
        if (!el) {
            return false;
        }
        where = where.toLowerCase();
        if (el.insertAdjacentHTML) {
            el.insertAdjacentHTML(where, html);
        } else {
            var range = el.ownerDocument.createRange(),
                frag = null;
            switch (where) {
                case "beforebegin":
                    range.setStartBefore(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el);
                    return el.previousSibling;
                case "afterbegin":
                    if (el.firstChild) {
                        range.setStartBefore(el.firstChild);
                        frag = range.createContextualFragment(html);
                        el.insertBefore(frag, el.firstChild);
                    } else {
                        el.innerHTML = html;
                    }
                    return el.firstChild;
                case "beforeend":
                    if (el.lastChild) {
                        range.setStartAfter(el.lastChild);
                        frag = range.createContextualFragment(html);
                        el.appendChild(frag);
                    } else {
                        el.innerHTML = html;
                    }
                    return el.lastChild;
                case "afterend":
                    range.setStartAfter(el);
                    frag = range.createContextualFragment(html);
                    el.parentNode.insertBefore(frag, el.nextSibling);
                    return el.nextSibling;
            }
        }
    }
    function pvstas(pvid) {

        var aid, pid;
        if (pvid.aid.length > 1) {
            aid = pvid.aid.join(",").match(/([^,]+)(?!.*\1)/ig);
            pid = pvid.pid.join(",").match(/([^,]+)(?!.*\1)/ig);
        } else {
            aid = pvid.aid;
            pid = pvid.pid;
        }
        var url = domain.jsurl + "stats.php?adsid=" + aid + "&planid=" + pid + "&uid=1047&siteid=34&plantype=cpc&zoneid=1036&adtplid=8&sep=10";
        __L(url);
    }
    var ifsrc = domain.jsurl + "vn.php?id=" + zone.zoneid + '&sid=' + siteid + '&p=' + __P() + '&l=' + __LC();
    function __I() {
        var i = '<iframe src="' + ifsrc + '" width="' + zone.width + '" height="' + zone.height + '" marginheight="0" scrolling="no" frameborder="0" allowtransparency="true"></iframe>'
        return i;
    }
    function __LS() {
        var url = domain.jsurl + "v.php?id=" + zone.zoneid + '&' + __P();
        __L(url);
    }
    function __S() {
        if (!document.body && !__G('_nobody')) {
            document.write("<a id='_nobody' style='display: none'>none</a>");
        };
        var pvid = { pid: [], aid: [] };
        var ads = [{ "headline": "", "description": "", "dispurl": "", "alt": "", "url": "http:\/\/mess.gc2l9.cn:84\/c.php?s=JnpvbmVpZD0xMDM2JnNpdGVpZD0zNCZ1aWQ9MTA0NyZhZHNpZD0xOSZwbGFuaWQ9NSZwbGFudHlwZT1jcGMmdXJsPWh0dHAlM0ElMkYlMkZzYWZlc3QuNzkzZS5jbiUzQTg0ODQlMkZuZXdzJTJGZDA0MjAlMkYzNjBNb2JpbGVTYWZlXzE4MDQyMGE2Ny5odG1sJnZ0aW1lPTIwMTgtMDUtMjIgMTc6NTQ6MDEmaXA9MTgzLjE1OS4xODEuMTIy;4766c5705a3ba9dda6b991f9d0a5d272;&p=", "adsid": "19", "uid": "1004", "files_type": "0", "insert_code": "", "files": "url", "statistics_count": "", "planid": "5", "htmlcontrol": false, "advert_type": "1", "img_array": { "advert_style1": { "1": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfaly1fqgngp2u1xj20hs05k3zy.jpg", "2": "https:\/\/wx3.sinaimg.cn\/mw690\/807a4dfaly1fqgnghso9lj20hs046abx.jpg", "3": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfaly1fqgngp2u1xj20hs05k3zy.jpg" }, "advert_style2": { "1": "" }, "advert_style3": { "1": "" } }, "imageurl": "https:\/\/wx3.sinaimg.cn\/mw690\/807a4dfaly1fqgnghso9lj20hs046abx.jpg" }, { "headline": "", "description": "", "dispurl": "", "alt": "", "url": "http:\/\/mess.gc2l9.cn:84\/c.php?s=JnpvbmVpZD0xMDM2JnNpdGVpZD0zNCZ1aWQ9MTA0NyZhZHNpZD00NCZwbGFuaWQ9MSZwbGFudHlwZT1jcGMmdXJsPWh0dHAlM0ElMkYlMkZyaC5jb2RlLmpqeXguY29tJTJGc3ljb2RlJTJGMTI1MDY2Lmh0bWwlM0ZjcGxhY2VpZCUzRDE5MzkuMjA1MSZ2dGltZT0yMDE4LTA1LTIyIDE3OjU0OjAxJmlwPTE4My4xNTkuMTgxLjEyMg==;7420bae4ae6c51e794af63ea2810fb34;&p=", "adsid": "44", "uid": "1002", "files_type": "0", "insert_code": "", "files": "url", "statistics_count": "", "planid": "1", "htmlcontrol": false, "advert_type": "1", "img_array": { "advert_style1": { "1": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfagy1fmwccw41q5g20hs046juc.gif", "2": "https:\/\/wx1.sinaimg.cn\/mw690\/807a4dfagy1fmwccw5c7ng20hs046n0w.gif" }, "advert_style2": { "1": "" }, "advert_style3": { "1": "" } }, "imageurl": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfagy1fmwccw41q5g20hs046juc.gif" }, { "headline": "", "description": "", "dispurl": "", "alt": "", "url": "http:\/\/mess.gc2l9.cn:84\/c.php?s=JnpvbmVpZD0xMDM2JnNpdGVpZD0zNCZ1aWQ9MTA0NyZhZHNpZD0yMSZwbGFuaWQ9MSZwbGFudHlwZT1jcGMmdXJsPWh0dHAlM0ElMkYlMkZyaC5jb2RlLmpqeXguY29tJTJGc3ljb2RlJTJGMTI1MDY2Lmh0bWwlM0ZjcGxhY2VpZCUzRDE5MzkuMjA1MSZ2dGltZT0yMDE4LTA1LTIyIDE3OjU0OjAxJmlwPTE4My4xNTkuMTgxLjEyMg==;c56e4b0b6afa5bc81d21af541a399e9e;&p=", "adsid": "21", "uid": "1002", "files_type": "0", "insert_code": "", "files": "url", "statistics_count": "", "planid": "1", "htmlcontrol": false, "advert_type": "1", "img_array": { "advert_style1": { "1": "https:\/\/wx1.sinaimg.cn\/mw690\/807a4dfagy1fmwccw5c7ng20hs046n0w.gif", "2": "https:\/\/wx3.sinaimg.cn\/mw690\/807a4dfagy1fmwcdaiby9g20hs046gnt.gif" }, "advert_style2": { "1": "" }, "advert_style3": { "1": "" } }, "imageurl": "https:\/\/wx3.sinaimg.cn\/mw690\/807a4dfagy1fmwcdaiby9g20hs046gnt.gif" }, { "headline": "", "description": "", "dispurl": "", "alt": "", "url": "http:\/\/mess.gc2l9.cn:84\/c.php?s=JnpvbmVpZD0xMDM2JnNpdGVpZD0zNCZ1aWQ9MTA0NyZhZHNpZD0xMyZwbGFuaWQ9NSZwbGFudHlwZT1jcGMmdXJsPWh0dHAlM0ElMkYlMkZzYWZlc3QuNzkzZS5jbiUzQTg0ODQlMkZuZXdzJTJGZDA0MjAlMkYzNjBNb2JpbGVTYWZlXzE4MDQyMGE2Ny5odG1sJnZ0aW1lPTIwMTgtMDUtMjIgMTc6NTQ6MDEmaXA9MTgzLjE1OS4xODEuMTIy;56e6c591e083f7e8b38ba52df0171f2d;&p=", "adsid": "13", "uid": "1004", "files_type": "0", "insert_code": "", "files": "url", "statistics_count": "", "planid": "5", "htmlcontrol": false, "advert_type": "1", "img_array": { "advert_style1": { "1": "https:\/\/wx1.sinaimg.cn\/mw690\/807a4dfaly1fqgngax29sj20hs046gm3.jpg", "2": "https:\/\/wx3.sinaimg.cn\/mw690\/807a4dfaly1fqgnghso9lj20hs046abx.jpg", "3": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfaly1fqgngp2u1xj20hs05k3zy.jpg" }, "advert_style2": { "1": "https:\/\/wx1.sinaimg.cn\/mw690\/807a4dfaly1fqgngax29sj20hs046gm3.jpg", "2": "https:\/\/wx3.sinaimg.cn\/mw690\/807a4dfaly1fqgnghso9lj20hs046abx.jpg", "3": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfaly1fqgngp2u1xj20hs05k3zy.jpg" }, "advert_style3": { "1": "" } }, "imageurl": "https:\/\/wx1.sinaimg.cn\/mw690\/807a4dfaly1fqgngax29sj20hs046gm3.jpg" }, { "headline": "", "description": "", "dispurl": "", "alt": "", "url": "http:\/\/mess.gc2l9.cn:84\/c.php?s=JnpvbmVpZD0xMDM2JnNpdGVpZD0zNCZ1aWQ9MTA0NyZhZHNpZD0yMCZwbGFuaWQ9MSZwbGFudHlwZT1jcGMmdXJsPWh0dHAlM0ElMkYlMkZ6LmNvZGUuemFudGFpbmV0LmNvbSUyRnN5Y29kZSUyRjE0MzQwNi5odG1sJnZ0aW1lPTIwMTgtMDUtMjIgMTc6NTQ6MDEmaXA9MTgzLjE1OS4xODEuMTIy;9f2d44ce24b3f9a54ab935d93d319010;&p=", "adsid": "20", "uid": "1002", "files_type": "0", "insert_code": "", "files": "url", "statistics_count": "", "planid": "1", "htmlcontrol": false, "advert_type": "1", "img_array": { "advert_style1": { "1": "https:\/\/wx4.sinaimg.cn\/mw690\/807a4dfagy1fmwcd9k1zdg20hs0460xz.gif", "2": "https:\/\/wx2.sinaimg.cn\/mw690\/807a4dfagy1fmwccw41q5g20hs046juc.gif" }, "advert_style2": { "1": "" }, "advert_style3": { "1": "" } }, "imageurl": "https:\/\/wx4.sinaimg.cn\/mw690\/807a4dfagy1fmwcd9k1zdg20hs0460xz.gif" }];
        var config = { "border": "FFFFFF", "headline": "0000FF", "background": "FFFFFF", "description": "444444", "dispurl": "008000", "width": "640", "height": "150", "zoneid": "1036", "htmlcontrol": "" };
        var time_status = 0;
        var zoneid_conf = 1036;
        var jump_url = 'http://mess.gc2l9.cn:84';
        var ieco = { "iecounting_code": "<p style=\"display:none;\">\n<script src=\"https:\/\/s19.cnzz.com\/z_stat.php?id=1273592855&web_id=1273592855\" language=\"JavaScript\"><\/script>\n<\/p>\n" };
        document.writeln(ieco.iecounting_code);
        /*
         * RUN STATS
         */
        pvid.aid.push(ads[0].adsid);
        pvid.pid.push(ads[0].planid);
        pvstas(pvid);
        if (ads[0].files_type == 0) {
            var w = window,
                d = document,
                oo = (d.compatMode == "BackCompat" ? d.body : d.documentElement),
                cw = oo.clientWidth,
                ch = oo.clientHeight;
            var autofit = 1;
            zw = (typeof (autofit) != "undefined" && autofit == 1 ? cw : 640);
            zh = zw * zone.height / zone.width;
            var arand = Math.floor(Math.random() * 100000);
            var ext = ads[0].imageurl.substr(ads[0].imageurl.lastIndexOf(".")).toLowerCase();
            if (ext != '.swf') {
                var str = "<div><a target='_blank' href='" + ads[0].url + "' id='v_ads' style = 'z-index: 2147483647;left:0;width: auto;height: " + zh + "px;text-align:center;display:block;'><img src='" + ads[0].imageurl + "' border='0' style='width: 100%;height:" + zh + "px;'></a>";
            } else {
                var str = "<div><a target='_blank' href='" + ads[0].url + "' id='v_ads' style = 'z-index: 2147483647;left:0;width: auto;height: " + zh + "px;text-align:center;display:block;'><embed src='" + ads[0].imageurl + "' border='0' style='width: 100%;height:" + zh + "px;' /></a>";
            }
            document.writeln("<div  id=" + arand + " style='position: static;'><a target='_blank' href='" + ads[0].url + "'><div style='z-index: 2147483647;position: absolute;width: 98%;height: " + winHeight + "px;margin-top: -" + winHeight + "px;'></div></a>" + str + "<span style='display: block;position: relative;left: 2px;bottom: 2px;width: 20px;height: 12px;background: url(" + domain.jsurl + "/images/pc-fggxl-icon.png) 0 -48px;margin-top: -14px;'></span></div><a target='_blank' href='" + ads[0].url + "'><div style='z-index: 2147483647;position: absolute;width: 98%;height: " + winHeight + "px;'></div></a></div>");

        } else if (ads[0].files_type == 1) {
            document.writeln(ads[0].insert_code);
        };
        var baiducnzz = "<script>var _hmt = _hmt || [];(function() { var hm = document.createElement('script');hm.src = 'https://hm.baidu.com/hm.js?c241b72362a9cd41f1fa595223972b2e'; var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(hm, s);})();</script>";
        document.writeln(baiducnzz);
        (function () {
            function __G(d, c) {
                c = c || window;
                if ("string" === typeof d || d instanceof String) {
                    return c.document.getElementById(d)
                } else {
                    if (d && d.nodeName && (d.nodeType == 1 || d.nodeType == 9)) {
                        return d
                    }
                }
                return d
            }
            function __A(c, d, e) {
                c = __G(c);
                d = d.replace(/^on/i, "").toLowerCase();
                if (c.addEventListener) {
                    c.addEventListener(d, e, false)
                } else {
                    if (c.attachEvent) {
                        c.attachEvent("on" + d, e)
                    }
                }
                return c
            }
            function __B(i) {
                i = i || window.event;
                this.target = i.target || i.srcElement
            }
            function __C(i) {
                i = i || window.event;
                this.target = i.target || i.srcElement
            }
            function __Z(i) {
                i = i || window.event;
                this.target = i.target || i.srcElement
            }

            function __X(i) {
                var V = "&b=" + i.clientX + ';' + i.clientY + '&g=' + x + ';' + y;
                var z = new __Z(i);
                var A = z.target.tagName.toLowerCase();
                if (A != "a") {
                    z.target = z.target.parentNode
                }
                if (z.target.href.indexOf("&b=") == -1 && z.target.href.length > 50) {
                    z.target.href += V;
                }
            }
            var x = 0, y = 0; xn = 0;
            function __XY(i) {
                if (xn > 10) {
                    return
                }
                if (x == 0) { x = i.clientX; }
                else { x = x + "," + i.clientX; }
                if (y == 0) { y = i.clientY; }
                else { y = y + "," + i.clientY; }
                xn++;
            }

            function __C2(i) {
                var jump_url = 'http://mess.gc2l9.cn:84';
                var z = new __Z(i);
                var A = z.target.tagName.toLowerCase();
                if (A != "a") {
                    z.target = z.target.parentNode
                }
                if (z.target.href.indexOf(jump_url) > -1 && z.target.href.length > 50) {
                    var C_2 = new Image();
                    C_2.src = ads[0].c2_url;
                }

            }
            var e = document;
            dishs = e.getElementsByTagName("a");
            for (var q = 0; q < dishs.length; q++) {
                __A(dishs[q], "mousemove", __XY);
                dishs[q].target = "_blank"
            }
        })();
    } __S();
})();
