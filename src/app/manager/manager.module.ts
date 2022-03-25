import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { ManagerComponent } from "./components/manager/manager.component";

const routes: Routes = [
    { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard]}
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [ManagerComponent],
    exports: [RouterModule]
})
export class ManagerModule {

}