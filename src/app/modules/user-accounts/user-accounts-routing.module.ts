import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { UserAccountsComponent } from "./user-accounts.component";

const routes: Routes = [
    {
        path: ``,
        component: UserAccountsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserAccountsRoutingModule { }
