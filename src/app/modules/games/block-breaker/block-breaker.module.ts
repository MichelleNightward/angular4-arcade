/**
 * Created by michellenightward on 4/26/17.
 */
import { CommonModule }       from "@angular/common";
import { NgModule }           from "@angular/core";
import { BlockBreakerComponent }   from "./components/block-breaker.component";
import {BlockBreakerService} from "./services/block-breaker.service";
//import {AbstractResourcesModule} from "../../../abstracted-resources/abstracted-resources.module";
@NgModule({
    imports:      [
        CommonModule
    ],
    declarations: [
        BlockBreakerComponent,
    ],
    exports:      [ BlockBreakerComponent ],
    providers: [ BlockBreakerService ],
})
export class BlockBreakerModule {}
