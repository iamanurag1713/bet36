import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgClass] ,
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


activeTab: string = '';



 constructor(private router: Router, public auth : AuthService) {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('mob-sport')) this.activeTab = 'sports';
        else if (event.url.includes('mob-inplay')) this.activeTab = 'inPlay';
        else if (event.url.includes('mob-multiMarket')) this.activeTab = 'multiMarket';
        else if (event.url.includes('mob-login')) this.activeTab = 'account';
        else if (event.url.includes('/home')) this.activeTab = 'home';

        else this.activeTab = '';
      }
    });
  }
setActiveTab(tab: string) {
  this.activeTab = tab;
}

}
