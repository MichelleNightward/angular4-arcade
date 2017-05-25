/**
 * Created by michellenightward on 3/29/17.
 */
import { CommonModule }       from "@angular/common";
import { NgModule }           from "@angular/core";
import { LeaderBoardComponent }   from "./components/leader-board.component";
import {LeaderBoardService} from "./services/leader-board.service";
@NgModule({
    imports:      [ CommonModule ],
    declarations: [ LeaderBoardComponent ],
    exports:      [ LeaderBoardComponent ],
    providers:    [ LeaderBoardService ],
})
export class LeaderBoardModule {}
