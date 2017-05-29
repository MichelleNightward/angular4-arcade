/**
 * Created by michellenightward on 3/29/17.
 */
import { CommonModule }       from "@angular/common";
import { NgModule }           from "@angular/core";
import { SnakeComponent }   from "./components/snake.component";
import {SnakeCreatureComponent} from "./components/snake-creature.component";
import {FoodComponent} from "./components/food.component";
import {SnakeGameService} from "./services/snake-game.service";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
    imports:      [
        CommonModule,
        Angular2FontawesomeModule
    ],
    declarations: [
        SnakeComponent,
        SnakeCreatureComponent,
        FoodComponent,
    ],
    exports:      [ SnakeComponent ],
    providers: [ SnakeGameService ],
})
export class SnakeModule {}
