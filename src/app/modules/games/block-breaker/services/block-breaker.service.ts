import {BlockBreakerGame} from "../models/block-breaker-game";
import {AbstractGameService} from "../../../../abstracted-resources/service-and-utils/abstract-game.service";
import {Injectable, ElementRef} from "@angular/core";
import {GameComponent} from "../models/game-component";
import {TwoDLocation} from "../../../../shared/models/two-d-location";
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

    public intervalTimer: any;
    public gameInstance: BlockBreakerGame = new BlockBreakerGame(0, 50, false, true, 150);
    public canvas: ElementRef;
    public canvasPosition: any = {};
    private context: CanvasRenderingContext2D;
    public mouseLocation: TwoDLocation = new TwoDLocation(100, 100);
    public renderables: any[] = [];
    public paddle: GameComponent;
    public ball: GameComponent;
    public brickArray: GameComponent[] = [];

    constructor() {
        super(new BlockBreakerGame());
    }

    public startGame(): void {
        this.setCanvasInfoAndDraw(this.canvas);
        this.canvas.nativeElement.addEventListener('mousemove', (e: any) => {
            this.setMousePosition(e);
        });
        this.canvas.nativeElement.addEventListener('mousedown', (e: any) => {
            this.gameInstance.active = true;
        });
        this.intervalTimer = setInterval(()=> {
            this.update();
        }, 1000/30);
    }

    public gameOver(): void {
        this.gameInstance.active = false;
        // TODO: get removeEventListener working
        // this.canvas.nativeElement.removeEventListener('mousemove', (e: any) => {
        //     this.setMousePosition(e);
        //     this.drawPaddle();
        // });
        // this.drawPaddle();
        // this.drawBall();
        this.setCanvasInfoAndDraw(this.canvas);
        clearInterval(this.intervalTimer);
    }

    public update(): void {
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.paddle.location.x = this.clamp(new TwoDLocation(this.mouseLocation.x - this.canvas.nativeElement.offsetLeft/2,
            this.mouseLocation.y - this.canvas.nativeElement.offsetTop)).x;
        if (this.gameInstance.active) {
            this.ball.location.y = this.ball.location.y - 5;
            this.ball.location.x = this.ball.location.x - 5;
            //this.ball.location = this.clamp(new TwoDLocation(this.ball.location.x - 5, this.ball.location.y - 5))
        } else {
            this.ball.location.x = this.clamp(new TwoDLocation(this.mouseLocation.x - this.canvas.nativeElement.offsetLeft/2,
                this.mouseLocation.y - this.canvas.nativeElement.offsetTop)).x;
        }
        this.paddle.draw();
        this.ball.draw();
        this.drawBricks();
    }

    public setCanvasInfoAndDraw(canvas: ElementRef): void {
        this.canvas = canvas;
        this.canvas.nativeElement.width = 500;
        this.canvas.nativeElement.height = 350;
        this.context = this.canvas.nativeElement.getContext("2d");
        this.paddle = new GameComponent(this.canvas.nativeElement.getContext("2d"), 50, 10, null, "blue", null,
            new TwoDLocation(this.canvas.nativeElement.width/2-25, this.canvas.nativeElement.height-10), "rect");
        this.ball = new GameComponent(this.canvas.nativeElement.getContext("2d"), 10, 10, null, "blue", null,
            new TwoDLocation(this.canvas.nativeElement.width/2, this.canvas.nativeElement.height-21), "arc");
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.createBricksArray();
        this.paddle.draw();
        this.ball.draw();
        this.drawBricks();
    }

    public createBricksArray(): void {
        let brickColumns = this.canvas.nativeElement.width/10;
        let brickRows = (this.canvas.nativeElement.height/3)/5;
        for (let i: number = 0; i < this.canvas.nativeElement.width; i+=50) {
            this.brickArray.push(new GameComponent(this.canvas.nativeElement.getContext("2d"), 50, 10, "#990000 10px solid", "#CC0000", null,
                new TwoDLocation(i, 15), "rect"));
            this.brickArray.push(new GameComponent(this.canvas.nativeElement.getContext("2d"), 50, 10, "#990000 10px solid", "#CC0000", null,
                new TwoDLocation(i, 55), "rect"));
            this.brickArray.push(new GameComponent(this.canvas.nativeElement.getContext("2d"), 50, 10, "#990000 10px solid", "#CC0000", null,
                new TwoDLocation(i, 95), "rect"));
        }
    }

    public drawBricks(): void {
        this.brickArray.forEach(function(brick) {
            brick.draw();
        });
    }

    public setMousePosition(e: any): void {
        this.mouseLocation = new TwoDLocation(e.clientX - this.canvas.nativeElement.offsetLeft, e.clientY - this.canvas.nativeElement.offsetTop);
    }

    public detectCollision(): void {

    }

    public detectElementCollision(): void {

    }

    public detectWallCollision(): void {

    }

    public clamp(location: TwoDLocation): TwoDLocation {
        let x = location.x;
        let y = location.y;
        if (x > this.canvas.nativeElement.width) {
            x = this.canvas.nativeElement.width;
        }
        if (x < 0){
            x = 0;
        }
        if (y > this.canvas.nativeElement.height) {
            y = this.canvas.nativeElement.height;
        }
        if (y < 0){
            y = 0;
        }
        return new TwoDLocation(x,y)
    }

    // private clamp(min: number, max: number) {
    //     Math.min(Math.max(min), max);
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