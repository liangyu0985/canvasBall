/**
 * Created by ly on 2017/2/24.
 */
var GLOBAL =GLOBAL||{};
//画布的宽和高
GLOBAL.Width =0;
GLOBAL.Height =0;
//鼠标的位置
GLOBAL.mouseX =10000;
GLOBAL.mouseY =10000;
//鼠标的范围
GLOBAL.mouseR =100;
GLOBAL.mouseTime =0;


$(window).ready(function(){
    var canvas =$("#myCanvas");
    var context =canvas.get(0).getContext("2d");
    canvas.attr("width",$(window).width());
    canvas.attr("height",$(window).height());
    GLOBAL.Width =canvas.width();
    GLOBAL.Height =canvas.height();

    context.strokeStyle ="rgba(255,255,255,1)";

    //创建小球的构造函数
    var Ball =function(x,y,r,vx,vy,red,green,blue){
        this.x =x;
        this.y =y;
        this.r =r;
        this.vx =vx;
        this.vy =vy;
        this.red =red;
        this.green =green;
        this.blue =blue;
    };

    //创建一个存放小球的数组
    var balls =new Array();
    for(var i=0;i<300;i++){
        var x =Math.random()*(GLOBAL.Width-20)+10;
        var y =Math.random()*(GLOBAL.Height-20)+10;
        var r =(Math.random()-1/2)*3+10;
        var vx =(Math.random()-1/2)*4;
        var vy =(Math.random()-1/2)*4;
        var red =Math.floor(Math.random()*256);
        var green =Math.floor(Math.random()*256);
        var blue =Math.floor(Math.random()*256);
        balls.push(new Ball(x,y,r,vx,vy,red,green,blue));
    }

    animate();
    function animate(){
        //清空画布
        context.clearRect(0,0,GLOBAL.Width,GLOBAL.Height);

        //创建一个存放范围内小球的数组
        var otherBalls =new Array();

        //遍历出每一个小球的属性
        for(var i=0;i<balls.length;i++){
            var tmpball =balls[i];
            //判断触摸位置，并且进行距离检测
            if(Math.abs(Math.sqrt(Math.pow(tmpball.x-GLOBAL.mouseX,2)+Math.pow(tmpball.y-GLOBAL.mouseY,2)))<=300)
                otherBalls.push(tmpball);
        }

        if(GLOBAL.mouseTime !=0){
            if(GLOBAL.mouseTime<=500&&GLOBAL.mouseTime>400){
                context.strokeStyle ="rgba(255,255,255,"+(500-GLOBAL.mouseTime)/200+")";
            }else if(GLOBAL.mouseTime<=400&&GLOBAL.mouseTime>100){
                context.strokeStyle ="rgba(255,255,255,.5)";
            }else{
                context.strokeStyle ="rgba(255,255,255,"+((GLOBAL.mouseTime)/400+0.25)+")";
            }
            GLOBAL.mouseTime --;
        }

        delete otherBalls;

        //判断触摸位置，并且进行距离检测
        for(var i=0;i<otherBalls.length;i++){
            var tmpball1 =otherBalls[i];
            for(var j=i;j<otherBalls.length;j++){
                var tmpball2 =otherBalls[j];
                if(Math.abs(Math.sqrt(Math.pow(tmpball1.x-tmpball2.x,2)+Math.pow(tmpball1.y-tmpball2.y,2)))<=120){
                    context.save();
                    context.beginPath();
                    context.lineWidth =5;
                    context.moveTo(tmpball1.x,tmpball1.y);
                    context.lineTo(tmpball2.x,tmpball2.y);
                    context.stroke();
                    context.closePath();
                    context.restore();
                }
            }
        }

        //遍历出每一个小球的属性
        for(var i=0;i<balls.length;i++){
            var tmpball =balls[i];

            //让小球动起来
            tmpball.x +=tmpball.vx;
            tmpball.y +=tmpball.vy;

            //检测小球的碰撞
            if(tmpball.x<=0||tmpball.x>=GLOBAL.Width)
                tmpball.vx *=-1;
            if(tmpball.y<=0||tmpball.y>=GLOBAL.Height)
                tmpball.vy *=-1;

            //画出小球
            context.beginPath();
            context.fillStyle ="rgba("+tmpball.red+","+tmpball.green+","+tmpball.blue+",.8)";
            context.arc(tmpball.x,tmpball.y,tmpball.r,0,Math.PI*2,false);
            context.fill();
            context.closePath();
        }

        //动画每一帧执行的时间
        setTimeout(animate,33);

    }

    canvas.click(function(ev){
        var ev =ev||window.event;
        GLOBAL.mouseX =ev.pageX;
        GLOBAL.mouseY =ev.pageY;
        GLOBAL.mouseTime =500;
    })
})