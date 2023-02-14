window.addEventListener('load', function(){
    const canvas = document.getElementById("canvasForGame");
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;
    const gravity = 2;

    class BoxheadMan {
        constructor(){
            this.width = 100;
            this.height = 100;
            this.x=0;
            this.y=280;
            this.speedX = 5;
            this.speedY = 5;
            this.Image = document.getElementById('player');
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            this.y += gravity;
            this.draw();
        }
        draw(){
             //phương thức vẽ hình ảnh của canvas ctx.drawImage(player,x start render of photo,y start render of photo,width photo,height photo, x start render of canvas, y start render of canvas,canvas width render,canvas height render);
            ctx.drawImage(this.Image,0,0,200,200,this.x,this.y,this.width,this.height)
        }
    }
    const BoxHeadMan = new BoxheadMan();
    BoxHeadMan.update();

    function playerAnimate(){
        BoxHeadMan.update();
        requestAnimationFrame(playerAnimate);
    }
    playerAnimate();
 }
)
//     class gameScreen {
//         constructor(width,height){
//             this.width = width;
//             this.height = height;
//             this.Boxheadman = new BoxheadMan(this);
//             this.key = "ArrowRight";
//         }
//         update(key){
//             if(key ===  "ArrowRight")this.BoxheadMan.update(5,0);
//             else if(key ===  "ArrowLeft")this.BoxheadMan.update(-5,0);
//             else if(key ===  "ArrowUp")this.BoxheadMan.update(-5,0);
//             else if(key ===  "ArrowRight")this.BoxheadMan.update(-5,0);
//         }
//         draw(Context){
//             this.Boxheadman.draw(Context);
//         }
//     }
//     const gameScreen1 = new gameScreen(canvas.width,canvas.height);
//     console.log(gameScreen1);
//     function playerAnimate(){
//         ctx.clearRect(0,0,canvas.width,canvas.height)
//         gameScreen1.update(gameScreen1.key);
//         gameScreen1.draw(ctx);
//         requestAnimationFrame(playerAnimate);
//     }
//     playerAnimate();
// });

let gameFrame = 0;
const controlFrame = 2;


var playerRun = new Image();
var playerRunImageNumber = 1;


function runAnimation(){
    playerRun.src = '/BoxHeadMan sprites/run/run ('+ playerRunImageNumber +').png'
    ctx.drawImage(playerRun,0,0,200,200,player.Xplayer,player.Yplayer,100,100);
    if(gameFrame%controlFrame==0){
        if (playerRunImageNumber < 21) playerRunImageNumber++;
        else playerRunImageNumber =1;
    }
    player.Xplayer += 5;
    if(player.Xplayer==700) player.Xplayer = 0;
    gameFrame++;
    requestAnimationFrame(runAnimation);
}

var playerKO = new Image();
var playerKOImageNumber = 1;

function koAnimation(){
    // ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    playerKO.src = '/BoxHeadMan sprites/KO/KO ('+ playerKOImageNumber +').png'
    ctx.drawImage(playerKO,0,0,200,200,player.Xplayer,player.Yplayer,100,100);
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
    ctx.drawImage(playerJump,0,0,200,200,player.Xplayer,player.Yplayer,100,100);
    if(gameFrame%20==0){
        if (playerJumpImageNumber < 10){
            playerJumpImageNumber++;
            if (playerJumpImageNumber < 4) {
                player.Yplayer -= 20 ;
            } else if(playerJumpImageNumber == 5)
            {
                player.Xplayer -= 45;
            }
            else if(playerJumpImageNumber == 9) {
                player.Xplayer +=45;
                player.Yplayer += 60;
            }
        }
        else playerJumpImageNumber = 1;
    }
    gameFrame++;
    requestAnimationFrame(jumpAnimation);
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
