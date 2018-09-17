var bookId = $("#bookId").val();
var chapterId = $('#chapterId').val();
var vip = $('#isVip').val();
var isToNext = true; // 是否能去下一章
var wx = is_weixin(); // 是否是微信环境
var fontsize = localStorage.getItem('fontsize') || 0.36;  // 字体大小
var themeType = localStorage.getItem('themeType') || 0; // 主题类别

/**************************************业务逻辑****************************************/
$(function () {

  $(".read-body").show();
  FastClick.attach(document.body);

  init();

  // 微信环境下
  if (wx) {
    $('.qrcode-tip').show();
    alertWxCode();
    ForceWatch();
  }

  // 点击下一章时根据isToNext来判断是否跳转
  $('.toNext').click(function () {
    if (!isToNext) {
      $('.forceAlert-mask').css('display', 'flex');
      return false;
    }
  })

  // 加入书架
  $('.add-shelf').click(function () {
    shelfAjax();
  })

  // 设置背景和字体大小
  $('.set-item').click(function () {
    var flag = $(this).index();
    if(flag < 4){
      setTheme(flag)
    }else {
      setFont(flag)
    }
  })

  // 调出菜单
  $('.read-menu').click(function (event) {
    $('.menu-alert').slideToggle();
    event.stopPropagation();
  })

  // 隐藏菜单
  $('.read-body').click(function () {
    $('.menu-alert').slideUp();
  })

  // 自动购买
  $('.auto-buy').click(function (event) {
    event.stopPropagation();
    autoBuy();
  })

  //投票弹出窗
  $(".praise-vote").on("click",function(){
    $(".reward-mask").show();
    $(".reward-box").slideToggle();
  });

  // 赞赏弹出窗
  $(".praise-btn").on("click",function(){
    $(".reward-mask").show();
    $(".praise-box").slideToggle();
  });

  // 点击评论按钮
  $('.praise-comment').click(function () {
    $('.comment-mask').show();
  })

  // 隐藏评论弹窗
  $('.comment-top i').click(function () {
    $(".comment-word").val('')
    $('.comment-mask').hide();
  })

  // 发布评论
  $('.comment-top b').click(function () {
    publishComment();
  })

  // 改变评论字数
  $('.comment-word').on('input',function () {
    var num = $('.comment-word').val().length;
    $('.comment-num span').html(num)
  })

  /*$(".read-body").on("touchmove", function (event) {
    event.stopPropagation();
    $(".mask,.read-settings").hide();
  });
  $(".chapter-con").on("click", function () {
    if ($(".settings-item").is(":visible")) {
      $(".settings-item").hide();
    } else {
      $(".mask,.settings-list").toggle();
    }
  });
  $(".other-money-num").mouseup(function (e) {
    e.preventDefault();
  });
  $(".read-menu").on("click", function () {
    if ($(".settings-item").is(":visible")) {
      $(".settings-item").hide();
    }
    $(".mask,.settings-list").toggle();
  })
  $(".mask").on("click", function (event) {
    event.stopPropagation();
    $(".mask,.settings-list").hide();
  });
  $(".read-settings").on("click", function (event) {
    event.stopPropagation();
  });
  $(".read-settings").on("touchmove", function (event) {
    event.stopPropagation();
  });
  $(".settings-bg").on("click", "li", function () {
    setBg($(this).index());
  });
  $(".settings-font").on("click", "li", function () {
    setSize($(this).index());
  });*/
});


/****************************************功能函数********************************************/

// 初始化
function init() {
  setFont(); // 初始化字体大小
  setTheme(themeType); // 初始化主题
  //getStateOfInfo(); // 初始化赞赏、投票数、评论数
  //getStateOfShelf(); // 初始化书架状态
  //getVipInfo(); // 初始化VIP等级
}

// 发布评论
function publishComment() {
  var content = $(".comment-word").val().trim();
  if(content == '') return;
  $.ajax({
    type: "POST",
    url: "/index.php/Book/CommentAdd",
    dataType: "json",
    data: {
      "bid": bookId,
      "cid": chapterId,
      "vip": vip,
      "con" : content
    },
    error: function(){
      layer.open({
        content: '发布失败！',
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
    },
    success: function(json){
      if(json.result=="login"){
        window.location = '/index.php/Index/Login';
      }else if(json.result=="success"){
        layer.open({
          content: '发布成功！',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
        $(".comment-word").val('')
        window.location.reload();
      }else if(json.result=='forbiden'){
        layer.open({
          content: '当前被禁言',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }else if(json.result=='book_forbiden'){
        layer.open({
          content: '当前图书禁止评论',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }else if(json.result=='timeLimit'){
        layer.open({
          content: '评论回复需间隔60秒哦~',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }else{
        layer.open({
          content: '发布失败！',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }
    }
  });
}

// 设置字体大小
function setFont(flag) {
  fontsize = parseFloat(fontsize);
  if(flag == 4 && fontsize < 0.52){
    fontsize += 0.04;
  }else if(flag == 5 && fontsize > 0.28){
    fontsize -= 0.04;
  }
  $(".chapter-con").css("font-size", fontsize + 'rem');
  localStorage.setItem('fontsize',fontsize)
}

// 设置主题
function setTheme(flag) {
  $(".read-body").removeClass("fixed-bg");
  if(flag != 3){ // 非夜间模式
    $(".read-body,.read-top,.menu-alert").css("background", "");
    $('.chapter-con,.read-title,.praise-words,.rec-item,.read-top,.read-top-btn a,.menu-alert').css('color','');
  }
  if(flag == 0){ // 默认
    $(".read-body").addClass("fixed-bg");
    $('.read-top').css('background','#f5eacc')
  }
  if(flag == 1){ // 护眼
    $(".read-body,.read-top").css("background", "#cce8cf");
  }
  if(flag == 2){ // 白天
    $(".read-body,.read-top").css("background", "#FFFFFF");
  }
  if(flag == 3){ // 夜间
    $(".read-body,.read-top,.menu-alert").css("background", "#1d1d1d");
    $('.chapter-con,.read-title,.praise-words,.rec-item,.read-top,.read-top-btn a,.menu-alert a').css('color','#878787');
  }
  $('.set-item').eq(flag).addClass('active').siblings().removeClass('active')
  localStorage.setItem('themeType',flag)
}

// 自动购买
function autoBuy() {
  $.ajax({
    url: '/index.php/Book/Auto',
    type: 'POST',
    dataType: 'json',
    data: 'bid=' + bookId,
    error: function (json) {
      layer.open({
        content: '订阅失败，请返回重试！',
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
    },
    success: function (json) {
      if (json.result == 'success') {
        $(".auto-buy").addClass("auto-on");
      } else if (json.result == 'delSuccess') {
        $(".auto-buy").removeClass("auto-on");
      } else if (json.result == 'login') {
        layer.open({
          content: '未登录！',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
        window.location = '/index.php/Index/Login';
      } else {
        layer.open({
          content: '操作失败！',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }
    }
  });
}

// 强制关注
function ForceWatch() {

  var platform = '';

  if (getUrlParam('platform')) {
    platform = getUrlParam('platform');
    $.cookie("platform", platform, {expires: 365, path: '/'});
  } else if ($.cookie("platform")) {
    platform = $.cookie("platform")
  } else {
    platform = '';
  }

  $.ajax({
    url: '/index.php/Book/concern',
    data: {
      book_id: bookId,
      chapter_id: chapterId,
      platform: platform,
      concernId: $.cookie("concernId") ? $.cookie("concernId") : '',
    },
    type: 'POST',
    dataType: 'json',
    success: function (res) {
      if (res.concern == 2) {
        $('.forceAlert-code').attr('src', res.cover)
        isToNext = false;
      }
    }
  })

  $.ajax({
    url: '/index.php/Book/checkForce',
    data: {
      concernId: $.cookie("concernId")
    },
    type: 'POST',
    dataType: 'json',
    success: function (res) {
    }
  })

  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

}

// 根据cookie判断微信二维码的弹出
function alertWxCode() {
  // 微信二维码弹窗
  $(".qrcode-btn").on("click", function () {
    $(".qrcode-alert").show();
  })
  $(".read-code-close").on("click", function () {
    $(".qrcode-alert").hide();
  })
  $(".qrcode-followed").on('click', function () {
    $(".qrcode-auto-alert").hide();
    $.cookie('isFocused', true, {expires: 365, path: '/'});
  })
  $(".qrcode-no-alert").on('click', function () {
    $(".qrcode-auto-alert").hide();
    $.cookie('alertFrequency', 10, {expires: 365, path: '/'});
    $.cookie("nowNum", 1);
  })

  var isFocused = $.cookie("isFocused") || false,
          alertFrequency = $.cookie("alertFrequency") || 5;
  var nowNum = $.cookie("nowNum") || 1;

  if ($.cookie("bookNum") != bookId) {
    nowNum = 1;
    $.cookie("nowNum", 1);
  }

  $(".read-title-bot").hide();
  var type = $('.read-menu').attr('type');
  $.ajax({
    url: '/index.php/Index/Cover',
    type: 'GET',
    data: 'type=' + type,
    dataType: 'json',
    success: function (json) {
      if (json.read_show == 1) {
        $(".qrcode-auto-alert").hide();
      } else {
        if (!isFocused && nowNum % alertFrequency == 0 && nowNum != 0) {
          $(".qrcode-auto-alert").show();
        }
      }
    }
  });

  if ($.cookie("chapterNum") != chapterId) {
    $.cookie("nowNum", parseInt(nowNum) + 1)
  }

  $.cookie("bookNum", bookId, {expires: 365, path: '/'});
  $.cookie("chapterNum", chapterId, {expires: 365, path: '/'});

}

// 获取赞赏，投票数，评论
function getStateOfInfo() {
  $.ajax({
    url: '/index.php/Book/chapterShangInfo',
    type: 'POST',
    dataType: 'json',
    data: {
      bid: bookId,
      cid: chapterId
    },
    error: function (json) {
      console.log('获取赞赏、投票、评论数失败')
    },
    success: function (json) {
      if (json.result.ticketNum > 10000) {
        json.result.ticketNum = '10000+'
      }
      if (json.result.commentNum > 1000) {
        json.result.commentNum = '1000+'
      }
      $(".praise-vote span").html(json.result.ticketNum);
      $(".praise-comment span").html(json.result.commentNum);
    }
  });
}

// 获取是否在书架上
function getStateOfShelf() {
  $.ajax({
    url: '/index.php/Book/isShelf ',
    type: 'POST',
    dataType: 'json',
    data: { bid: bookId },
    error: function (json) {
      console.log('获取是否在书架上失败')
    },
    success: function (json) {
      if (json.result == 0) {
        $(".add-shelf").show();
        $(".to-shelf").hide();
      } else if (json.result == 1) {
        $(".add-shelf").hide();
        $(".to-shelf").show();
      }
    }
  });
}

// 获取VIP等级
function getVipInfo() {
  $.ajax({
    url: '/index.php/Book/getVipLevel',
    type: 'POST',
    dataType: 'json',
    data: {},
    error: function (json) {
      console.log('获取vip等级失败')
    },
    success: function (json) {
      console.log(json)
      $(".vipImg").attr("src", json.result)
    }
  });
}

// 加入书架
function shelfAjax() {
  $.ajax({
    url: '/index.php/Book/Shelf',
    type: 'POST',
    dataType: 'json',
    data: 'bid=' + bookId,
    error: function (json) {
      layer.open({
        content: '系统错误',
        skin: 'msg',
        time: 2 //2秒后自动关闭
      });
    },
    success: function (json) {
      if (json.result == 'success') {
        layer.open({
          content: '<i class="on-shelf"></i>已加入书架<p>'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        $(".layui-m-layerchild").css("bottom", "50%");
        $(".to-shelf").show();
        $('.add-shelf').hide();
      } else if (json.result == 'timeLimit') {
        layer.open({
          content: '操作频繁，休息60秒吧~'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
      } else if (json.result == 'login') {
        layer.open({
          content: '未登录！'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
        window.location = '/index.php/Index/Login';
      } else if (json.result == 'delSuccess') {
        layer.open({
          content: '已移出书架'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
      } else {
        layer.open({
          content: '加入失败'
          , skin: 'msg'
          , time: 2 //2秒后自动关闭
        });
      }
    }
  });
}

// 是否在微信环境下
function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") >= 1 ? true : false
}