import {TwoDLocation} from "../../../../shared/models/two-d-location";
import {AbstractGameInstance} from "../../../../abstracted-resources/models/abstract-game-instance";
import {Injectable} from "@angular/core";
/**
 * Created by michellenightward on 4/26/17.
 */
@Injectable()
export class BlockBreakerGame extends AbstractGameInstance {

    public speed: number;
    public isBallInMotion: boolean;

    constructor(score?: number, boardSize?: number, active?: boolean, gameOver?: boolean, speed?: number,
        isBallInMotion?: boolean, id?: number) {
        super(score, boardSize, active, gameOver, id);
        this.speed = speed;
        this.isBallInMotion = isBallInMotion;
    }

    public static collectionName(): string {
        return "blockBreakerGame";
    }

}
