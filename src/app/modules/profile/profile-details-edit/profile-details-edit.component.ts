import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SetCurrentUser } from 'src/app/state/current-user.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Component({
  selector: `app-profile-details-edit`,
  templateUrl: `./profile-details-edit.component.html`,
  styleUrls: [`./profile-details-edit.component.scss`]
})
export class ProfileDetailsEditComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  form = new FormGroup({});
  currentUser: User;

  fields: FormlyFieldConfig[] =[
    {
      key: `username`,
      type: `input`,
      templateOptions: {
        label: `Username`,
        placeholder: `Enter your username`,
        required: true,
      }
    },
    {
      key: `email`,
      type: `input`,
      templateOptions: {
        label: `E-mail address`,
        placeholder: `Enter your email`,
        required: true,
      }
    },
    {
      key: `country`,
      type: `input`,
      templateOptions: {
        label: `Country`,
        placeholder: `Enter your country`,
        required: true,
      }
    },
    {
      key: `university`,
      type: `input`,
      templateOptions: {
        label: `University`,
        placeholder: `Enter your university`
      }
    },
    {
      key: `studentId`,
      type: `input`,
      templateOptions: {
        label: `Student ID`,
        placeholder: `Enter your student ID`
      }
    },
  ];

  constructor(
    public activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select((state) => state.currentUser.currentUser)
        .subscribe((currentUser: User) => {
          this.currentUser = cloneDeep(currentUser);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  async onSubmit() {
    // TODO - inform user about success
    const response = await this.apiService.patchUser(this.currentUser);
    if (response) {
      this.store.dispatch(new SetCurrentUser(response));
    }
  }
}
