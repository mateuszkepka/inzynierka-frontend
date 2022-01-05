import { Component, DoCheck, ElementRef, Input, OnInit } from '@angular/core';
import { GetUserSuspensionsParams, Suspension, SuspensionStatus, User } from 'src/app/shared/interfaces/interfaces';

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

  statusOptions: { status: string; label: string }[];

  status = SuspensionStatus.PAST;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params.id);
  }

  async ngOnInit() {
    this.setStatusOptions();
    await this.loadUserSuspensions();
  }

  ngDoCheck() {
    this.isVisible = this.elementRef.nativeElement.offsetParent !== null;
  }

  async loadUserSuspensions() {
    this.isLoading = true;
    this.userSuspensions = await this.apiService.getSuspensionsFiltered({userId: this.userId, status: this.status})
        .catch(() => {
          this.isLoading = false;
          return [];
        });
    this.isLoading = false;
  }

  setStatusOptions() {
    this.statusOptions = Object.keys(SuspensionStatus).map((key) => ({
      status: SuspensionStatus[key],
      label: this.toProperCase(SuspensionStatus[key])
    }));
  }

  toProperCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  }
}
