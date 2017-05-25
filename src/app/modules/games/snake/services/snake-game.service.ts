import {SnakeGame} from "../models/snake-game";
import {Keys} from "../../../../shared/constants/keys";
import {TwoDLocation} from "../../../../shared/models/two-d-location";
import {Injectable} from "@angular/core";
import {AbstractGameService} from "../../../../abstracted-resources/service-and-utils/abstract-game.service";

/**
 * Created by michellenightward on 3/29/17.
 */
@Injectable()
export class SnakeGameService extends AbstractGameService {

    public gameInstance: SnakeGame;
    public boardSize: number = 20;
    public tempDirection: number = Keys.left;

    constructor(){
        super(new SnakeGame());
        window.addEventListener('keyup', (e: any) => {
            switch (e.keyCode) {
                case Keys.esc:
                    if (this.gameInstance.active) {
                        this.gameOver();
                    }
                    break;
                case Keys.enter || Keys.spaceBar:
                    if (this.gameInstance.active) {
                        this.gameOver();
                    }
                    if (!this.gameInstance.active){
                        this.startGame();
                    }
                    break;
                case Keys.left:
                    if (this.gameInstance.snakeDirection !== Keys.right) {
                        this.tempDirection = Keys.left;
                    }
                    break;
                case Keys.up:
                    if (this.gameInstance.snakeDirection !== Keys.down) {
                        this.tempDirection = Keys.up;
                    }
                    break;
                case Keys.right:
                    if (this.gameInstance.snakeDirection !== Keys.left) {
                        this.tempDirection = Keys.right;
                    }
                    break;
                case Keys.down:
                    if (this.gameInstance.snakeDirection !== Keys.up) {
                        this.tempDirection = Keys.down;
                    }
                    break;
            }
        });
    }

    public setNewGameInstance(){
        let snakeLocation: TwoDLocation[] = [new TwoDLocation(-1, -1)];
        let foodLocation: TwoDLocation = new TwoDLocation(-1, -1);
        this.gameInstance = new SnakeGame(snakeLocation, Keys.left, foodLocation, 0, this.boardSize, false, false, 150);
    }

    public startGame(){
        this.gameInstance.active = true;
        this.gameInstance.snakeLocation = [];
        this.tempDirection = Keys.left;
        for (let i: number = 0; i < 5; i++) {
            this.gameInstance.snakeLocation.push(new TwoDLocation(10 + i, 10));
        }
        this.resetFood();
        this.update();
    }

    public gameOver() {
        this.gameInstance.gameOver = true;
        setTimeout(() => {
            this.gameInstance.gameOver = false;
        }, 500);
        this.gameInstance.active = false;
        this.setNewGameInstance();
    }

    public update() {
        if (this.gameInstance.active) {
            setTimeout(() => {
                let newHeadLocation: TwoDLocation = this.getNewHeadLocation();
                if (this.boardCollision(newHeadLocation) || this.selfCollision(newHeadLocation)) {
                    return this.gameOver();
                }
                if (this.fruitCollision(newHeadLocation)) {
                    this.eatFood();
                }
                // remove tail
                this.gameInstance.snakeLocation.pop();
                // pop tail to head
                this.gameInstance.snakeLocation.unshift(newHeadLocation);
                // do it again
                this.gameInstance.snakeDirection = this.tempDirection;
                this.update();
            }, this.gameInstance.speed);
        }
    }

    getNewHeadLocation() {
        let newHead: TwoDLocation = JSON.parse(JSON.stringify(this.gameInstance.snakeLocation[0]));
        // update Location
        if (this.tempDirection === Keys.left) {
            newHead.x -= 1;
        } else if (this.tempDirection === Keys.right) {
            newHead.x += 1;
        } else if (this.tempDirection === Keys.up) {
            newHead.y -= 1;
        } else if (this.tempDirection === Keys.down) {
            newHead.y += 1;
        }
        return newHead;
    }

    isFoodCell(row: number, col: number) {
        return (this.gameInstance.foodLocation.x === row && this.gameInstance.foodLocation.y === col);
    }

    isSnakeCell(row: number, col: number) {
        let snakeCell: boolean = false;
        this.gameInstance.snakeLocation.forEach((cell: TwoDLocation) => {
            if (cell.x === row && cell.y === col) {
                snakeCell = true;
            }
        });
        return snakeCell;
        // TODO: find out why this indexOf line isn't working to determine if snake should show
        // return this.gameInstance.snakeLocation.indexOf(new TwoDLocation(row, col)) > -1;
    }

    boardCollision(location: TwoDLocation) {
        return location.x === this.boardSize || location.x === -1 || location.y === this.boardSize || location.y === -1;
    }

    selfCollision(location: TwoDLocation) {
        // TODO: find out why this indexOf line isn't working to determine if snake is colliding with itself
        // TODO: selfCollision isn't working due to the use of indexOf.
        //return this.gameInstance.snakeLocation.indexOf(location) > -1;
        let snakeCell: boolean = false;
        this.gameInstance.snakeLocation.forEach((cell: TwoDLocation) => {
            if (cell.x === location.x && cell.y === location.y) {
                snakeCell = true;
            }
        });
        return snakeCell;
    }

    fruitCollision(location: TwoDLocation) {
        return location.x === this.gameInstance.foodLocation.x && location.y === this.gameInstance.foodLocation.y;
    }

    eatFood() {
        this.gameInstance.score ++;
        let tail: TwoDLocation = JSON.parse(JSON.stringify(this.gameInstance.snakeLocation[this.gameInstance.snakeLocation.length - 1]));
        this.gameInstance.snakeLocation.push(tail);
        this.resetFood();
        if (this.gameInstance.score % 5 === 0) {
            this.gameInstance.speed -= 15;
        }
    }

    resetFood(): any {
        let x: number = Math.floor(Math.random() * this.boardSize);
        let y: number = Math.floor(Math.random() * this.boardSize);
        let gameInstance = this.gameInstance as any;
        if (gameInstance.foodLocation.y == y && gameInstance.foodLocation.x == x) {
            return this.resetFood();
        }
        this.gameInstance.foodLocation = new TwoDLocation(x, y);
    }
}