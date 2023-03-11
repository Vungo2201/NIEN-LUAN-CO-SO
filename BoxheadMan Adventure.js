const canvas = document.getElementById("canvasForGame");
// method returns a drawing context on the canvas (2d in this case)
const ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 1000;

const graviti = 1;
var run = 1;
var jump = 1;
var liveNumber = 3;
//control star game,end game
var gamestate = 1;
var Timer = 0;
var score = 0 ;

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

var keysInput = {
    left_Key : false,
    right_Key : false,
}

addEventListener('keydown',(Event) => {
    console.log(Event.key)
    switch(Event.key) {
        case 'd':
        case 'ArrowRight':
        keysInput.right_Key = true;
        break;

        case "ArrowUp":
        case "w":
        BoxHeadMan.move.speedY = -28;
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

var backgroundGame = new sprites();
var backgroundGame2 = new sprites();

backgroundGame2.Shape.width=backgroundGame.Shape.width = 600;
backgroundGame2.Shape.height=backgroundGame.Shape.height = 340;
backgroundGame2.Shape.width_canvas=backgroundGame.Shape.width_canvas = canvas.width;
backgroundGame2.Shape.height_canvas=backgroundGame.Shape.height_canvas = canvas.height;
backgroundGame2.image.src = backgroundGame.image.src = '/layer/backgroundGame.png';
backgroundGame2.Position.X_canvas = 1300;

function animate(){
    if(gamestate==1){
        Timer++;
        window.requestAnimationFrame(animate);
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.save();
        backgroundGame.update();
        backgroundGame2.update();
        ctx.restore();
      
        for(let i = 0;i < liveNumber; i++){
            ctx.drawImage(live.image,0,0,80,80,30+75*i,30,80,80);
        }

        ctx.font = "40px Arial black";
        ctx.fillText("Score: " + (score*0.05).toFixed(0) ,canvas.width-350,80);
        ctx.fillText("Time: " + (Timer*0.028).toFixed(0) ,canvas.width-350,150 )

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

        if(liveNumber == 0){
            for(i = 1;i < 22;i++) BoxHeadMan.image.src = '/BoxHeadMan sprites/KO/KO ('+ i +').png';
            // gamestate = 2;
        }
    }
}

animate()

