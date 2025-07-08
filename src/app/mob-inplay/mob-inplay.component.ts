import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InPlayService } from '../services/inplay.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mob-inplay',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mob-inplay.component.html',
  styleUrls: ['./mob-inplay.component.css'],
})
export class MobInplayComponent implements OnInit {
  inPlayGames: any[] = [];
  cricketGames: any[] = [];
  soccerGames: any[] = [];
  tennisGames: any[] = [];
  activeTab: string = 'cricket';

  constructor(
    private inPlayService: InPlayService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inPlayService.getInPlayGames().subscribe({
      next: (data) => {
        this.inPlayGames = data;
        this.cricketGames = data.filter((g) => g.sportid === 1);
        this.soccerGames = data.filter((g) => g.sportid === 3);
        this.tennisGames = data.filter((g) => g.sportid === 2);
      },
      error: (err) => {
        console.error('API error', err);
      },
    });
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }
  handleResultClick() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/myAccount/checkresults']);
    } else {
      this.router.navigate(['/mob-login']);
    }
  }
}
