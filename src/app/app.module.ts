/**
 * Created by michellenightward on 3/29/17.
 */
import {NgModule}      from "@angular/core";
import {FormsModule}   from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

import {SharedModule} from "primeng/components/common/shared";
import {RouterModule} from "@angular/router";
import {AppComponent}  from "./app.component";
import {routing} from "./app.routing";
import {NavMenuModule} from "./modules/nav-menu/nav-menu.module";
import {LeaderBoardModule} from "./modules/leader-board/leader-board.module";
import {SnakeModule} from "./modules/games/snake/snake.module";
import {BlockBreakerModule} from "./modules/games/block-breaker/block-breaker.module";
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
//import {AbstractResourcesModule} from "./abstracted-resources/abstracted-resources.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SharedModule,
        HttpModule,
        JsonpModule,
        RouterModule,
        routing,
        NavMenuModule,
        LeaderBoardModule,
        SnakeModule,
        BlockBreakerModule,
        Angular2FontawesomeModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
    ],

})
export class AppModule {
}
