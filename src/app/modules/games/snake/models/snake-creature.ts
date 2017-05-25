import {TwoDLocation} from "../../../../shared/models/two-d-location";
/**
 * Created by michellenightward on 3/29/17.
 */
export class SnakeCreature {

    public snakeLocation: TwoDLocation[];
    public snakeDirection: number;

    constructor(snakeLocation?: TwoDLocation[], snakeDirection?: number) {
        this.snakeLocation = snakeLocation;
        this.snakeDirection = snakeDirection;
    }

}