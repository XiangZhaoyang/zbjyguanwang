/**
 * Created by Administrator on 2017/5/25.
 */

var GLOBA = GLOBA || {};

$(function () {
    //加载头部
    $('#header').load('header.html');
    //加载尾部
    $('#footer').load('footer.html');

    //笔的点击效果
    $('.pen').click(function () {
        $(this).parent('.title_list')
            .css({'width': '100px', 'backgroundPositionX': '-1000px'})
            .stop()
            .animate({'width': '100%', 'backgroundPositionX': 0}, 1000, 'easeOutStrong');
    });

    articleLoad();
});

// 文章内容加载
function articleLoad(){
    if(getUrlParams("type")){
        var result = articleData[getUrlParams("type")+getUrlParams("articleId")]; //此数据在articleData.js里
        $("#typeTitle").html(result.data.typeTitle);
        $("#typeSmallTitle").html(result.data.typeEntitle);
        $('#articleTitle').text(result.data.title);
        $('#updateTime').text(result.data.updateAt);
        $('.article_img img').attr("src",result.data.coverImg);
        $('#user').text(result.data.creatByFullName);
        $('#articleContent').html(result.data.content);
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
