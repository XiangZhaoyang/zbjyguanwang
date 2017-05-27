/**
 * Created by Administrator on 2017/5/24.
 */

var GLOBAL = GLOBAL || {};

//加载模板
$(function () {
    $('#header').load('header.html');
    $('#footer').load('footer.html');
});

//内容
$(function () {
    //笔的点击效果
    $('.pen').click(function () {
        $(this).parent('.list_title')
            .css({'width': '100px', 'backgroundPositionX': '-1000px'})
            .stop()
            .animate({'width': '100%', 'backgroundPositionX': 0}, 1000, 'easeOutStrong');
    });

    //页面加载加载内容
    contentLoad();

    //点击加载下一页
    $('.list_more').click(
        contentLoad
    );

    //点击列表内容跳转
    $('#articleList').on('click', '.list_item', function () {
        var urlStr = 'article.html?type=' +  (getUrlParams('type') ? getUrlParams('type'): 'xiaoniaoNews')
                + '&articleId=' + $(this).attr('articleid');
        window.open(urlStr);
    });
});

//内容加载
function contentLoad() {
    if (!listData) {
        $('#articleList').html('请求失败稍后再试');
        return;
    }

    if (!GLOBAL.pageStart) {
        GLOBAL.pageStart = 0;
    }

    var itemHtml = '';
    var result = listData['listData0' + (GLOBAL.pageStart)];
    var list = result.data.list;
    var updateTime = '';
    if (!list || !list.length) {
        $('#articleList').html('暂时没有内容敬请期待！');
    }
    list.forEach(function (item, index, arr) {
        updateTime = item['updateAt'] || item['creatAt'] || '';
        itemHtml = $('#articleModel').html()
            .replace('$articleId$', item['sysId'])
            .replace('$articleImg$', item['coverImg'])
            .replace('$articleTitle$', item['title'])
            .replace('$updateTime$', updateTime)
            .replace('$describe$', item['describe']);
        $('#articleList').append(itemHtml);
    });

    GLOBAL.pageStart = result.data.pageStart + 1;
    GLOBAL.pageCount = Math.ceil(result.data.count / result.data.pageSize);

    if(GLOBAL.pageStart >= GLOBAL.pageCount){
        $(".list_more").css("opacity","0").prev("img").attr("src","images/list_gomore_bg_nomore.jpg");
    }
}

//获取页面url传过来的参数
function getUrlParams(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  r[2];
    else
        return "";
}