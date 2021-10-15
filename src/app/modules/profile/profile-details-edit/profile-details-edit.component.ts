import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: `app-profile-details-edit`,
  templateUrl: `./profile-details-edit.component.html`,
  styleUrls: [`./profile-details-edit.component.scss`]
})
export class ProfileDetailsEditComponent implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
