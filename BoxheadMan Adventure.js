const canvas = document.getElementById("canvasForGame");
// method returns a drawing context on the canvas (2d in this case)
const ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 1000;

const graviti = 1;
var run = 1;
var jump = 1;
var live = 0;
var game = true;

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
    up_Key : false
}
const BoxHeadMan = new BoxheadMan();
BoxHeadMan.image.src = './BoxHeadMan sprites/run/run (2).png';
const backgroundGame = new sprites();

backgroundGame.Shape.width = 600;
backgroundGame.Shape.height = 340;
backgroundGame.Shape.width_canvas = canvas.width;
backgroundGame.Shape.height_canvas = canvas.height;
backgroundGame.image.src = '/layer/backgroundGame.png';

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.save();
    backgroundGame.update();
    ctx.restore();

    BoxHeadMan.update();
    BoxHeadMan.move.speedX = 0;

    if(keysInput.right_Key){
        BoxHeadMan.image.src = '/BoxHeadMan sprites/run/run ('+ run +').png';
        if(run < 21) run++;
        else run = 1;
        BoxHeadMan.move.speedX = 4;
    }
    else if(keysInput.left_Key){
        BoxHeadMan.image.src = '/BoxHeadMan sprites/run/runleft ('+ run +').png';
        if(run < 20) run++;
        else run = 1;
        BoxHeadMan.move.speedX = -4;
    } else if(keysInput.up_Key) BoxHeadMan.move.speedY = -18;

    if(live == 0){
        for(i = 1;i < 22;i++) BoxHeadMan.image.src = '/BoxHeadMan sprites/KO/KO ('+ i +').png';
        // game = true;
    }
}

// while(game == true){
    animate()
// }


addEventListener('keydown',(Event) => {
    switch(Event.key) {
        case 'd':
        case 'ArrowRight':
        keysInput.right_Key = true;
        break;

        case "ArrowUp":
        case "w":
        keysInput.up_Key = true;
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

        case "ArrowUp":
        case "w":
        keysInput.up_Key = false;
        break;
        
        case "a":
        case "ArrowLeft":
        keysInput.left_Key = false;
        break;
    }
});

