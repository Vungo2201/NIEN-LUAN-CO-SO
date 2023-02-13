const canvas = document.getElementById("canvasForGame");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 500;
let gameFrame = 0;
const controlFrame = 2;

var playerRun = new Image();
var playerRunImageNumber = 1;

function runAnimation(){
    // ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerRun.src = '/BoxHeadMan sprites/run/run ('+ playerRunImageNumber +').png'
     //ctx.drawImage(player,x start render of photo,y start render of photo,width photo,height photo, x start render of canvas, y start render of canvas,canvas width render,canvas height render);
    ctx.drawImage(playerRun,0,0,200,200,20,280,100,100);
    if(gameFrame%controlFrame==0){
        if (playerRunImageNumber < 21) playerRunImageNumber++;
        else playerRunImageNumber =1;
    }
    gameFrame++;
    requestAnimationFrame(runAnimation);
}

var playerKO = new Image();
var playerKOImageNumber = 1;

function koAnimation(){
    // ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerKO.src = '/BoxHeadMan sprites/KO/KO ('+ playerKOImageNumber +').png'
    ctx.drawImage(playerKO,0,0,200,200,20,150,100,100);
    if(gameFrame%controlFrame==0){
        if (playerKOImageNumber < 21) playerKOImageNumber++;
        else playerKOImageNumber = 1;
    }
    gameFrame++;
    requestAnimationFrame(koAnimation);
}

var playerJump = new Image();
var playerJumpImageNumber = 1;

function jumpAnimation(){
    // ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerJump.src = '/BoxHeadMan sprites/jump/jump ('+ playerJumpImageNumber +').png'
    ctx.drawImage(playerJump,0,0,200,200,20,150,100,100);
    if(gameFrame%controlFrame==0){
        if (playerJumpImageNumber < 12) playerJumpImageNumber++;
        else playerJumpImageNumber = 1;
    }
    gameFrame++;
    requestAnimationFrame(jumpAnimation);
}
var playerRollJump = new Image();
var playerRollJumpImageNumber = 1;

function rollJumpAnimation(){
    // ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerRollJump.src = '/BoxHeadMan sprites/Roll jump/Roll jump ('+ playerRollJumpImageNumber +').png'
    ctx.drawImage(playerRollJump,0,0,200,200,20,150,100,100);
    if(gameFrame%controlFrame==0){
        if (playerRollJumpImageNumber < 18) playerRollJumpImageNumber++;
        else playerRollJumpImageNumber = 1;
    }
    gameFrame++;
    requestAnimationFrame(rollJumpAnimation);
}

const backgroundGame = new Image();
backgroundGame.src = '/layer/backgroundGame.png'
let X1ofBackground = 0;
let X2ofBackground = 690;

function loopBackground(){  
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(backgroundGame,110,40,600,340,X1ofBackground,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(backgroundGame,110,40,600,340,X2ofBackground,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    if(X1ofBackground < -690) X1ofBackground = 690;
    else X1ofBackground -= controlFrame;
    X1ofBackground -= controlFrame;
    if(X2ofBackground < -690) X2ofBackground = 690;
    else X2ofBackground -= controlFrame;
    X2ofBackground -= controlFrame;
    requestAnimationFrame(loopBackground);
}
loopBackground()
runAnimation()
