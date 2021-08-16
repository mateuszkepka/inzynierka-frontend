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
    {
        path: `log-in`,
        loadChildren: async () => {
            return import(`./modules/log-in/log-in.module`).then(
                (m) => m.LogInModule
            );
        },
    },
    {
        path: `register`,
        loadChildren: async () => {
            return import(`./modules/register/register.module`).then(
                (m) => m.RegisterModule
            );
        },
    },
    {
        path: `contact-us`,
        loadChildren: async () => {
            return import(`./modules/contact-us/contact-us.module`).then(
                (m) => m.ContactUsModule
            );
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }