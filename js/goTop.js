//返回顶部
$(function () {
    var scrollHand = function () {
        if ($(document).scrollTop() >　500) {
            $('#scrollTop_wrap').addClass('show');
        } else {
            $('#scrollTop_wrap').removeClass('show');
        }
    };
    $(window).scroll(scrollHand);
    $('#scrollTop').click(function () {
        $(window).off('scroll');
        var timer = null;
        var i = j = $(document).scrollTop();
        var top = t = parseInt($('#scrollTop_wrap').css('top'));
        var op = o = $('#scrollTop_wrap').css('opacity');
        var change = function () {
            i -= j / 10;
            top -= t / 10;
            op -= o / 10;
            $(document).scrollTop(i);
            $('#scrollTop_wrap').css({'top': (top + 'px'), 'opacity': op});
            if (i <= 0) {
                $('#scrollTop_wrap').css({'top': (t + 'px'), 'opacity': o});
                $(window).scroll(scrollHand);
                return;
            }
            timer = setTimeout(change, 20);
        };
        change();
    });
});