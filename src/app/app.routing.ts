/**
 * Created by michellenightward on 3/29/17.
 */
import {ModuleWithProviders}  from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LeaderBoardComponent}  from "./modules/leader-board/components/leader-board.component";
import {SnakeComponent} from "./modules/games/snake/components/snake.component";
import {BlockBreakerComponent} from "./modules/games/block-breaker/components/block-breaker.component";
const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/leader-board",
        pathMatch: "full",
    },
    {
        path: "leader-board",
        component: LeaderBoardComponent,
    },
    {
        path: "snake",
        component: SnakeComponent,
    },
    {
        path: "block-breaker",
        component: BlockBreakerComponent,
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
