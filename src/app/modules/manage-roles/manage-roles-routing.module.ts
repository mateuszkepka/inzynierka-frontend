import { RouterModule, Routes } from "@angular/router";

import { ManageRolesComponent } from "./manage-roles.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: ManageRolesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageRolesRoutingModule {}
