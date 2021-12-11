import { Component, Input } from '@angular/core';

import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-profile-performance`,
  templateUrl: `./profile-performance.component.html`,
  styleUrls: [`./profile-performance.component.scss`]
})
export class ProfilePerformanceComponent {
  @Input() currentUser: User;
}
