import {Component, Injector} from "@angular/core";
import {Leader} from "../models/leader";
import {LeaderBoardService} from "../services/leader-board.service";
import {AbstractArcadeAppComponent} from "../../../abstracted-resources/components/abstract-arcade.component";
/**
 * Created by michellenightward on 3/29/17.
 */
@Component({
    selector: "leader-board",
    templateUrl: "app/modules/leader-board/components/leader-board.component.html",
})
export class LeaderBoardComponent extends AbstractArcadeAppComponent {

    public mainCollection: any = {};

    constructor(injector: Injector, leaderBoardService: LeaderBoardService) {
        super(injector);
    }

    public collection(): Leader[] {
        return this.mainCollection as Leader[];
    }

    public ngOnInit(): void {

    }

}
