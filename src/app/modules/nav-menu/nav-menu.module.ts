/**
 * Created by michellerooy on 3/9/17.
 */
import { CommonModule }       from "@angular/common";
import { NgModule }           from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/primeng";
import {NavMenuComponent} from "./components/nav-menu.component";

@NgModule({
    imports:      [
        CommonModule,
        MenubarModule,
        FormsModule,
    ],
    declarations: [
        NavMenuComponent,
    ],
    exports:      [
        NavMenuComponent,
    ],
    providers:    [ ],
})
export class NavMenuModule { }
