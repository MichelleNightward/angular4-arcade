import {AbstractGameInstance} from "../models/abstract-game-instance";
/**
 * Created by michellenightward on 4/26/17.
 */

export abstract class AbstractGameService {

    public gameInstance: AbstractGameInstance;

    constructor(gameInstance: AbstractGameInstance){
        this.gameInstance = gameInstance;
    }

    public setNewGameInstance(){
    }
    //
    // public startGame(){
    // }
    //
    // public gameOver() {
    // }
    //
    // public update() {
    // }
}