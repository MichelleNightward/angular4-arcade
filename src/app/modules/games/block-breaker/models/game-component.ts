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
    public border: string;
    public color: string;
    public sprite: string;
    public location: TwoDLocation;
    public type: string;
    public velocity: TwoDLocation;
    public gravity: number;
    public gravitySpeed: number;
    public hitPoints: number;

    constructor(context?: any, width?: number, height?: number, border?: string, color?: string, sprite?: string,
                location?: TwoDLocation, type?: string, velocity?: TwoDLocation, gravity?: number, gravitySpeed?: number,
                hitPoints?: number, id?: number) {
        super(id);
        this.context = context;
        this.width = width;
        this.height = height;
        this.border = border;
        this.color = color;
        this.sprite = sprite;
        this.location = location;
        this.type = type;
        this.velocity = velocity;
        this.gravity = gravity;
        this.gravitySpeed = gravitySpeed;
        this.hitPoints = hitPoints;
    }

    public draw(){
        this.context.fillStyle = this.color;
        this.context.border = this.border;
        this.context.beginPath();
        if (this.type === "arc"){
            this.context.arc(this.location.x, this.location.y, this.height/2, 0, Math.PI * 2, false);
        } else if (this.type === "rect") {
            this.context.fillRect(this.location.x, this.location.y, this.width, this.height);
        }
        this.context.fill();
    }

    public update() {

    }

    // public newPosition() {
    //     this.gravitySpeed += this.gravity;
    //     this.location.x += this.speed.x;
    //     this.location.y += this.speed.y + this.gravitySpeed;
    // }

}