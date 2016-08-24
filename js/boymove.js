
var container=$("#content");
/*页面可视区域的高度和宽度*/
var visualWidth=container.width();
var visualHeight=container.height();
var swipe=swipeDiv(container);
/*定义一个方法获取元素height和top值*/
var getValue=function (className) {
    var $elem=$(''+className+'');
    return{
        height:$elem.height(),
        top:$elem.position().top
    };
};
var data=getValue('.a_background_middle');
var pathY=data.top + data.height/2;
var  $boy=$('#boy');
var boyHeight=$boy.height();
$boy.css({
    top:pathY-boyHeight+25
});
/*function  startWalk() {
    $boy.addClass("slowWalk").transition(
        {'left':$('#content').width()+'px'},15000);
}
function pauseWalk() {
    var left=$boy.css('left');
    $boy.css('left',left);
    $boy.addClass("pauseWalk");
}*/
/*恢复走动*/
function  restoreWalk() {
    $boy.removeClass("pauseWalk");

}
/*CSS3的动作变化*/
function slowWalk() {
    $boy.addClass("slowWalk");
}
/*计算移动距离*/
function  caculateDistance(direction,proportion) {
   return (direction=="x"?visualWidth:visualHeight)*proportion;
}
/*用transition做运动*/
function stratRun(options,runTime) {
    var dfdPlay=$.Deferred();
    restoreWalk();
    $boy.transition(options,runTime,'linear');
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
    console.log(d1);
    return d1;
}