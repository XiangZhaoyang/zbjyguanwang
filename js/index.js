// index.js

//引入模板
$(function () {
    $('#header').load('header.html');
    $('#footer').load('footer.html');
});
// 内容模块
// 轮播
$(function () {
    //选择下一张
    var i = 1;
    $('#banner_wrap .banner_change .next').on('click', function () {
        i++;
        if (i > $('#banner_wrap .banner_item').length) {
            i = 1;
        }
        $('#banner_wrap .middle_items .middle_item').removeClass('middle_item_select');
        $('#banner_wrap .banner_item').removeClass('show').addClass('hide');
        var bnSelect = '#banner_wrap .banner_item.banner_' + i,
            miSelect = '#banner_wrap .middle_items .banner_' + i;
        $(bnSelect).removeClass('hide').addClass('show');
        $(miSelect).addClass('middle_item_select');
    });

    //选择上一张
    $('#banner_wrap .banner_change .prev').on('click', function (event) {
        i--;
        if (i < 1) {
            i = $('#banner_wrap .banner_item').length;
        }
        $('#banner_wrap .middle_items .middle_item').removeClass('middle_item_select');
        $('#banner_wrap .banner_item').removeClass('show').addClass('hide');
        var bnSelect = '#banner_wrap .banner_item.banner_' + i,
            miSelect = '#banner_wrap .middle_items .banner_' + i;
        $(bnSelect).removeClass('hide').addClass('show');
        $(miSelect).addClass('middle_item_select');
    });

    //点击选择
    $('#banner_wrap .middle_items').on('click', '.middle_item', function () {
        var bnSelect = '#banner_wrap .banner_item.' + $(this).attr('item');
        $('#banner_wrap .banner_item').removeClass('show').addClass('hide');
        $(bnSelect).removeClass('hide').addClass('show');
        $('#banner_wrap .middle_items .middle_item').removeClass('middle_item_select');
        $(this).addClass('middle_item_select');
    })
});

//业务范围
$(function () {
    //展开按钮动画
    $('.shousuo_icon, .center_img img').hover(function () {
        $(this).addClass('animated').addClass('tada');
    }, function () {
        $(this).removeClass('animated').removeClass('tada');
    });


    //展开
    $('.shousuo_icon').click(function () {
        $(this).toggleClass('zhankai');
        $(this).parents('.yewucontent_simple').next('.yewucontent_ditail').toggleClass('show');
    });
});

//主要产品轮播
$(function () {

    var i = $('.product .product_contents .content_item:visible')
        .index('.product .product_contents .content_item');
    $('.product .content_wrap .now_line .now_line_item')
        .removeClass('now').eq(i).addClass('now');

    //下一页
    $('.change_line .next').click(function () {
        i++;
        if (i >= $('.product .product_contents .content_item').length - 1) {
            i = 0;
        }
        $('.product .product_contents .content_item')
            .removeClass('now')
            .eq(i)
            .addClass('now')
            .css('left', '300px')
            .stop().animate({left: 0}, 600, 'easeOut');
        $('.product .content_item .content_rigth img').addClass('animated').addClass('fadeInRight');
        $('.product .content_wrap .now_line .now_line_item').removeClass('now').eq(i).addClass('now');
    });

    //上一页
    $('.change_line .prev').click(function () {
        i--;
        if (i < 0) {
            i = $('.product .product_contents .content_item').length - 1;
        }
        $('.product .product_contents .content_item')
            .removeClass('now')
            .eq(i)
            .addClass('now')
            .css('left', '-300px')
            .stop().animate({left: 0}, 600, 'easeOut');
        $('.product .content_item .content_rigth img').addClass('animated').addClass('fadeInLeft');
        $('.product .content_wrap .now_line .now_line_item').removeClass('now').eq(i).addClass('now');
    });

    //点击选择
    $('.now_line').on('click', '.now_line_item', function () {
        var k = $('.now_line .now_line_item.now').index('.now_line .now_line_item');
        $(this).siblings().removeClass('now');
        var j = $(this).addClass('now').index('.now_line .now_line_item');
        if (k > j) {
           i = j;
            $('.product .product_contents .content_item')
                .removeClass('now')
                .eq(i)
                .addClass('now')
                .css('left', '-300px')
                .stop().animate({left: 0}, 600, 'easeOut');
            $('.product .content_item .content_rigth img').addClass('animated').addClass('fadeInLeft');
        } else if (k < j) {
            i = j;
            $('.product .product_contents .content_item')
                .removeClass('now')
                .eq(j)
                .addClass('now')
                .css('left', '300px')
                .stop().animate({left: 0}, 600, 'easeOut');
            $('.product .content_item .content_rigth img').addClass('animated').addClass('fadeInRight');
        }
    });
});

//团队成员介绍轮播
$(function () {
    //鼠标移入头像效果
    $('.team_box .heading').hover(function () {
        $(this).find('a').stop().fadeIn(400);
    }, function () {
        $(this).find('a').stop().fadeOut(400);
    });

    //轮播
    //选择下一张
    var i = 1;
    var timer = null;
    var timer2 =null;
    var node$ = $('.team_move');
    $('.team .team_change .next').click(function () {
        var j = 0;
        var str = '';
        var right = true;
        i++;
        if (i > $('.twoteam_wrap').length) {
            i = 1;
        }
        var miSelect = '.team_change .middle_items .item' + i;
        clearTimeout(timer);
        $('.team_change .middle_items .middle_item').removeClass('middle_item_select');
        $(miSelect).addClass('middle_item_select');
        var change = function () {
            str = j +'px';
            if (right) {
                j += 8;
            } else {
                j -= 50;
            }
            if (j >= 200) {
                right = false;
            }
            node$.css('left', str);
            if (j <= -1100) {
                node$.css('left', '0');
                $('.team_move .twoteam_wrap:first').appendTo($('.team_move'));
                return;
            }
            timer = setTimeout(change, 20);
        }
        change();
    });

    //选择上一张
    $('.team .team_change .prev').click(function () {
        var j = -1100;
        var str = '';
        var right = true;
        i--;
        if (i <= 0) {
            i = 3;
        }
        var miSelect = '.team_change .middle_items .item' + i;
        $('.team_change .middle_items .middle_item').removeClass('middle_item_select');
        $(miSelect).addClass('middle_item_select');
        $('.team_move .twoteam_wrap:last').prependTo($('.team_move'));
        clearTimeout(timer);
        var change = function () {
            str = j +'px';
            node$.css('left', str);
            if (right) {
                j += 70;
            } else {
                j -= 8;
                if (j <= 0) {
                    node$.css('left', '0');
                    return;
                }
            }
            if (j >= 300) {
                right = false;
            }
            timer = setTimeout(change, 20);
        }
        change();
    });

    //自动选择
    timer2 = setInterval(function () {
        $('.team .team_change .next').trigger('click');
    }, 5500);

    //修复自动选择的干扰行为
    $('.team .team_change .prev,.team .team_change .next').hover(function () {
        clearInterval(timer2);
    }, function () {
        timer2 = setInterval(function () {
            $('.team .team_change .next').trigger('click');
        }, 5500);
    });

//  联系我们输入框得到焦点的效果
    $('.input_wrap .input_box input,.input_wrap .input_box textarea').focus(function () {
        $(this).parents('.input_box').addClass('focus');
    }).blur(function () {
        $(this).parents('.input_box').removeClass('focus');
    });
});