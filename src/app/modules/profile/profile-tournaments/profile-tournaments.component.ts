import { Component, Input } from '@angular/core';

import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-profile-tournaments`,
  templateUrl: `./profile-tournaments.component.html`,
  styleUrls: [`./profile-tournaments.component.scss`]
})
export class ProfileTournamentsComponent {
  @Input() currentUser: User;
}
