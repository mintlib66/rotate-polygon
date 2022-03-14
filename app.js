import {Polygon} from './polygon.js';

class App {
    constructor(){
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener("pointerdown", this.onDown.bind(this), false);
        document.addEventListener("pointermove", this.onMove.bind(this), false);
        document.addEventListener("pointerup", this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.Polygon = new Polygon (
            this.stageWidth / 2,
            this.stageHeight + (this.stageHeight / 5),
            this.stageHeight / 1.5,
            12
        );
    }
    //움직임 실행
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.moveX *= 0.92;

        this.Polygon.animate(this.ctx, this.moveX);
    }

    //마우스 클릭 시작
    onDown(e){
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX
    }
    //마우스 포인터 이동
    onMove(e){
        if(this.isDown){
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }
    //마우스 클릭상태 종료
    onUp(e){
        this.isDown = false;
    }
}

//실행
window.onload = () => {
    new App();
}