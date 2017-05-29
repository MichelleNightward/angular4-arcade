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
    public type: string;
    public speed: TwoDLocation;
    public gravity: number;
    public gravitySpeed: number;
    public hitPoints: number;

    constructor(context?: any, width?: number, height?: number, color?: string, sprite?: string, location?: TwoDLocation, type?: string,
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

    public renderArc(newLocation: TwoDLocation) {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(newLocation.x, 90, this.height/2, 0, Math.PI * 2, false);
        this.context.fill();
        return this;
    }

    public renderRect(newLocation: TwoDLocation) {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.fillRect(newLocation.x, 100, 50, 10);
        this.context.fill();
        return this;
    }

    public update() {

    }

    public followMouseMovement(e: any) {
        console.log(e.clientX);
        this.location = new TwoDLocation(e.clientX - this.context.offsetLeft, e.clientY - this.context.offsetTop);
        // this.location.x = e.clientX - this.context.offsetLeft;
        // this.location.y = e.clientY - this.context.offsetTop;
        console.log(this.location.x);
        // if (this.type === "arc") {
        //     this.renderArc();
        // } else {
        //     this.renderRect();
        // }
        // return this;
    }

}