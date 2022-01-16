import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/interfaces';
import { cloneDeep } from 'lodash';

@Directive({
  selector: `[appRequiredRole]`
})
export class RequiredRoleDirective implements OnDestroy {

  currentUser: User;
  sub: Subscription;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly store: Store,
  ) {
    this.sub = this.store
      .select((state) => state.currentUser.currentUser)
      .subscribe((currentUser: User) => {
        this.currentUser = cloneDeep(currentUser);
      });
  }

  @Input() set appRequiredRole(role: string) {
    const result = this.currentUser.roles.includes(role);

    if (result) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.viewContainer.clear();
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
