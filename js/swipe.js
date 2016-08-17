/**
 * Created by xiaochuan on 2016/8/10.
 */
    function  swipeDiv(container) {
        /*获取第一个子节点*/
        var element=container.find(":first");
       /* 设定滑动对象*/
        var swipe={};
        /* li页面数量*/
        var slides=element.find("li");
        /*获取容器尺寸*/
        var width=container.width();
        var height=container.height();
        /* 设置li页面总宽度*/
        element.css({
            width:(slides.length*width)+'px',
            height:height+'px'
        });
        /*设置每一个页面li的宽度*/
        $.each(slides,function(index){
            var slide=slides.eq(index);//获取到每一个元素
            slide.css({
                width:width+'px',
                height:height+'px'
            });
        });
        //给按钮绑定一个切换页面的时间
        swipe.scrollTo=function(x,speed) {
            element.css({
                'transition-timing-function':'linear',
                'transition-duration':speed+"ms",//ms一定不能忘了写
                'transform':'translate3d(-'+x+'px,0px,0px)'
            });
            return this;//？？
        };
    return swipe;
    }
