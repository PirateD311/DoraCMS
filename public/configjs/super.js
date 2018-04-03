(function(){
	/**
	 * 强制弹窗
	 * @param {*跳转的目标} url 
	 */
	function forceWindow(url){
		var _hascsp = 0;
		var poptype = 1;
		function updatecs() {};
		 (function() {
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
			};
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
		__csppp.open(url, window.screen.width, window.screen.height);
	};
	/**
	 * 获得对应的cookie
	 * @param {*Cookie名} name 
	 */
	function getCookie(name){ 
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
	/**
	 * 检查是否锁定并设置锁定时间
	 * @param {*锁定的小时数} hour 
	 */
	function checkLockCookie(hour,maxCount){
		var LOCKSTTIME = 'GewEWx+vbTkYq';
		var COUNT = 'agEY0agY';
		if(document.cookie.indexOf(LOCKSTTIME)!==-1){	
			maxCount = maxCount||1;			
			var time = getCookie(LOCKSTTIME);
			var count = parseInt(getCookie(COUNT)||0);
			var lockTime = (hour||1)*60*60*1000;
			if(new Date().getTime()-parseInt(time)<lockTime){
				if(count<maxCount){
					document.cookie= COUNT+"="+(count+1)+';';	
					return true;								
				}else{
					return false;
				}					
			}else{					
				document.cookie= LOCKSTTIME+"="+new Date().getTime()+';';					
				return true;
			};
		}else{				
			document.cookie= LOCKSTTIME+"="+new Date().getTime()+';';				
			return true;
		};
	};	
	/**
	 * 原生实现的get请求
	 * @param {*url} url 
	 * @param {*请求的回调。返回值:(err,resp)} cb 
	 */
	function myGet(url,cb){
		//步骤一:创建异步对象
		var ajax = new XMLHttpRequest();
		//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
		ajax.open('get',url);
		//步骤三:发送请求
		ajax.send();
		//步骤四:注册事件 onreadystatechange 状态改变就会调用
		ajax.onreadystatechange = function () {
			if (ajax.readyState==4 &&ajax.status==200) {
				//步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
				cb(null,ajax.responseText)
		　　}
		}
	};
	/**
	 * 按ip过滤部分地区后执行逻辑
	 * @param {*过滤的城市黑名单} citys 
	 * @param {*通过时的回调} cb 
	 * @param {*被过滤时的回调} cb2 
	 */
	function filterCity(citys,cb,cb2){
		myGet('http://bmp.cosfuli.com/test/get',function(err,resp){
			if(!err){
				var area = JSON.parse(resp).area;
				var isFilter = false;
				if(citys.split instanceof Function){
					citys = citys.split(' ');
				}
				if(citys instanceof Array){
					for(var i =0;i<citys.length;i++){
						if(area.Country.indexOf(citys[i])!== -1){
							isFilter = true;
							break;
						}
					}
				}
				if(isFilter){					
				}else{
					cb();
				}
			}
		});
	}

	//测试区
	//forceWindow('http://www.baidu.com');
	setTimeout(function(){
		if(checkLockCookie(4,1)){		
			filterCity('广州',function(){				
				// forceWindow('http://jump.686lm.com/jump/index.html')
				forceWindow('http://qr.alipay.com/c1x07766kinzpbdaydwuw1f');	 夏七
				// forceWindow('https://qr.alipay.com/c1x08205f5zbi7rhz4xaz1e');	//赵挺
				// forceWindow('https://www.cosfuli.com/');	
			});
		};		
	},1000*(2 + Math.random()*2));

})(window,document);
