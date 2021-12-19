import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { Suspension, User } from 'src/app/shared/interfaces/interfaces';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: `app-profile-suspensions`,
  templateUrl: `./profile-suspensions.component.html`,
  styleUrls: [`./profile-suspensions.component.scss`]
})
export class ProfileSuspensionsComponent implements OnInit, DoCheck {
  @Input() currentUser: User;

  userSuspensions: Suspension[] = [];
  userId: number;

  isVisible = false;
  isLoading = false;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    await this.loadUserSuspensions();
  }

  ngDoCheck() {
    this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  async loadUserSuspensions() {
    this.isLoading = true;
    this.userSuspensions = await this.apiService.getSuspensionsFiltered(this.userId)
        .catch(() => {
          this.isLoading = false;
          return [];
        });
    this.isLoading = false;
  }
}
