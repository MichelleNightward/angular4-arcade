/**
 * Created by michellenightward 4/26/17.
 */
import {animate, AnimationEntryMetadata, keyframes, state, style, transition, trigger} from "@angular/core";

export function followMouseMove(x: number, y: number): AnimationEntryMetadata {
    return trigger("followMouseMove", [
        state("inactive", style({})),
        transition("false => true", [
            animate(0, keyframes([
                style({top: y, left: x}),
            ])),
        ]),
    ]);
}
