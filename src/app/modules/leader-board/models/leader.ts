/**
 * Created by michellenightward on 3/29/17.
 */
export class Leader {

    public id: number;
    public initials: string;
    public score: number;

    constructor(id?: number, initials?: string, score?: number) {
        this.initials = initials;
        this.score = score;
    }

    public static collectionName(): string {
        return "leaders";
    }

}
