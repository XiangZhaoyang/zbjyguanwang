/**
 * Created by Administrator on 2017/5/26.
 */
//防抖动函数
var debounce = function (func, delay, context) {
    var that = context || this,
        timer = null;
    return function () {
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(that, args);
        }, delay);
    };
}

//节流函数
var throttle = function (func, dalay, context) {
    var that = context || this,
        start = true,
        timer = null,
        oldT = +new Date();
    return function () {
        var args = arguments,
            newT = +new Date();
        clearTimeout(timer);
        if (start) {
            func.apply(that, args);
            start = false;
            oldT = +new Date();
        }
        if (newT - oldT >= dalay) {
            timer = setTimeout(function () {
                func.apply(that, args);
                oldT = +new Date();
            }, dalay);
        }
    };
}