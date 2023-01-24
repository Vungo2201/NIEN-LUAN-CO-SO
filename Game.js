const canvas = document.getElementById("canvasForGame");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 500;

var playerRun = new Image();
var playerRunImageNumber = 1;

function runAnimation(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerRun.src = '/BoxHeadMan sprites/run/run ('+ playerRunImageNumber +').png'
     //ctx.drawImage(player,x start render of photo,y start render of photo,width photo,height photo, x start render of canvas, y start render of canvas,canvas width render,canvas height render);
    ctx.drawImage(playerRun,0,0,200,200,20,150,100,100);
    if (playerRunImageNumber < 21) playerRunImageNumber++;
    else playerRunImageNumber =1;
    requestAnimationFrame(runAnimation);
}
var playerKO = new Image();
var playerKOImageNumber = 1;

function koAnimation(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerKO.src = '/BoxHeadMan sprites/KO/KO ('+ playerKOImageNumber +').png'
    ctx.drawImage(playerKO,0,0,200,200,20,150,100,100);
    if (playerKOImageNumber < 21) playerKOImageNumber++;
    else playerKOImageNumber = 1;
    requestAnimationFrame(koAnimation);
}


