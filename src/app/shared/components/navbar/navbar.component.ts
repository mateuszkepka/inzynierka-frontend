import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { faAt, faGamepad, faSitemap, faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: `app-navbar`,
  templateUrl: `./navbar.component.html`,
  styleUrls: [`./navbar.component.scss`]
})
export class NavbarComponent implements OnInit {
  @ViewChild(`mobileMenu`) mobileMenu: ElementRef<any>;

  faTrophy = faTrophy;
  faSitemap = faSitemap;
  faGamepad = faGamepad;
  faAt = faAt;

  constructor(private readonly renderer: Renderer2) { }

  ngOnInit(): void {
  }

  showMobileMenu() {
    this.mobileMenu.nativeElement.style.display = `flex`;
    this.renderer.addClass(document.body, `block-scroll`);
  }

  hideMobileMenu() {
    this.mobileMenu.nativeElement.style.display = `none`;
    this.renderer.removeClass(document.body, `block-scroll`);
  }

}
