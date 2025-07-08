import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { MobInplayComponent } from './mob-inplay/mob-inplay.component';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LoggedinHeaderComponent } from './loggedin-header/loggedin-header.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    NgIf,
    HttpClientModule,
    LoggedinHeaderComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'bet36mobile';
  isLoggedIn$: Observable<boolean>;

  constructor(public router: Router, public auth: AuthService ,  private cd: ChangeDetectorRef) {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
  }

  ngOnInit() : void  {
    this.isLoggedIn$ = this.auth.isLoggedIn$;

    this.auth.isLoggedIn$.subscribe((status) => {
    console.log('Login status changed:', status);

    this.cd.detectChanges();
    });
  }


  shouldShowFooter(): boolean {
    const hiddenFooterRoutes = ['/mob-setting'];
    return !hiddenFooterRoutes.includes(this.router.url);
  }

  shouldShowHeader(): boolean {
    const hiddenHeaderRoutes = ['/mob-login'];
    return !hiddenHeaderRoutes.includes(this.router.url);
  }

   hideFooterOnRoutes(): boolean {
    const hiddenRoutes = ['/mob-login'];
    return hiddenRoutes.includes(this.router.url);
  }
}
