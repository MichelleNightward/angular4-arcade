import {BlockBreakerGame} from "../models/block-breaker-game";
import {AbstractGameService} from "../../../../abstracted-resources/service-and-utils/abstract-game.service";
import {Injectable, ElementRef} from "@angular/core";
import {GameComponent} from "../models/game-component";
/**
 * Created by michellenightward on 4/26/17.
 */
@Injectable()
export class BlockBreakerService extends AbstractGameService {
    // public myGamePiece;
    // public myObstacles = [];
    // public myScore;
    //
    // public myGameArea = {
    //     canvas : document.createElement("canvas"),
    //     start : function() {
    //         this.canvas.width = 480;
    //         this.canvas.height = 270;
    //         this.context = this.canvas.getContext("2d");
    //         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //         this.frameNo = 0;
    //         this.interval = setInterval(updateGameArea, 20);
    //     },
    //     clear : function() {
    //         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     }
    // };

//     public startGame() {
//         let myGamePiece = new component(30, 30, "red", 10, 120);
//         myGamePiece.gravity = 0.05;
//         let myScore = new component("30px", "Consolas", "black", 280, 40, "text");
//         this.myGameArea.start();
//     }
//
//     public hitBottom() {
//         var rockbottom = myGameArea.canvas.height - this.height;
//         if (this.y > rockbottom) {
//             this.y = rockbottom;
//             this.gravitySpeed = 0;
//         }
//     }
//
//     public crashWith(otherobj) {
//         let myleft = this.x;
//         let myright = this.x + (this.width);
//         let mytop = this.y;
//         let mybottom = this.y + (this.height);
//         let otherleft = otherobj.x;
//         let otherright = otherobj.x + (otherobj.width);
//         let othertop = otherobj.y;
//         let otherbottom = otherobj.y + (otherobj.height);
//         let crash = true;
//         if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
//             crash = false;
//         }
//         return crash;
//     }
//
//     function updateGameArea() {
//     var x, height, gap, minHeight, maxHeight, minGap, maxGap;
//     for (i = 0; i < myObstacles.length; i += 1) {
//         if (myGamePiece.crashWith(myObstacles[i])) {
//             return;
//         }
//     }
//     myGameArea.clear();
//     myGameArea.frameNo += 1;
//     if (myGameArea.frameNo == 1 || everyinterval(150)) {
//         x = myGameArea.canvas.width;
//         minHeight = 20;
//         maxHeight = 200;
//         height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
//         minGap = 50;
//         maxGap = 200;
//         gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
//         myObstacles.push(new component(10, height, "green", x, 0));
//         myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
//     }
//     for (i = 0; i < myObstacles.length; i += 1) {
//         myObstacles[i].x += -1;
//         myObstacles[i].update();
//     }
//     myScore.text="SCORE: " + myGameArea.frameNo;
//     myScore.update();
//     myGamePiece.newPos();
//     myGamePiece.update();
// }
//
//     function everyinterval(n) {
//     if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
//     return false;
// }
//
//     function accelerate(n) {
//     myGamePiece.gravity = n;
// }

    public gameInstance: BlockBreakerGame;
    public canvas: ElementRef;
    public canvasPosition: any = {};
    private context: CanvasRenderingContext2D;
    public mouseX: number = 100;
    public mouseY: number = 100;
    public renderables: any[] = [];
    public paddle: GameComponent = new GameComponent(this.canvas);
    public ball: GameComponent = new GameComponent(this.canvas);

    constructor() {
        super(new BlockBreakerGame());
    }

    public setNewGameInstance() {
    }

    public startGame() {
        this.gameInstance.active = true;
        this.canvas.nativeElement.addEventListener('mousemove', (e: any) => {
            this.setMousePosition(e);
            this.drawPaddle();
            this.drawBall();
        });
        this.canvas.nativeElement.addEventListener('mousedown', (e: any) => {

        });
    }

    public gameOver() {
        this.gameInstance.active = false;
        // TODO: get removeEventListener working
        // this.canvas.nativeElement.removeEventListener('mousemove', (e: any) => {
        //     this.setMousePosition(e);
        //     this.drawPaddle();
        // });
        this.drawPaddle();
        this.drawBall();
    }

    public update(e: any) {
    }

    public setCanvasInfo(canvas: ElementRef){
        this.canvas = canvas;
        //this.context = this.canvas.nativeElement.getContext("2d");
        this.paddle.context = this.canvas.nativeElement.getContext("2d");
        this.ball.context = this.canvas.nativeElement.getContext("2d");
        this.drawPaddle();
        this.drawBall();
        //this.canvasPosition = getPosition(canvas);
    }

    public setMousePosition(e: any): void {
        // this.getPosition(this.canvas);
        this.mouseX = e.clientX - this.canvas.nativeElement.offsetLeft; // - this.canvasPosition.x;
        this.mouseY = e.clientY - this.canvas.nativeElement.offsetTop; // - this.canvasPosition.Y;
    }

    public drawPaddle(): void {
        this.paddle.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.paddle.context.beginPath();
        this.paddle.context.fillRect(this.mouseX, 100, 50, 10);
        //this.context.arc(this.mouseX, 100, 50, 0, 2 * Math.PI, true);
        this.paddle.context.fillStyle = "#FF6A6A";
        this.paddle.context.fill();
        //requestAnimationFrame();
    }

    public drawBall(): void {
        this.ball.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        //this.context.beginPath();
        //this.context.fillRect(this.mouseX, 100, 50, 10);
        this.ball.context.arc(this.mouseX, 90, 5, 0, 2 * Math.PI, true);
        this.ball.context.fillStyle = "#FF6A6A";
        this.ball.context.fill();
    }

    // TODO: get support in place for rendering multiple objects
    // public paddle(): void {
    //     this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //     this.context.beginPath();
    //     this.context.fillRect(this.mouseX, 100, 50, 10);
    //     //this.context.arc(this.mouseX, 100, 50, 0, 2 * Math.PI, true);
    //     this.context.fillStyle = "#FF6A6A";
    //     this.context.fill();
    //     //requestAnimationFrame();
    // }
    //
    // public ball(): void {
    //     this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //     //this.context.beginPath();
    //     //this.context.fillRect(this.mouseX, 100, 50, 10);
    //     this.context.arc(this.mouseX, 90, 5, 0, 2 * Math.PI, true);
    //     this.context.fillStyle = "#FF6A6A";
    //     this.context.fill();
    // }
    //
    // public draw() {
    //     this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    //     for (var i = 0; i < circles.length; i++) {
    //         var myCircle = circles[i];
    //         myCircle.update();
    //     }
    //     requestAnimationFrame(this.draw);
    // }

    // TODO: fix discrepancy between where mouse is and where paddle is
    // private getPosition(el: any) {
    //     var xPosition = 0;
    //     var yPosition = 0;
    //     while (el) {
    //         xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    //         yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    //         el = el.offsetParent;
    //     }
    //     this.canvasPosition = {
    //         x: xPosition,
    //         y: yPosition
    //     };
    // }
}