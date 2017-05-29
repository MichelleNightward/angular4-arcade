import {Component, Injector, OnInit, ViewChild, ElementRef} from "@angular/core";
import {BlockBreakerService} from "../services/block-breaker.service";
import {BlockBreakerGame} from "../models/block-breaker-game";
import {AbstractGameComponent} from "../../../../abstracted-resources/components/abstract-game.component";
import {followMouseMove} from "../../../../shared/animations/follow-mouse-movement";
/**
 * Created by michellenightward on 4/26/17.
 */
@Component({
    selector: "block-breaker",
    templateUrl: "app/modules/games/block-breaker/components/block-breaker.component.html",
    // animations: [
    //     followMouseMove(100, 100),
    // ],
})
export class BlockBreakerComponent extends AbstractGameComponent implements OnInit{

    @ViewChild("blockBreakerCanvas") canvas: ElementRef;
    public gameService: BlockBreakerService;
    public mouseStatus: boolean = false;

    constructor(injector: Injector, gameService: BlockBreakerService) {
        super(injector, gameService);
    }

    public ngOnInit() {
        // this.canvas.nativeElement.on('mouseenter', () => {
        //     this.mouseStatus = true;
        // }).on('mouseleave', () => {
        //     this.mouseStatus = false;
        // });
        this.gameService.setCanvasInfoAndDraw(this.canvas);
        // this.canvas.nativeElement.addEventListener('mousemove', (e: any) => {
        //     this.gameService.setMousePosition(e);
        //     this.gameService.drawPaddle();
        // });
    }

    public startGame() {
        // TODO look into bug where start and stop get wonky
        console.log("start");
        this.gameService.startGame();
    }

    public gameOver() {
        console.log("stop");
        this.gameService.gameOver();
    }
    public shouldPaddleFollowMouse() {
        return (this.mouseStatus);
    }
    public shouldBallFollowMouse() {
        return (this.mouseStatus && !this.gameInstance.active);
    }

}
