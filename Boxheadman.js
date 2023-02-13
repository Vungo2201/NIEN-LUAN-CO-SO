export default class BoxheadMan {
    constructor(gameScreen){
        this.gameScreen = gameScreen;
        this.width = 100;
        this.height = 100;
        this.x=0;
        this.y=280;
    }
    update(){

    }
    draw(playerAnimation){
        //phương thức tham chiếu nội dung vẽ của canvas
        playerAnimation.fillRect(this.x,this.y,this.width,this.height)
    }
}