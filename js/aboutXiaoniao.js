/**
 * Created by Administrator on 2017/5/25.
 */
$(function () {
    //导航的浮动效果
    $('.nav_wrap .nav_item').hover(function () {
        if(!$(this).hasClass('now')) {
            $(this).find('h1')
                .addClass('hover');
        }
    }, function () {
        if(!$(this).hasClass('now')) {
            $(this).find('h1')
                .removeClass('hover');
        }
    });

    //设置相关页面大小为可视窗口大小
    var autoSize = function () {
        var w = $(document.documentElement).width() + 'px',
            h = $(document.documentElement).height() + 'px',
            h2 = $(document.documentElement).height() * 5 +'px';
        $('.banner_wrap').css({'height': h2, 'width': w});
        $('.content_wrap').css({'height': h, 'width': w});
        $('.banner_wrap .banner_item').css({'height': h, 'width': w});
        $('.gaishu .bannerContent').css({'width': w});
        $('.welcome_animation').css({'height': h, 'width': w});
    };

    //第一次加载
    autoSize();

    //自适应节流
    var throttleAutoSize = throttle(autoSize, 20);

    //窗口自适应
    $(window).resize(throttleAutoSize);

    //向下翻页
    var i = 0;
    var setNow = function (arr) {
        $('.nav_wrap .nav_item').removeClass('now');
        if (arr instanceof Array) {
            arr.forEach(function (item, index, arr) {
                var str = ".nav_wrap .item" + item;
                $(str).addClass('now');
            });
        } else {
            var str = ".nav_wrap .item" + arr;
            $(str).addClass('now');
        }
    };
    var setShow = function (i) {
        switch (i) {
            case 0:
            case 1: {
                setNow(0);
            }
            break;
            case 2: {
                setNow(1);
            }
            break;
            case 3: {
                setNow(2);
            }
            break;
            case 4: {
                setNow([3,4]);
            }
            break;
        }
    };
    var goPage = function (j) {
        var top = (-$('.content_wrap').height()) * j;
        $('.banner_wrap').animate({'top' : top});
    };
    //向下翻页
    var nextPage = function () {
        i ++;
        if (i > 4) {
            i = 4;
            return;
        }
        setShow(i);
        goPage(i);
    };

    //向上翻页
    var lastPage = function () {
        i --;
        if (i < 0 ) {
            i = 0;
            return;
        }
        setShow(i);
        goPage(i);
    }

    //向上翻页节流
    var throttleLastPage = throttle(lastPage, 200);

    //向下翻页节流
    var throttleNextPage = throttle(nextPage, 200);

    // 鼠标滚动事件处理器
    var mouseWheel = function(e) {
        if (e.detail) {
            if (e.detail < 0) {
                throttleLastPage();
            } else {
                throttleNextPage();
            }
        }
        if (e.wheelDelta > 0) {
            throttleLastPage();
        } else {
            throttleNextPage();
        }
    };

    // 监听鼠标滚轮滚动
    document.onmousewheel = mouseWheel;
    document.addEventListener('DOMMouseScroll', mouseWheel, false);

    //第一页点击加载下一页
    $('.welcome2_warp .nextBtn').click(nextPage);

    //概述页切换
    (function () {
        var j = 0,
            len = $('.gaishu .gaishu_item').length;

        //显示按钮透明度
        var showBtn = function () {
            if (j <= 0) {
                $('.gaishu .lastBtn').css('opacity', '0.3');
                $('.gaishu .nextBtn').css('opacity', '1');
            } else if (j >= len - 1) {
                $('.gaishu .nextBtn').css('opacity', '0.3');
                $('.gaishu .lastBtn').css('opacity', '1');
            } else {
                $('.gaishu .nextBtn').css('opacity', '1');
                $('.gaishu .lastBtn').css('opacity', '1');
            }
        }
        showBtn();

        //上一页
        $('.gaishu .lastBtn').click(function () {
            j--;
            showBtn();
            if (j < 0 ) {
                j = 0;
                return;
            }
            var left = -j * $('.gaishu .bannerContent').width();
            $('.gaishu .gaishu_slider').animate({'left': left});
        });

        //下一页
        $('.gaishu .nextBtn').click(function () {
            j++;
            showBtn();
            if (j > len - 1) {
                j = len - 1;
                return;
            }
            var left = -j * $(document.documentElement).width();
            $('.gaishu .gaishu_slider').animate({'left': left});
        });
    })();

    //小鸟掌云页面切换
    (function () {
        var i = 0,
            len = $('.zhangyun .zhangyun_slider > div').length;

        //左点击
        $('.zhangyun .move_left').click(function () {
            if (i <= 0) {
                return;
            }
            i --;
            $('.zhangyun .move_right span')
                .css('backgroundPositionX', '0')
                .animate({'backgroundPositionX': -78}, function () {
                    $('.zhangyun .move_left span')
                        .css('backgroundPositionX', '78')
                        .animate({'backgroundPositionX': 0});
                });
            var left = - i * $('.zhangyun .zhangyun_slider > div').width();
            $('.zhangyun .zhangyun_slider').animate({'left': left},1000);
        });

        //右点击
        $('.zhangyun .move_right').click(function () {
            if (i >= len - 1) {
                return;
            }
            i ++;
            $('.zhangyun .move_left span')
                .css('backgroundPositionX', '0')
                .animate({'backgroundPositionX': 78}, function () {
                    $('.zhangyun .move_right span')
                        .css('backgroundPositionX', '-78px')
                        .animate({'backgroundPositionX': 0});
                });
            var left = - i * $('.zhangyun .zhangyun_slider > div').width();
            $('.zhangyun .zhangyun_slider').animate({'left': left});
        });

    })();


    //回到主页
    $('.header .goIndex').click(function () {
        window.location.href = 'index.html';
    });

    //重载页面
    $('.header .log').click(function () {
        window.location.reload();
    });

    //导航到相应位置
    var arrgo = {
        'gaishuNav': 1,
        'jiazhiNav': 2,
        'zhangyunNav': 3,
        'appDloadNav': 4,
        'contactServiceNav': 4
    };
    $('.nav_wrap').on('click', '.nav_item', function () {
        if ($(this).hasClass('now')) {
            return;
        }
        $(this).trigger('mouseleave');
        var arrgoItem = $(this).attr('nav');
        if (typeof arrgo[arrgoItem] == 'number') {
            i = arrgo[arrgoItem];
            setShow(i);
            goPage(i);
        }
    });

    //欢迎动画
    var welcomeAnim = function () {
        $('.welcome_animation').show();
        var time = 800;
        $('.welcome_animation .welcome_warp .wlecome_ion')
            .animate({'top': -150}, time);
        $('.welcome_animation .animItems .animItem').each(function (index, item) {
            time += 200;
            $(this).animate({'opacity': 1, 'top': -150}, time);
        });
        setTimeout(function () {
            $('.welcome_animation').hide();
        }, 2000);
    }

    var timer = setTimeout(welcomeAnim, 3000);

    //从其他页面根据位置跳转
    var goWhere = function () {
        var weizhi = getUrlParams('weizhi'),
            selectorstr = '.header .nav_wrap .' + weizhi,
            navNode = $(selectorstr).removeClass('now');
        if (navNode) {
            $('.welcome_animation').hide();
            clearTimeout(timer);
            navNode.click();
        }
    }
    goWhere();
});

//获取页面url传过来的参数
function getUrlParams(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  r[2];
    else
        return "";
}