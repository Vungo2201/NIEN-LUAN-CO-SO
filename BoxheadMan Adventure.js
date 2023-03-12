const canvas = document.getElementById("canvasForGame");
// method returns a drawing context on the canvas (2d in this case)
const ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 1000;

const graviti = 1;
var run = 1;
var dead = 1;
var liveNumber = 3;
//control star game,end game
var gamestate = 0;
var Timer = 0;
var score = 0;

class sprites {
    constructor(){
        this.Position = {
            X: 0,
            Y: 0,
            X_canvas: 0,
            Y_canvas: 0,
        }
        this.Shape = {
            width: 0,
            height: 0,
            width_canvas: 0,
            height_canvas: 0
        }

        this.image = new Image();
    }

    draw(){
        if(this.image.src != null)
            return ctx.drawImage(this.image,this.Position.X,this.Position.Y,this.Shape.width,this.Shape.height,this.Position.X_canvas,this.Position.Y_canvas,this.Shape.width_canvas,this.Shape.height_canvas);
    }

    update(){
        this.draw()
    }
}

class BoxheadMan extends sprites{
    constructor(){
        super();
        this.Shape = {
            width: 175,
            height: 175,
            width_canvas: 200,
            height_canvas: 200
        }
        this.move = {
            speedX: 0,
            speedY: 0
        }
    }
    update() {
        this.draw();
        
        this.Position.X_canvas += this.move.speedX;
        this.Position.Y_canvas += this.move.speedY;

        if(this.Position.Y_canvas + this.Shape.height + this.move.speedY < canvas.height - 250)
            this.move.speedY += graviti;
        else this.move.speedY = 0;

        if(this.Position.X_canvas  - this.Shape.width_canvas > canvas.height)
            this.Position.X_canvas = 0;
        else if(this.Position.X_canvas + this.Shape.width_canvas < 0) this.Position.X_canvas = canvas.width-this.Shape.width_canvas;
    }
}

class enemy extends sprites{
    constructor(enemy_sprites,width_i,height_i,Y_canvas,speed){
        super();
        this.enemy_sprites = enemy_sprites;
        this.enemy_sprites_number = 1;
        this.Shape = {
           width : width_i,
           height : height_i,
           width_canvas:130,
           height_canvas: 130
        }
        this.speed = speed;
        this.Position.X_canvas = canvas.width;
        this.Position.Y_canvas = Y_canvas;
        this.image.src = '/'+ this.enemy_sprites +'/anh ('+  1 +').png'
    }
    update(){
        this.draw();
        this.Position.X_canvas-= this.speed;
        this.image.src = '/'+ this.enemy_sprites +'/anh ('+  this.enemy_sprites_number +').png'
        this.enemy_sprites_number++;
        if(this.enemy_sprites_number > 11) this.enemy_sprites_number = 1;
        console.log(this.image.src)

    }
}

var keysInput = {
    left_Key : false,
    right_Key : false,
}

addEventListener('keydown',(Event) => {
    switch(Event.key) {
        case 'd':
        case 'ArrowRight':
        keysInput.right_Key = true;
        break;

        case "ArrowUp":
        case "w":
        BoxHeadMan.move.speedY = -25;
        break;

        case "a":
        case "ArrowLeft":
        keysInput.left_Key = true;
        break;
    }
});
addEventListener('keyup',(Event) => {
    switch(Event.key) {
        case 'd':
        case 'ArrowRight':
        keysInput.right_Key = false;
        break;
        
        case "a":
        case "ArrowLeft":
        keysInput.left_Key = false;
        break;
    }
});

const BoxHeadMan = new BoxheadMan();
BoxHeadMan.image.src = '/BoxHeadMan sprites/run/run (19).png';

var live = new sprites();
live.image.src = '/layer/heart.png';

var alien = new enemy("Alien sprites",1214,784,650,1.75);
var bee = new enemy("Bee sprites",273,282,400,3);
var bat = new enemy("Bluebat sprites",476,450,480,2.5);
var ghost = new enemy("Ghost sprites",396,528,380,1.5);

const enemy_store = [alien,bee,bat,ghost];
const random = Math.floor(Math.random()*enemy_store.length);
// console.log(enemy_store[random]);

var backgroundGame = new sprites();
var backgroundGame2 = new sprites();

backgroundGame2.Shape.width=backgroundGame.Shape.width = 600;
backgroundGame2.Shape.height=backgroundGame.Shape.height = 340;
backgroundGame2.Shape.width_canvas=backgroundGame.Shape.width_canvas = canvas.width;
backgroundGame2.Shape.height_canvas=backgroundGame.Shape.height_canvas = canvas.height;
backgroundGame2.image.src = backgroundGame.image.src = '/layer/backgroundGame.png';
backgroundGame2.Position.X_canvas = 1300;

function animateGame(){
    if(gamestate== 0){
        window.requestAnimationFrame(animateGame);

        ctx.fillStyle = 'pink';
        // ctx.fillRect(0,0,canvas.width,canvas.height);

        backgroundGame.update();
        BoxHeadMan.Position.X_canvas = canvas.width*0.4;
        BoxHeadMan.Position.Y_canvas = canvas.height*0.225;
        BoxHeadMan.draw();

        alien.Position.X_canvas = canvas.width*0.55;
        alien.Position.Y_canvas = canvas.height*0.3;
        alien.draw();

        ctx.font = "75px Arial";
        ctx.fillText("BoxheadMan Adventure",canvas.width*0.2,canvas.height*0.5);

        ctx.strokeStyle = "white";
        ctx.fillStyle = "red";
        ctx.font = "100px Arial";
        ctx.strokeText("Star",canvas.width*0.45,canvas.height*0.62);
        ctx.fillText("Star",canvas.width*0.45,canvas.height*0.62);

        addEventListener('click',(Event)=>gamestate=1)


    }
    else if(gamestate==1){
        Timer++;
        window.requestAnimationFrame(animateGame);
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.save();
        backgroundGame.update();
        backgroundGame2.update();
        ctx.restore();
        
      
        for(let i = 0;i < liveNumber; i++){
            ctx.drawImage(live.image,0,0,80,80,30+75*i,30,80,80);
        }

        ctx.font = "50px Arial";
        ctx.fillText("Score: " + (score*0.05).toFixed(0) ,canvas.width-350,80);
        ctx.fillText("Time: " + (Timer*0.028).toFixed(0) ,canvas.width-350,150 )

        // ghost.update();
        // bat.update();
        // bee.update();
        // alien.update();
        // if((Timer*0.028).toFixed(0)%13==0)   enemy_store[random].update();
        BoxHeadMan.update();
        BoxHeadMan.move.speedX = 0;

        if(keysInput.right_Key){
            BoxHeadMan.image.src = '/BoxHeadMan sprites/run/run ('+ run +').png';
            if(run < 21) run++;
            else run = 1;
            BoxHeadMan.move.speedX = 4;
            backgroundGame.Position.X_canvas--;
            backgroundGame2.Position.X_canvas--;
            score++;
            // liveNumber -= 1/10;
        }
        else if(keysInput.left_Key){
            BoxHeadMan.image.src = '/BoxHeadMan sprites/run/runleft ('+ run +').png';
            if(run < 20) run++;
            else run = 1;
            BoxHeadMan.move.speedX = -4;
            backgroundGame.Position.X_canvas++;
            backgroundGame2.Position.X_canvas++;
            score--;
        } 

        if(backgroundGame.Position.X_canvas<-1300) backgroundGame.Position.X_canvas = 1299;
        if(backgroundGame2.Position.X_canvas<-1300) backgroundGame2.Position.X_canvas = 1299;
        if(backgroundGame.Position.X_canvas>1300) backgroundGame.Position.X_canvas = -1299;
        if(backgroundGame2.Position.X_canvas>1300) backgroundGame2.Position.X_canvas = -1299;
        if(score<0) score=0;

        if(liveNumber <= 0){
            BoxHeadMan.Shape.width = 228;
            BoxHeadMan.Shape.height = 192;
            BoxHeadMan.image.src = '/BoxHeadMan sprites/KO/KO ('+ 21 +').png';
            if(dead < 20) dead++;
            else gamestate = 2;
        }
    }
    else if(gamestate==2){
        window.requestAnimationFrame(animateGame);
        backgroundGame.draw();
        BoxHeadMan.draw();
        
        ctx.fillStyle = "black";
        ctx.font = "75px Arial";
        ctx.fillText("Your score is: " + (score*0.05).toFixed(0) ,canvas.width*0.3,300);
        ctx.fillText("Your survival time is: " + (Timer*0.028).toFixed(0) ,canvas.width*0.3,375);

        ctx.fillStyle = "pink";
        ctx.font = "55px Time new roman";
        ctx.fillText('press enter to try again',canvas.width*0.25,450);

        window.addEventListener('keydown',(Event) => {
            if(Event.key=='Enter') {
                liveNumber = 3;
                BoxHeadMan.Position.X_canvas = 0;
                score = 0;
                Timer = 0;
                BoxHeadMan.image.src = '/BoxHeadMan sprites/run/run (19).png';
                gamestate = 1;
            }
        });
    }
}

animateGame()

