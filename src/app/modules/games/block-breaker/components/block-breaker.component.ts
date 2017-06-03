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
})
export class BlockBreakerComponent extends AbstractGameComponent implements OnInit{

    @ViewChild("blockBreakerCanvas") canvas: ElementRef;
    public gameService: BlockBreakerService;
    public mouseStatus: boolean = false;

    constructor(injector: Injector, gameService: BlockBreakerService) {
        super(injector, gameService);
    }

    public ngOnInit() {
        this.gameService.setCanvasInfoAndDraw(this.canvas);
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

    public gameScore(): number {
        return this.gameService.gameInstance.score;
    }

}
