import {AbstractGameInstance} from "../models/abstract-game-instance";
import {AbstractGameService} from "../service-and-utils/abstract-game.service";
import {Injector} from "@angular/core";
/**
 * Created by michellenightward on 3/29/17.
 */
export abstract class AbstractGameComponent {

    public gameInstance: AbstractGameInstance;
    public gameService: AbstractGameService;

    constructor(injector: Injector, gameService: AbstractGameService) {
        this.gameService = gameService;
        this.gameService.setNewGameInstance();
        this.gameInstance = this.gameService.gameInstance;
    }
}
