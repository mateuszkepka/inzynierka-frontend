import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileDetailsEditComponent } from './profile-details-edit/profile-details-edit.component';

const routes: Routes = [
    {
        path: `profile`,
        component: ProfileComponent,
        children: [
            {
                path: ``,
                component: ProfileDetailsComponent,
                outlet: `profileDetails`
            },
            {
                path: `edit`,
                component: ProfileDetailsEditComponent,
                outlet: `profileDetails`
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule { }
