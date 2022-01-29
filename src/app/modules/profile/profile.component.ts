import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProfileReportModalComponent } from './profile-report-modal/profile-report-modal.component';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: `app-profile`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.scss`],
  providers: [DialogService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentlyLoggedUser: User;
  currentUser: User;
  subscriptions: Subscription[] = [];
  activeTab: number;
  currentUserId: number;

  routerComponents: {
    [name: string]: any;
  } = {};

  routerEditModes: {
      [name: string]: boolean;
  } = {};

  avatarToShow: any;
  backgroundToShow: any;
  isAvatarLoading = false;
  isBackgroundLoading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly notificationsService: NotificationsService,
    public dialogService: DialogService,
  ) {
    this.activeTab = this.router.getCurrentNavigation().extras.state?.activeTab || 0;
    this.currentUserId = Number(this.route.snapshot.params.id);
  }

  async ngOnInit() {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe(
          async (currentUser: User) => {
            if (currentUser) {
              this.currentlyLoggedUser = currentUser;
                if (currentUser.userId === this.currentUserId) {
                  this.currentUser = currentUser;
                  await this.getImages();
                  return;
                }
                await this.getCurrentUser();
                await this.getImages();
              }
            }
        ),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async getCurrentUser() {
    this.currentUser = await this.apiService
      .getUserById(this.currentUserId)
      .catch((err) => {
        this.notificationsService.addNotification({
          severity: `error`,
          summary: `${err.error.message}`,
          detail: `Error`
        });
        return null;
        void this.router.navigate([`/`]);
      });
  }

  getImages() {
    this.getAvatar();
    this.getBackground();
  }

  getAvatar() {
    this.isAvatarLoading = true;
    this.apiService
      .getUploadedAvatar(this.currentUser.profilePicture)
      .subscribe(data => {
        this.createImageFromBlob(data, `avatarToShow`);
        this.isAvatarLoading = false;
      },
      () =>{
        this.isAvatarLoading = false;
      });
  }

  getBackground() {
    this.isBackgroundLoading = true;
    this.apiService
      .getUploadedBackground(this.currentUser.backgroundPicture)
      .subscribe(data => {
        this.createImageFromBlob(data, `backgroundToShow`);
        this.isBackgroundLoading = false;
      },
      () => {
        this.isBackgroundLoading = false;
      });
  }

  createImageFromBlob(image: Blob, field: string) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
       this[field] = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 }

  readRouterOutlet(name: string, event: any) {
    const childRouteConfig = event.activatedRoute?.snapshot.routeConfig;
    this.routerComponents[name] = event;
    this.routerEditModes[name] = childRouteConfig.path !== ``;
    this.changeDetectorRef.detectChanges();
  }

  showModal() {
    const ref = this.dialogService.open(ProfileReportModalComponent, { header: `Report player`});

    this.subscriptions.push(
      ref.onClose.subscribe(async (reportReason: string) => {
        if (reportReason) {
          await this.sendReport(reportReason);
        }
      })
    );
  }

  async sendReport(reportReason: string) {
    const res = await this.apiService
      .createReport(this.currentUserId, reportReason)
      .catch((err) => {
        let severity: `error`;
        const errSummary = `Error!`;
        const errDetail = `${err.error.message}`;
        this.notificationsService.addNotification({
          severity,
          summary: errSummary,
          detail: errDetail
        });
      });

    const summary = `Success!`;
    const detail = `Report has been sent`;

    this.notificationsService.addNotification({
      severity: `success`,
      summary,
      detail
    });
  }

  onTabChange() {
    window.scroll(0,0);
  }
}
