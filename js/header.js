/**
 * Created by Administrator on 2017/5/24.
 */
// 头部导航模块
$(function () {
    // 导航项点击
    $('#header_wrap .header .nav_wrap').on('click', '.nav_item h3', function () {
        $('#header_wrap .header .nav_wrap .nav_item h3').removeClass('now');
        $(this).addClass('now');
    })
        .find('.nav_item.has_childNav')
        .hover(function () {
            /* Stuff to do when the mouse enters the element */
            $(this).find('.childNavs').stop().slideDown(600, 'elasticOut');
        }, function () {
            /* Stuff to do when the mouse leaves the element */
            $(this).find('.childNavs').stop().slideUp(100);
        });
});