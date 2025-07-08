import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-details',
   standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent {

 constructor (public  authService : AuthService , private router: Router){}

 get isUserLoggedIn(): boolean {
  return this.authService.hasToken();
}

logout() {
  this.authService.logout();
  this.router.navigate(['/home']);
}

}
