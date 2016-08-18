/**
 * Created by xiaochuan on 2016/8/17.
 */
var instanceX;//男孩进出商店需要移动的距离
function BoyWalk() {
    var container=$("#content");
    /*页面可视区域的高度和宽度*/
    var visualWidth=container.width();
    var visualHeight=container.height();
 // alert(visualWidth+"-----"+visualHeight);
    /*定义一个方法获取元素height和top值*/
    var getValue=function (className) {
        var $elem=$(''+className+'');
        return{
            height:$elem.height(),
            top:$elem.position().top
        };
    };
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
        restoreWalk();
        $boy.transition(options,runTime,'linear',function () {
            dfdPlay.resolve();
        });
        return dfdPlay;

    }
    /*开始走路*/
    function walkRun(time,disX,disY) {
        time=time||3000;
        slowWalk();
        var d1=stratRun({
            'left':disX+'px',
            'top':disY?disY:undefined
        },time);
       // console.log(d1);
        return d1;
    }
    /*走进商店*/
    function walkToShop() {
        var defer=$.Deferred();
        var doorObj=$('.door');
        /*门的坐标*/
        var offsetDoor=doorObj.offset();
        var doorOffsetLeft=offsetDoor.left;
      /*  男孩当前的坐标*/
        var offsetBoy=$boy.offset();
        var boyOffsetLeft=offsetBoy.left;
        /*当前需要移动的坐标*/
        instanceX=(doorOffsetLeft+doorObj.width()/2)
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
            return walkToShop();
        },
        outShop:function () {
            return walkOutShop();
        }



    }
}
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
function openDoor() {
    return doorAction('-50%','100%',2000);
}
function closeDoor() {
    return doorAction('0%','50%',2000);
}
/*灯亮灯暗*/
var lamp={
    elem:$('.b_background'),
    bright:function () {
        this.elem.addClass('lamp_bright')
    },
    dark:function () {
        this.elem.removeClass('lamp_bright')
    }
};