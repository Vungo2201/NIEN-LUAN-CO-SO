window.addEventListener('load', function(){
    const canvas = document.getElementById("canvasForGame");
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;
    let gameFrame = 0;
    const controlFrame = 2;

    const gravity = 2;
    const ground = 280;

    // var playerRun = new Image();
    // var playerRunImageNumber = 1;


    // function runAnimation(){
    //     playerRun.src = '/BoxHeadMan sprites/run/run ('+ playerRunImageNumber +').png'
    //     ctx.drawImage(playerRun,0,0,200,200,BoxHeadMan.x,BoxHeadMan.y,100,100);
    //     if(gameFrame%controlFrame==0){
    //         if (playerRunImageNumber < 21) playerRunImageNumber++;
    //         else playerRunImageNumber =1;
    //     }
    //     BoxHeadMan.x += 5;
    //     if(BoxHeadMan.x==700) BoxHeadMan.x = 0;
    //     gameFrame++;
    //     requestAnimationFrame(runAnimation);
    // }

    // var playerKO = new Image();
    // var playerKOImageNumber = 1;

    // function koAnimation(){
    //     // ctx.clearRect(0,0,canvas.width,canvas.height);
    //     playerKO.src = '/BoxHeadMan sprites/KO/KO ('+ playerKOImageNumber +').png'
    //     ctx.drawImage(playerKO,0,0,200,200,BoxHeadMan.x,BoxHeadMan.y,100,100);
    //     if(gameFrame%controlFrame==0){
    //         if (playerKOImageNumber < 21) playerKOImageNumber++;
    //         else playerKOImageNumber = 1;
    //     }
    //     gameFrame++;
    //     requestAnimationFrame(koAnimation);
    // }

    // var playerJump = new Image();
    // var playerJumpImageNumber = 1;

    // function jumpAnimation(){
    //     // ctx.clearRect(0,0,canvas.width,canvas.height);
    //     playerJump.src = '/BoxHeadMan sprites/jump/jump ('+ playerJumpImageNumber +').png'
    //     ctx.drawImage(playerJump,0,0,200,200,BoxHeadMan.x,BoxHeadMan.y,100,100);
    //     if(gameFrame%20==0){
    //         if (playerJumpImageNumber < 10){
    //             playerJumpImageNumber++;
    //             if (playerJumpImageNumber < 4) {
    //                 BoxHeadMan.y -= 20 ;
    //             } else if(playerJumpImageNumber == 5)
    //             {
    //                 BoxHeadMan.x -= 45;
    //             }
    //             else if(playerJumpImageNumber == 9) {
    //                 BoxHeadMan.x +=45;
    //                 BoxHeadMan.y += 60;
    //             }
    //         }
    //         else playerJumpImageNumber = 1;
    //     }
    //     gameFrame++;
    //     requestAnimationFrame(jumpAnimation);
    // }

    const backgroundGame = new Image();
    backgroundGame.src = '/layer/backgroundGame.png'
    let X1ofBackground = 0;
    let X2ofBackground = 690;

    function loopBackground(){ 
        ctx.drawImage(backgroundGame,110,40,600,340,X1ofBackground,0,canvas.width,canvas.height);
        ctx.drawImage(backgroundGame,110,40,600,340,X2ofBackground,0,canvas.width,canvas.height);
        if(X1ofBackground < -690) X1ofBackground = 690;
        else X1ofBackground -= controlFrame;
        X1ofBackground -= controlFrame;
        if(X2ofBackground < -690) X2ofBackground = 690;
        else X2ofBackground -= controlFrame;
        X2ofBackground -= controlFrame;
        requestAnimationFrame(loopBackground);
    }

    class BoxheadMan {
        constructor(){
            this.width = 100;
            this.height = 100;
            this.x=0;
            this.y=0;
            this.speedX = 0;
            this.speedY = 0;
            this.Image = document.getElementById('player');
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.y-this.height<=ground)
            this.y += gravity;
            else this.speedY = 0;
            if(this.x + this.speedX>=canvas.width);
            this.draw();
        }
        draw(){
             //phương thức vẽ hình ảnh của canvas ctx.drawImage(player,x start render of photo,y start render of photo,width photo,height photo, x start render of canvas, y start render of canvas,canvas width render,canvas height render);
            ctx.drawImage(this.Image,0,0,200,200,this.x,this.y,this.width,this.height)
        }
    }
    const BoxHeadMan = new BoxheadMan();
    BoxHeadMan.update();
    const key = {
        left: {
            input: true,
        },
        right: {
            input: true,
        },
        up: {
            input: true,
        },
        down: {
            input: true
        }
    }

    function playerAnimate(){
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        BoxHeadMan.update();
        requestAnimationFrame(playerAnimate);
    }
    loopBackground()
    playerAnimate()
    runAnimation();
    addEventListener("keydown",({ keyCode }) => {
        switch(keyCode){
            case 65:
            case 37:
            keyleft.input = true;
            break;

            case 87:
            case 38:
            keyright.input = true;
            break;

            case 69:
            case 39:
            keyup.input = true;
            break;

            }
        }
    );
    addEventListener("keyup",({ keyCode }) => {
        switch(keyCode){
            case 65:
            case 37:
            // runAnimation();
            break;

            case 87:
            case 38:
            // console.log("up")
            break;

            case 83:
            case 40:
            // console.log("down")
            // if()
            break;

            case 69:
            case 39:
            // console.log("left")
            break;

            }
        }
    );
});
