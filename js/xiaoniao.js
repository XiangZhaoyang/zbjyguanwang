var load = function() {

	// 给元素设置可视宽高
	var setDocEelWidHgt = function(ele) {
		ele.style.height = document.documentElement.clientHeight + 'px';
		ele.style.width = document.documentElement.clientWidth + 'px'; 
	};

	setDocEelWidHgt(document.getElementsByClassName('container')[0]);
	// 监听浏览器大小的变化
	window.onresize = function () {
		setDocEelWidHgt(document.getElementsByClassName('container')[0]);
		setBannerItemCtner(document.getElementsByClassName('item_wrap')[0]);
		setBannerItem(document.getElementsByClassName('item_wrap')[0]);
	};

	// 给轮播元素设置宽高
	var bannerNode = document.getElementsByClassName('container')[0]
	var bannerItemCtner = bannerNode.getElementsByClassName('item_wrap')[0];
	var setBannerItemCtner = function(ele) {
		ele.style.height = ele.parentElement.clientHeight * 4 + 'px';
		ele.style.width = ele.parentElement.clientWidth + 'px';
	};
	var setBannerItem = function(ele) {
		var list = [];
		var nodes = [].slice.call(ele.childNodes);
		nodes.forEach(function(item) {
			if (item.nodeType == 1) {
				list.push(item);
			}
		});
		list.forEach(function(item, index) {
			item.style.top = index * ele.parentElement.clientHeight + 'px';
			item.style.height = ele.parentElement.clientHeight + 'px';
			item.style.width = ele.parentElement.clientWidth + 'px';
		});
	};

	setBannerItemCtner(bannerItemCtner);
	setBannerItem(bannerItemCtner);

	// 设置轮播效果
	// 下滑效果
	var count = 0;
	var down = function(ele) {
		count ++;
		if(count > 3) {
			count = 0;
		}
		ele.style.top = - ele.parentElement.clientHeight * count + 'px';
		console.log(ele.style.top);
	};


	// 向上滚动
	var up = function(ele) {
		count --;
		if(count < 0) {
			count = 3;
		}
		ele.style.top = - ele.parentElement.clientHeight * count + 'px';
		console.log(ele.style.top);
	};

	// 一段时间只执行一次函数
	var limitTimer = (function() {
		var start = true,
			startTime;
		return function limitTimer(func, time) {
			time || (time = 250);
			if(start || (Date.now() >= (startTime + time))) {
				func();
				startTime = Date.now();
				start = false;
			}
		};
	})();


	// 鼠标滚动事件处理器
	var mouseWheel = function(e) {
		if (e.detail) {
            if (e.detail < 0) {
                console.log("向上滚")
                up(bannerItemCtner);
            } else {
            	down(bannerItemCtner);
                console.log("向下滚")
            }
        }
        if (e.wheelDelta > 0) {
            console.log("向上滚")
            up(bannerItemCtner);
        } else {
            console.log("向下滚");
            down(bannerItemCtner);
        }
	};

	// 设置鼠标滚轮滚动的间隔时间函数
	var mouseWheelLimiteTime = function(e) {
		limitTimer(function() {
			mouseWheel(e);
		}, 400);
	};

	// 监听鼠标滚轮滚动
	document.onmousewheel = mouseWheelLimiteTime;
	document.addEventListener('DOMMouseScroll', mouseWheelLimiteTime, false);
};

window.addEventListener('load', load);