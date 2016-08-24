
var container=$("#content");
/*页面可视区域的高度和宽度*/
var visualWidth=container.width();
var visualHeight=container.height();
var swipe=swipeDiv(container);
/*页面滚动到指定的位置*/
function scroll(time,proportionX) {
    var distX=visualWidth*proportionX;
    swipe.scrollTo(distX,time);
}

swipe.scrollTo(visualWidth*2,0);
// alert(visualWidth+"-----"+visualHeight);
/*定义一个方法获取元素height和top值*/
var getValue=function (className) {
    var $elem=$(''+className+'');
    return{
        height:$elem.height(),
        top:$elem.position().top
    };
};
//桥的Y轴
var bridgeY=function () {
    var data=getValue('.c_background_middle');
    return data.top;
}();


/*门开门关*/
function doorAction(left,right,time) {
    var door=$('.door');
    var doorLeft=$('.door_left');
    var doorRight=$('.door_right');
    var defer=$.Deferred();
    /*等待开门*/
    var count=2;
    var complete=function () {
        if(count==1){
            defer.resolve();
            return;
        }
        count--;
    };
    doorLeft.transition({
        'left':left
    },time,complete());
    doorRight.transition({
        'left':right
    },time,complete());
    return defer;
}
/*开门*/
function openDoor() {
    return doorAction('-50%','100%',2000);
}
/*关门*/
function closeDoor() {
    return doorAction('0%','50%',2000);
}
/*小孩走路*/
var instanceX;//男孩进出商店需要移动的距离
function BoyWalk() {


    /*var data=getValue('.a_background_middle');
    var pathY=data.top + data.height/2;*/
    var pathY=function () {
        var data=getValue('.a_background_middle');
        return data.top+data.height/2
    }();
    var  $boy=$('#boy');
    var boyHeight=$boy.height();
    $boy.css({
        top:pathY-boyHeight+25
    });
    //暂停走路
    function pauseWalk() {
        $boy.addClass("pauseWalk");
    }
    //回复走路
    function  restoreWalk() {
        $boy.removeClass("pauseWalk");
    }
    /*CSS3的动作变化*/
    function slowWalk() {
        $boy.addClass("slowWalk");
    }
    /*计算移动距离*/
    function  calculateDistance(direction,proportion) {
        return (direction=="x"?visualWidth:visualHeight)*proportion;
    }
    /*用transition做运动*/
    function stratRun(options,runTime) {
        var dfdPlay=$.Deferred();
        //回复走路
        restoreWalk();
        $boy.transition(options,runTime,'linear',function () {
            dfdPlay.resolve();
        });
        return dfdPlay;

    }
    /*开始走路*/
    function walkRun(time,disX,disY) {
        time=time||3000;
        //脚的动作
        slowWalk();
        //开始走路
        var d1=stratRun({
            'left':disX+'px',
            'top':disY?disY:undefined
        },time);
       // console.log(d1);
        return d1;
    }
    /*走进商店*/
    function walkToShop(runTime) {
        var defer=$.Deferred();
        var doorObj=$('.door');
        /*门的坐标*/
        var offsetDoor=doorObj.offset();
        var doorOffsetLeft=offsetDoor.left;
      /*  男孩当前的坐标*/
        var offsetBoy=$boy.offset();
        var boyOffsetLeft=offsetBoy.left;
        /*当前需要移动的坐标*/
        instanceX=(doorOffsetLeft+doorObj.width()/2)-(boyOffsetLeft+$boy.width()/2);
        //开始走路
        var walkPlay=stratRun({
            transform:'translateX('+instanceX+'px),scale(0.3,0.3)',
            opacity:0.1
        },2000);
        //走路完毕
        walkPlay.done(function () {
            $boy.css({
                opacity:0
            })
            defer.resolve();
        })
        return defer;
    }
    //走出商店
    function  walkOutShop(runTime) {
        var defer=$.Deferred();
        restoreWalk();
        //开始走路
        var walkPlay=stratRun({
            transform:'translateX('+instanceX+'px),scale(1,1)',
            opacity:1
        },runTime);
        //走路完毕
        walkPlay.done(function () {
            defer.resolve();
        });
        return defer;

    }
    //取花
    function takeFlower() {
        var defer =$.Deferred();
        setTimeout(function () {
            //取花
            $boy.addClass('slowFlowerWalk');
            defer.resolve();
        },1000);
        return defer;
    }
    return {
        //开始走路
        walkTo:function (time,proportionX,proportionY) {
            var distX=calculateDistance('x',proportionX)
            var distY=calculateDistance('y',proportionY)
            return walkRun(time,distX,distY);
        },
        //停止走路
        stopWalk:function () {
            pauseWalk();
        },
        setColor:function (value) {
            $boy.css('background-color',value);
        },
        toShop:function () {
            return walkToShop.apply(null,arguments);
        },
        outShop:function () {
            return walkOutShop.apply(null,arguments);
        },
        takeFlower:function () {
            return takeFlower();
        },
        setFlowerWalk:function () {
            $boy.addClass('slowFlowerWalk');
        }
        


    }
}

/*灯亮灯暗*/
