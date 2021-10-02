import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { LoggedInStatusComponent } from './components/navbar/logged-in-status/logged-in-status.component';
import { LottieHeaderComponent } from './components/lottie-header/lottie-header.component';
import { LottieModule } from 'ngx-lottie';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PromoComponent } from './components/promo/promo.component';
import { RouterModule } from '@angular/router';
import player from 'lottie-web';

const playerFactory = () => player;
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LottieHeaderComponent,
    PromoComponent,
    LoggedInStatusComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FontAwesomeModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory }),
    OverlayPanelModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LottieHeaderComponent,
    PromoComponent
  ]
})
export class SharedModule { }
