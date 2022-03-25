import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { UserLayoutComponent } from "./components/user-layout/user-layout.component";
import { UserComponent } from "./components/user/user.component";


const routes: Routes = [
    {path: 'user', component: UserLayoutComponent, canActivate: [AuthGuard], children: [
        {path: '', component: UserComponent}
    ]}
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [UserComponent, UserLayoutComponent],
    exports: [RouterModule]
})
export class UserModule {

}