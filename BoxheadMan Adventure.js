const canvas = document.getElementById("canvasForGame");
// method returns a drawing context on the canvas (2d in this case)
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 700;

const graviti = 0.6;

class sprites {
    constructor(){
        this.Image_position = {
            X: 0,
            Y: 0,
            X_canvas: 0,
            Y_canvas: 0,
        }
        this.Image_shape = {
            with: 0,
            height: 0,
            width_canvas: 0,
            height_canvas: 0
        }

        this.image = new Image();
        this.image.src = null;
    }

    draw(){
        if(this.image.src != null)
            return ctx.drawImage(this.image,this.Image_position.X,this.Image_position.Y,this.Image_shape.with,this.Image_shape.height,this.Image_position.X_canvas,this.Image_position.Y_canvas,this.Image_shape.width_canvas,this.Image_shape.height_canvas)
    }

    update(){
        this.draw()
    }
}

class BoxheadMan {
    constructor(){
        this.Position = {
            X: 0,
            Y: 0
        }
        this.shape = {
            width: 100,
            height: 100
        }
        this.move = {
            speedX: 0,
            speedY: 0
        }
    }
    
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.Position.X,this.Position.Y,100,100);
        //method draw Image of canvas ctx.drawImage(photo,x start render of photo,y start render of photo,width photo,height photo, x start render of canvas, y start render of canvas,canvas width render,canvas height render);
        //ctx.drawImage(this.Image,0,0,200,200,this.x,this.y,this.width,this.height)
    }

    update() {
        this.draw();
        
        this.Position.X += this.move.speedX;
        this.Position.Y += this.move.speedY;

        if(this.Position.Y + this.shape.height + this.move.speedY < canvas.height)
            this.move.speedY += graviti;
        else this.move.speedY = 0;


    }
}

var keysInput = {
    left_Key : false,
    right_Key : false
}
const BoxHeadMan = new BoxheadMan();
const backgroundGame = new sprites();

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    BoxHeadMan.update();

    BoxHeadMan.move.speedX = 0;

    if(keysInput.right_Key) BoxHeadMan.move.speedX = 2.5;
    else if(keysInput.left_Key)  BoxHeadMan.move.speedX = -2.5;
}

animate()

addEventListener('keydown',(Event) => {
    switch(Event.key) {
        case 'd':
        case 'ArrowRight':
        keysInput.right_Key = true;
        console.log(keysInput)
        break;

        case "ArrowUp":
        case "w":
        BoxHeadMan.move.speedY = -18;
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

