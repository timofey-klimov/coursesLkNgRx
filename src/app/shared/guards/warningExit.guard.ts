import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { ICanDeactivateComponent } from "./canDeactivate.component";
import { from } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WarningExitGuard implements CanDeactivate<ICanDeactivateComponent> {

    canDeactivate(component: ICanDeactivateComponent) : Observable<boolean> | boolean {
        return from(component.canDeactivate());
    }
}