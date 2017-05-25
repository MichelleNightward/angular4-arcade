import {TwoDLocation} from "../../../../shared/models/two-d-location";
import {AbstractGameInstance} from "../../../../abstracted-resources/models/abstract-game-instance";
import {Injectable} from "@angular/core";
/**
 * Created by michellenightward on 3/29/17.
 */
@Injectable()
export class SnakeGame extends AbstractGameInstance {

    public snakeLocation: TwoDLocation[];
    public foodLocation: TwoDLocation;
    public snakeDirection: number;
    public speed: number;

    constructor(snakeLocation?: TwoDLocation[], snakeDirection?: number, foodLocation?: TwoDLocation, score?: number,
            boardSize?: number, active?: boolean, gameOver?: boolean, speed?: number, id?: number) {
        super(score, boardSize, active, gameOver, id);
        this.snakeLocation = snakeLocation;
        this.foodLocation = foodLocation;
        this.snakeDirection = snakeDirection;
        this.speed = speed;
    }

    public static collectionName(): string {
        return "snakeGame";
    }


}
