//返回顶部
$(function(){
//	FastClick.attach(document.body);  
	$("body").append('<p class="to-top"></p>');
	$(window).on('scroll',function(){
		if($(window).scrollTop()<=200){
			$(".to-top").hide();
		}else{
			$(".to-top").show();
		}
	});
	$(".inner").bind('scroll',function(){
		if($(".inner").scrollTop()<=200){
			$(".to-top").hide();
		}else{
			$(".to-top").show();
		}
	});
	$(".to-top").on("click",function(){
		$("body,html,.inner").animate({scrollTop: 0},300);
	});
});
//判断是否登录
function isLogin(){
	var userId	 =	getCookie('user_id');
	if (userId) {
		return true;
	} else{
		return true;
//		return false;
	}
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}


//获取更多
	$(function(){
		//头部下拉
	 	$(".show-list").on("click",function(){
	 		if ($(this).hasClass("active")) {
	 			$(".head-list").slideUp(100);
	 			var urlSign = window.location.href.split("/");
	 			if(urlSign[urlSign.length - 1] == "User"){
	 				$(this).attr("src","https://static.gungunbook.com//gungunbook/M/images/person/more_03.png");
	 			}else{
                    $(this).attr("src","/public/static/cms/picture/more.png");
	 			}

	 			setTimeout('$(".head-list-mask").hide();',100);
	 			$("body").removeClass("of-hidden");
	 			$(this).removeClass("active");
	 		} else{
	 			$(".head-list-mask").css("height",$(document).height());
                $(".head-list-mask").css("width",$(document).width());
	 			$(".head-list-mask").show();
	 			$(".head-list").slideDown(100);
	 			$(this).attr("src","https://static.gungunbook.com/images/newHead/close.png");
	 			$("body").addClass("of-hidden");
	 			$(this).addClass("active");
	 		}
	 	});
	 	$(".head-list").on('touchmove', function(event) {
		    event.preventDefault();
		});
	 	$(".head-list-mask").on("click",function(){
	 		$(".head-list").slideUp(100);
 			$(".show-list").attr("src","/public/static/cms/picture/more.png");
 			setTimeout('$(".head-list-mask").fadeOut();',100);
 			$("body").removeClass("of-hidden");
 			$(".show-list").removeClass("active");
	 	});
	});
