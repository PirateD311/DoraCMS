var initFontSize = function() {
		    var _viewportWidth;
		    var lock = false;
		    var _htmlNode = document.getElementsByTagName('html')[0];
		    var _scrollWidth = window.innerWidth || screen.availWidth || document.documentElement.scrollWidth;
		    var _scrollHeight = (screen.height > 0) ? (window.innerHeight >= screen.height || window.innerHeight == 0) ? screen.height : window.innerHeight : window.innerHeight
		    var maxWidth = 750;
		    _viewportWidth = _scrollHeight > _scrollWidth ? _scrollWidth : _scrollHeight;
		    _htmlNode.style.fontSize = '100px';
		    if (_viewportWidth < 150 || _viewportWidth > 640) {
		        setTimeout(function() {
		            !lock && initFontSize();
		            lock = true;
		        }, 200)
		    } else {
		        _htmlNode.style.fontSize = _viewportWidth / maxWidth * 100 + 'px';
		    }
		}
		initFontSize();
		window.onresize = function(){
			initFontSize();
		}