import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: ``,
        loadChildren: async () => {
            return import(`./modules/home/home.module`).then(
                (m) => m.HomeModule
            );
        },
    },
    {
        path: `organization`,
        loadChildren: async () => {
            return import(`./modules/organization/organization.module`).then(
                (m) => m.OrganizationModule
            );
        },
    },
    {
        path: `participation`,
        loadChildren: async () => {
            return import(`./modules/participation/participation.module`).then(
                (m) => m.ParticipationModule
            );
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }