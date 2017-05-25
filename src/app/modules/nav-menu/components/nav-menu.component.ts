import {Component} from "@angular/core";
import {MenuItem} from "primeng/primeng";

/**
 * Created by michellenightward on 3/29/17.
 */
@Component({
    selector: "nav-menu",
    templateUrl: "app/modules/nav-menu/components/nav-menu.component.html",
})

export class NavMenuComponent{

    constructor() {
    }

    public items: MenuItem[] = [
        { label: "Leader Board", routerLink: ['/leader-board'] },
        { label: "Snake", routerLink: ['/snake'] },
        { label: "Block Breaker", routerLink: ['/block-breaker'] },
    ];

}
