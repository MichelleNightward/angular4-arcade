import {Component, Injector} from "@angular/core";
import {SnakeGameService} from "../services/snake-game.service";
import {SnakeGame} from "../models/snake-game";
import {AbstractGameComponent} from "../../../../abstracted-resources/components/abstract-game.component";
/**
 * Created by michellenightward on 3/29/17.
 */
@Component({
    selector: "snake",
    templateUrl: "app/modules/games/snake/components/snake.component.html",
})
export class SnakeComponent extends AbstractGameComponent {

    public gameService: SnakeGameService;

    constructor(injector: Injector, gameService: SnakeGameService) {
        super(injector, gameService);
    }

    public startGame(){
        // TODO look into bug where start and stop get wonky
        console.log("start");
        this.gameService.startGame();
    }

    public gameOver(){
        console.log("stop");
        this.gameService.gameOver();
    }

    public foodCell(col: number, row: number) {
        return this.gameService.isFoodCell(col, row);
    }

    public snakeCells(col: number, row: number) {
        return this.gameService.isSnakeCell(col, row);
    }

    public boardRange = () => {
        let range = [];
        for(let i = 0; i < this.gameInstance.boardSize; ++i) {
            range.push(i+1)
        }
        return range;
    }

}
