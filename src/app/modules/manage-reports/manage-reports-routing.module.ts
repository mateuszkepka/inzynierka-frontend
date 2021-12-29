import { RouterModule, Routes } from "@angular/router";

import { ManageReportDetailsComponent } from "./manage-report-details/manage-report-details.component";
import { ManageReportsComponent } from "./manage-reports.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        component: ManageReportsComponent,
    },
    {
        path: `:id`,
        component: ManageReportDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageReportsRoutingModule {}
