###20160810
浪漫七夕
html5+js+css3
css3新特性应用：转换   渐变  动画 音频
1.页面的横向布局
包含三个主题页面 页面直接无缝连接float  页面滚动
2.页面之间的滚动切换效果
布局结构：（1）移动父容器，改变父容器的坐标（只需改变父容器X轴的坐标即可，较简单）
		  （2）移动每一个子容器的坐标
改变坐标的处理2种：（1）传统的top，left坐标修改


###20160812
页面切换部分的代码封装
封装，即隐藏对象的属性和实现细节，仅对外公开接口.
页面布局与切换是一个整体，我们想调用切换的时候，并不关心其内部处理的手段，所以我们只需要提供一个可以调用的接口就可以，新建一个Swipe.js文件，内部定义一个Swipe工厂方法，内部会产生一个swipe的滑动对象，暴露了scrollTo的接口



###20160813
精灵动画的实现
1.原理：靠不断的切换图片让人感觉视觉上不断在变化
2.图片如果很多，加载会比较慢，会占用大量网络资源，大多数的做法就是把图片都合成一张大图再利用CSS的以下属性
	background-image
	background-repeat
	background-position
3.
目前浏览器都不支持 @keyframes 规则。
Firefox 支持替代的 @-moz-keyframes 规则。
Opera 支持替代的 @-o-keyframes 规则。
Safari 和 Chrome 支持替代的 @-webkit-keyframes 规则。


###20160814
1.男孩走路实现
采用了CSS3的transition来修改left的值，引入了一个插件jquery.transit
点击按钮
 $boy.transition({
    'left': $("#content").width() + 'px',
}, 10000,'linear');

2.男孩走路暂停
CSS3的animation直接提供一个animation-play-state的样式来控制动画的暂停处理。
.pauseWalk {
   -webkit-animation-play-state: paused;
   -moz-animation-play-state: paused;
}

$("button:last").click(function () {
        var left=$boy.css('left');
        $boy.css('left',left);
        $boy.addClass("pauseWalk")
    });
注：暂停方法内transition强制做了一个设置left坐标的处理，达到一个暂停的效果，但是这样是有问题的，下一次的启动必须等上一次动画的时间结束

###20160816
男孩路径动画处理
小男孩不仅沿直线走 速度也会变化  进出商店 上桥等
注：小男孩走路范围其实只有一个页面区域，因为父容器是content元素
小男孩不管是往X还是Y轴变化，按照百分比的比例去换算实际的距离
走到1/2的位置 ，具体的坐标值的计算就是 ： 实际X轴位置 = 0.5 * 页面宽度 ，同样Y轴的计算也是如此
var distX = calculateDist('x', 0.5)
var distY = calculateDist('y', 0.5)
walkRun(10000, distX, distY)


###20160817
1.JavaScript的执行流程是分为"同步"与"异步"
 针对这样的异步嵌套的回调逻辑，jQuery 也引入了 Promise 的概念
 	var dtd = $.Deferred();  //创建
	dtd.resolve();          //成功
	dtd.then()              //执行回调

 	dtd.then(function() {
 	  //操作1
	}).then(function() {
  	 //操作2
	}).then(function() {
  	//操作3
	})


2.问题：
(1).	 /*var data=getValue('.a_background_middle');
    var pathY=data.top + data.height/2;*/

    var pathY=function () {
        var data=getValue('.a_background_middle');
        return data.top+data.height/2
    }();
(2).忘记写return 报错 Uncaught TypeError: Cannot read property 'then' of undefined(anonymous function)
 //开始走路
        walkTo:function (time,proportionX,proportionY) {
            var distX=calculateDistance('x',proportionX)
            var distY=calculateDistance('y',proportionY)
            return walkRun(time,distX,distY);
        },
(3).忘记写return  某些效果会被覆盖

$("button").click(function () {
            //开始第一次走路

            boy.walkTo(2000,0.2).then(function () {
    （1）            boy.setColor('red')
            }).then(function () {
    （2）          return boy.walkTo(2000,0.4)    第一个
            }).then(function () {
    （3）          boy.setColor('yellow')
            }).then(function () {
    （4）         return boy.walkTo(2000,0.6)     第二个
            }).then(function () {
    （5）          boy.setColor('blue')
            })
        });


4.小孩走路 同时页面背景移动 页面与人物之间形成的视觉差效果

  	（1）小男孩的走路区间只是一个页面单位，相对点是父级的div
        页面滚动只有二个页面单位，因为本身会占据一个
     （2）小男孩如果走到中间位置，那么比例是0.5 换算下就是  0.5*页面宽度
          页面要到中间位置就是，比例是1，换算就是 1*页面宽度


			boy.walkTo(2000, 0.2)
                .then(function() {
                    // 第一次走路完成
                    // 开始页面滚动
                    scrollTo(5000, 1);//
                }).then(function() {
                    // 第二次走路
                    return boy.walkTo(5000, 0.5);
                });
