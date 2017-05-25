/**
 * Created by michellenightward on 3/29/17.
 */
export abstract class AbstractGameInstance {

    public id: number;
    public score: number;
    public boardSize: number;
    public active: boolean;
    public gameOver: boolean;

    constructor(score?: number, boardSize?: number, active?: boolean, gameOver?: boolean, id?: number) {
        this.score = score;
        this.boardSize = boardSize;
        this.active = active;
        this.gameOver = gameOver;
    }

}
