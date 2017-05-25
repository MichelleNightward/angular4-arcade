import {TwoDLocation} from "../../../../shared/models/two-d-location";
import {AbstractGameInstance} from "../../../../abstracted-resources/models/abstract-game-instance";
import {Injectable, ElementRef} from "@angular/core";
/**
 * Created by michellenightward on 5/18/17.
 */
@Injectable()
export class GameComponent extends AbstractGameInstance {

    public context: any;
    public width: number;
    public height: number;
    public color: string;
    public sprite: string;
    public location: TwoDLocation;
    public type: number;
    public speed: TwoDLocation;
    public gravity: number;
    public gravitySpeed: number;
    public hitPoints: number;

    constructor(context?: any, width?: number, height?: number, color?: string, sprite?: string, location?: TwoDLocation, type?: number,
                speed?: TwoDLocation, gravity?: number, gravitySpeed?: number, hitPoints?: number, id?: number) {
        super(id);
        this.context = context;
        this.width = width;
        this.height = height;
        this.color = color;
        this.sprite = sprite;
        this.location = location;
        this.type = type;
        this.speed = speed;
        this.gravity = gravity;
        this.gravitySpeed = gravitySpeed;
        this.hitPoints = hitPoints;
    }

    public newPosition() {
        this.gravitySpeed += this.gravity;
        this.location.x += this.speed.x;
        this.location.y += this.speed.y + this.gravitySpeed;
    }

    public static collectionName(): string {
        return "gameComponent";
    }

}