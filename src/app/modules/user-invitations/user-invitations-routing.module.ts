import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { UserInvitationsComponent } from "./user-invitations.component";

const routes: Routes = [
    {
        path: ``,
        component: UserInvitationsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserInvitationsRoutingModule {}
