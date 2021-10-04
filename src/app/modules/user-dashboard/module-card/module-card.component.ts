import { Component, Input, OnInit } from '@angular/core';

import { ModuleData } from './module-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: `app-module-card`,
  templateUrl: `./module-card.component.html`,
  styleUrls: [`./module-card.component.scss`]
})
export class ModuleCardComponent {
  @Input() moduleData: ModuleData;

  constructor(private readonly router: Router) {}

  onClick(link: string) {
    void this.router.navigate([`/${link}`]);
  }
}
