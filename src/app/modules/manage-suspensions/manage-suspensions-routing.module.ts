import { RouterModule, Routes } from "@angular/router";

import { ManageSuspensionsComponent } from "./manage-suspensions.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: ManageSuspensionsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageSusupensionsRoutingModule{}
