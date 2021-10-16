
 
 //js出始化lazyload并设置图片显示方式
 $(function() {$("div.lazy,img.lazy").lazyload({effect: "fadeIn", effectspeed : 1000,failure_limit : 20, threshold: 50});});
 //pjax开启后的pjax回调
$(document).on('pjax:complete', function() {
        $("div.lazy,img.lazy").lazyload({
        effect: "fadeIn",
        effectspeed : 1000,
        failure_limit : 20,
        threshold: 200
    });
});
/*  */
$('#exampleModalChange').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
})

    //js 遮罩出现时给遮住对象加模糊效果
$('#Search').click(function(){
    e = window.event || e;
    var obj = e.srcElement || e.target;
    console.log(obj);
    if($(obj).is('#Search')){
        $('.container').removeClass('modal-blur');
    }
});
$('#Search button.close').click(function(){
    $('.container').removeClass('modal-blur');
});
$('.Search').click(function(){
    $('.container').addClass('modal-blur');
});

/* 返回顶部 */
$(function(){
$("#backToTop").on("click", function () {
    var _this = $(this);
    $('html,body').animate({ scrollTop: 0 }, 500, function () {
        _this.hide();
    });
});

$(window).scroll(function () {
    var htmlTop = $(document).scrollTop();//获取窗口的滚动条的垂直位置
    if( htmlTop >0 ){  //判断滚动后高度超过200px,就显示
        $("#backToTop").fadeIn(400); //淡入
    }else{
        $("#backToTop").stop().fadeOut(400); //如果返回或者没有超过,就淡出.必须加上stop()停止之前动画,否则会出现闪动
    }
});
});



//点赞
$('.post-suport').on('click', function () {
    let cid = $(this).data('cid');
    $.ajax({
      url: `/?action=support`,
      type: 'POST',
      data: {
        cid: cid
      },
      dataType: 'json',
      success: res => {
        if (res.success) {
          $(this).removeClass('mdi-thumb-up-outline').addClass('mdi-thumb-up')
          $(this).text(' ' + res.count + ' ' + '赞')
          $.notify({
                // options
                message: '感谢支持！' 
                },{
                // settings
                element: 'body',
                position: "fixed",
                type: "success",
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 1000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:10rem;background:rgb(71 183 76);color: white;box-shadow:rgb(71 183 76 / 50%) 0px 0px 30px 0px;">' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                '</div>' 
            });
        } else {
            $.notify({
                // options
                message: '你已经点过赞了哦~' 
                },{
                // settings
                element: 'body',
                position: "fixed",
                type: "info",
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 1000,
                timer: 1000,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                '</div>' 
            });
        }
      }
    });
  });



/*  */
//点击加载更多
jQuery(document).ready(function($) {
    if($(".page-next .next").length > 0) {}else{$(".page-next").attr("style","display:none");}
    //点击下一页的链接(即那个a标签)
    $('.next').click(function() {
        $this = $(this);
        $this.addClass('loading').text('正在努力加载'); //给a标签加载一个loading的class属性，用来添加加载效果
        var href = $this.attr('href'); //获取下一页的链接地址
        if (href != undefined) { //如果地址存在
            $.ajax({ //发起ajax请求
                url: href,
                //请求的地址就是下一页的链接
                type: 'get',
                //请求类型是get
                complete:function(){

                    $("div.lazy,img.lazy").lazyload({
                        effect: "fadeIn",
                        effectspeed : 1000,
                        threshold: 200
                    });

                    //点赞
                    $('.post-suport').on('click', function () {
                        let cid = $(this).data('cid');
                        $.ajax({
                        url: `/?action=support`,
                        type: 'POST',
                        data: {
                            cid: cid
                        },
                        dataType: 'json',
                        success: res => {
                            if (res.success) {
                            $(this).removeClass('mdi mdi-thumb-up-outline').addClass('mdi mdi-thumb-up')
                            $(this).text(' ' + res.count + ' ' + '赞')
                            $.notify({
                                    // options
                                    message: '感谢支持！' 
                                    },{
                                    // settings
                                    element: 'body',
                                    position: "fixed",
                                    type: "success",
                                    placement: {
                                        from: "top",
                                        align: "right"
                                    },
                                    offset: 20,
                                    spacing: 10,
                                    z_index: 1031,
                                    delay: 1000,
                                    timer: 1000,
                                    animate: {
                                        enter: 'animated fadeInDown',
                                        exit: 'animated fadeOutUp'
                                    },
                                    template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:10rem;background:rgb(71 183 76);color: white;box-shadow:rgb(71 183 76 / 50%) 0px 0px 30px 0px;">' +
                                        '<span data-notify="title">{1}</span> ' +
                                        '<span data-notify="message">{2}</span>' +
                                    '</div>' 
                                });
                            } else {
                                $.notify({
                                    // options
                                    message: '你已经点过赞了哦~' 
                                    },{
                                    // settings
                                    element: 'body',
                                    position: "fixed",
                                    type: "info",
                                    placement: {
                                        from: "top",
                                        align: "right"
                                    },
                                    offset: 20,
                                    spacing: 10,
                                    z_index: 1031,
                                    delay: 1000,
                                    timer: 1000,
                                    animate: {
                                        enter: 'animated fadeInDown',
                                        exit: 'animated fadeOutUp'
                                    },
                                    template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:12rem;background:#ff9800;color: white;box-shadow:rgb(255 152 0 / 43%) 0px 0px 30px 0px;">' +
                                        '<span data-notify="title">{1}</span> ' +
                                        '<span data-notify="message">{2}</span>' +
                                    '</div>' 
                                });
                            }
                        }
                        });
                    });
                },
                error: function(request) {
                    //如果发生错误怎么处理
                },
                success: function(data) { //请求成功
                    $this.removeClass('loading').text('点击查看更多'); //移除loading属性
                    var $res = $(data).find('.article'); //从数据中挑出文章数据，请根据实际情况更改
                    $('.content').append($res.fadeIn(500)); //将数据加载加进posts-loop的标签中。
                    var newhref = $(data).find('.next').attr('href'); //找出新的下一页链接
                    if (newhref != undefined) {
                        $('.next').attr('href', newhref);
                    } else {
                        $('.page-next').remove(); //如果没有下一页了，隐藏
                    }
                        $("div.lazy").lazyload({
                        effect: "fadeIn",
                        threshold: 200
                    });
					$.notify({
						// options
						message: '加载成功！' 
					},{
						// settings
						element: 'body',
						position: "fixed  ",
						type: "success",
						placement: {
							from: "top",
							align: "right"
						},
						offset: 20,
						spacing: 10,
						z_index: 1031,
						delay: 1000,
						timer: 1000,
						animate: {
							enter: 'animated fadeInDown',
							exit: 'animated fadeOutUp'
						},
						template: '<div data-notify="container" class="col-xs-6 col-sm-6 alert alert-{0}" role="alert" style="right:0;width:10rem;background:rgb(71 183 76);color: white;box-shadow:rgb(71 183 76 / 50%) 0px 0px 30px 0px;">' +
							'<span data-notify="title">{1}</span> ' +
							'<span data-notify="message">{2}</span>' +
						'</div>' 
					});

                }
            });
        }
        return false;
    });
});
/*  */

/* 私密回复 */
let holder = $('.comment-respond textarea').attr('placeholder');
$('#secret-button').click(function () {
    let textareaDom = $('.comment-respond textarea');
    if ($(this).is(':checked')) {
        textareaDom.attr('placeholder', '开启悄悄话~')
        $(".comment-respond textarea").addClass("secret-textarea");
    } else {
        textareaDom.attr('placeholder', holder)
        $(".comment-respond textarea").removeClass("secret-textarea");
    }
})


/* 切换夜间模式 */
function switchNightMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "0";
    if (night == "0") {
      document.body.classList.add("dark-mode");
      document.cookie = "night=1;path=/";
      console.log("夜间模式开启")
    } else {
      document.body.classList.remove("dark-mode");
      document.cookie = "night=0;path=/";
      console.log("夜间模式关闭")
    }
  } (function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "") {
      if (new Date().getHours() > 21 || new Date().getHours() < 6) {
        document.body.classList.add("nice-dark-mode");
        document.cookie = "night=1;path=/";
        console.log("夜间模式开启")
      } else {
        document.body.classList.remove("nice-dark-mode");
        document.cookie = "night=0;path=/";
        console.log("夜间模式关闭")
      }
    } else {
      var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || "0";
      if (night == "0") {
        document.body.classList.remove("dark-mode")
      } else {
        if (night == "1") {
          document.body.classList.add("dark-mode")
        }
      }
    }
  })();



  

