import { Component } from '@angular/core';
import { RouterLink , Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink , NgIf],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    constructor(public auth: AuthService , private router : Router) {}

    logout() {
    this.auth.logout();
    this.router.navigate(['/mob-login']);
  }

}
