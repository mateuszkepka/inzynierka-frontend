import { Component, Input } from '@angular/core';

import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-profile-suspensions`,
  templateUrl: `./profile-suspensions.component.html`,
  styleUrls: [`./profile-suspensions.component.scss`]
})
export class ProfileSuspensionsComponent {
  @Input() currentUser: User;
}
