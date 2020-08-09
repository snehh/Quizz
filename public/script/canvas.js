var canvas = document.querySelector("canvas");

canvas.width = 220;
canvas.height = 220;

var c = canvas.getContext('2d');

var correct = parseInt(c1, 10);
var wrong = parseInt(w1, 10);

if(wrong === 0 && correct === 0) {
    wrong = 5;
}

var finalAngle = (correct/(correct+wrong))*2*Math.PI
var fourth = Math.PI/2;

var flag = 1;
var theta = 0;

function base(){
    c.beginPath();
    c.arc(110, 110, 80, 0, 2*Math.PI)
    c.closePath();
    c.lineWidth = 8;
    c.strokeStyle= "#818a8a23"
    c.stroke();
}

function drawArc(angle){
    
    c.beginPath();
    c.arc(110, 110, 80, 0-fourth, angle-fourth)
    c.lineWidth = 8;
    c.strokeStyle= "#68da23"
    c.stroke();

    if(angle >= finalAngle)    
        flag = 0;
}

var animate = () => {
    c.clearRect(0, 0, 220, 220)
    base()
    if(flag === 1){
        requestAnimationFrame(animate)
    }

    if(flag === 0){
        cancelAnimationFrame(animate)
        
            c.beginPath();
            c.arc(110, 110, 80, 0-fourth, finalAngle-fourth)
            c.lineWidth = 8;
            c.strokeStyle= "#68da23"
            c.stroke();
    }

    drawArc(theta) 
    theta += 0.04;   
}
animate();
