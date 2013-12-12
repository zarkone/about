function random(from,to){
    return Math.floor(Math.random()*(to-from+1)+from);
}

var HEXSYMBOLS = "0123456789ABCDEFF";

function randomColor(){
    return '#' + HEXSYMBOLS[random(0,16)] + HEXSYMBOLS[random(0,16)] + HEXSYMBOLS[random(0,16)] + HEXSYMBOLS[random(0,16)] + HEXSYMBOLS[random(0,16)] + HEXSYMBOLS[random(0,16)];
}


var circleProto = {
    x: 0,
    y: 0,
    r: 20,

    color: '#000',
    fallen: false,
    curveCoef: 34,
    fallCoef: 0.93,
    alpha: 0.8,

    startAngle: 0,
    endAngle: Math.PI * 2,
    antiClockwise: false
};

var circles = [];

var firstCircle = Object.create(circleProto);
firstCircle.x = 120;
firstCircle.y = 120;
circles.push(firstCircle);

console.log(new Date());

function createCircle(event) {

    var newCircle = Object.create(circleProto);

    newCircle.x = event.offsetX || event.pageX;
    newCircle.y = event.offsetY || event.pageY;

    newCircle.r = random(15,45);
    newCircle.color = randomColor();
    newCircle.curveCoef = random(14,644);
    newCircle.fallCoef = random(-100,100) / 100;
    newCircle.alpha = random(50,80) / 100;
    circles.push(newCircle);

    if(circles.length > 500 ) {
        circles.shift();
    }

}

// canvas.removeEventListener("click",createCircle,false);
var timerId = 0;

function cutCircle(params) {
    
    params.circle.startAngle = random(0, Math.PI * 2);
    params.circle.endAngle = random(params.circle.startAngle, Math.PI* 2);

    cutCircleTimer = setTimeout(function() {
        cutCircle({
            circle: circles[random(0, circles.length-1)]
        });
    }, 500);
}

function loop(){


    ctx.clearRect(0,0,canvasWidth, canvasHeight);

    circles.forEach(function (circle, i){

        if (circle.y > canvasHeight ) {
            circle.fallen = true;
        }
        
        ctx.beginPath();

        if( !circle.fallen ) {

            circle.y += circle.fallCoef +  Math.abs( circle.y / canvasHeight * circle.r / 500);
            circle.x += Math.sin(circle.y / canvas.height - circle.curveCoef );
            // circles.splice(i,1);
        }

        ctx.globalAlpha = circle.alpha;
        ctx.arc(circle.x,circle.y,circle.r, circle.startAngle,circle.endAngle,circle.antiClockwise);
        ctx.fillStyle = circle.color;
        // circle.color = randomColor();

        ctx.fill();


    });

    ctx.globalAlpha = 1;
    timerId = setTimeout(loop, 20);
}

function rainGenerator() {

    createCircle({
        offsetX: random(0, canvas.width),
        offsetY: -45
    });
    
    rainTimer = setTimeout(rainGenerator, 150);
}

function changeFallPath() {

    var index = random(0,circles.length - 1);
    circles[index].curveCoef += random(-100,100);
    circles[index].fallCoef = random(10,100) / 100;

    changeFallPathTimer = setTimeout(changeFallPath, random(100,500));
}

window.onload = function(){
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
    canvas = document.getElementById("cnv");
    canvas.width = x;
    canvas.height = y;
    
    ctx = canvas.getContext("2d");

    canvasWidth = canvas.width;
    canvasHeight= canvas.height;
    
    canvas.addEventListener("mousemove",createCircle,false);
    
    loop();
    rainGenerator();
    changeFallPath();
    
    // cutCircle({
    //     circle: circles[random(0, circles.length-1)]
    // });
    
    // TODO: Increment cut circle
    //       Smooth color changer
    //       When circle gets inside to another,
    //            make it roll on the inner border.
    
};
console.log(new Date());



