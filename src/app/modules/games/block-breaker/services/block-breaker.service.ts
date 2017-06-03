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
        this.setCanvasInfoAndDraw(this.canvas);
        clearInterval(this.intervalTimer);
    }

    public update(): void {
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.paddle.location.x = this.clamp(new TwoDLocation(this.mouseLocation.x - this.canvas.nativeElement.offsetLeft/2,
            this.mouseLocation.y - this.canvas.nativeElement.offsetTop)).x;
        if (this.gameInstance.active) {
            this.handleBallVelocity();
            this.ball.location.y += this.ball.velocity.y;
            this.ball.location.x += this.ball.velocity.x;
            //this.ball.location = this.clamp(new TwoDLocation(this.ball.location.x - 5, this.ball.location.y - 5))
        } else {
            this.ball.location.x = this.clamp(new TwoDLocation(this.mouseLocation.x - this.canvas.nativeElement.offsetLeft/2,
                this.mouseLocation.y - this.canvas.nativeElement.offsetTop)).x;
        }
        this.drawBricks();
        this.paddle.draw();
        this.ball.draw();
    }

    public setCanvasInfoAndDraw(canvas: ElementRef): void {
        this.canvas = canvas;
        this.canvas.nativeElement.width = 500;
        this.canvas.nativeElement.height = 350;
        this.context = this.canvas.nativeElement.getContext("2d");
        this.paddle = new GameComponent(this.canvas.nativeElement.getContext("2d"), 50, 10, null, "blue", null,
            new TwoDLocation(this.canvas.nativeElement.width/2-25, this.canvas.nativeElement.height-10), "rect");
        this.ball = new GameComponent(this.canvas.nativeElement.getContext("2d"), 10, 10, null, "blue", null,
            new TwoDLocation(this.canvas.nativeElement.width/2, this.canvas.nativeElement.height-21), "arc", new TwoDLocation(-5,-5));
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
            this.brickArray.push(new GameComponent(this.canvas.nativeElement.getContext("2d"), 45, 20, "#990000 10px solid", "#CC0000", null,
                new TwoDLocation(i, 15), "rect", new TwoDLocation(0,0), 0, 0, 1));
            this.brickArray.push(new GameComponent(this.canvas.nativeElement.getContext("2d"), 45, 20, "#990000 10px solid", "#CC0000", null,
                new TwoDLocation(i+22, 55), "rect", new TwoDLocation(0,0), 0, 0, 1));
            this.brickArray.push(new GameComponent(this.canvas.nativeElement.getContext("2d"), 45, 20, "#990000 10px solid", "#CC0000", null,
                new TwoDLocation(i, 95), "rect", new TwoDLocation(0,0), 0, 0, 1));
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

    public handleBallVelocity(): void {
        this.handleWallCollision(this.ball);
        this.handleBallCollisionWithPaddle();
        this.brickArray.forEach((brick) => {
            //this.handleBallCollisionWithBrick(brick);
            if (this.detectElementCollision(this.ball, brick)){
                console.log("object is hitting brick");
                brick.hitPoints = 0;
                this.ball.velocity.y *= -1;
                return;
            }
        });
        // Remove bricks that have no hitpoints left
        this.brickArray = this.brickArray.filter((item) => item.hitPoints > 0);
    }

    public handleBallCollisionWithBrick(brick: GameComponent): void {
        if (this.ball.location.x < brick.location.x + brick.width  && this.ball.location.x + this.ball.width  > brick.location.x &&
            this.ball.location.y < brick.location.y + brick.height && this.ball.location.y + this.ball.height > brick.location.y) {
            // The objects are touching
            console.log("object is hitting brick");
            this.ball.velocity.y *= -1;
            console.log(this.ball.velocity);
            brick.hitPoints -= 1;
            this.gameInstance.score += 10;
        }
    }

    public handleBallCollisionWithPaddle(): void {
        if (this.ball.location.x < this.paddle.location.x + this.paddle.width  && this.ball.location.x + this.ball.width  > this.paddle.location.x &&
            this.ball.location.y < this.paddle.location.y + this.paddle.height && this.ball.location.y + this.ball.height > this.paddle.location.y) {
            // The objects are touching
            console.log("object is hitting paddle");
            this.ball.velocity.y *= -1;
            console.log(this.ball.velocity);
        }
    }

    public detectElementCollision(object1: GameComponent, object2: GameComponent): boolean {
        if (object1.location.x < object2.location.x + object2.width  && object1.location.x + object1.width  > object2.location.x &&
            object1.location.y < object2.location.y + object2.height && object1.location.y + object1.height > object2.location.y) {
            // The objects are touching
            return true;
        }
    }

    public handleWallCollision(object: GameComponent): void {
        if(this.ball.location.x > this.canvas.nativeElement.width-(this.ball.width/2) || this.ball.location.x < this.ball.width/2) {
            this.ball.velocity.x *= -1 ;
        }
        if(this.ball.location.y < this.ball.width/2) {
            this.ball.velocity.y *= -1;
        }
        if (this.ball.location.y > this.canvas.nativeElement.height-(this.ball.width/2)) {
            this.gameOver();
        }
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