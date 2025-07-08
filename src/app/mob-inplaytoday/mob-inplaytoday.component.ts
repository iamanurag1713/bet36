import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InPlayService } from '../services/inplay.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mob-inplaytoday',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './mob-inplaytoday.component.html',
  styleUrls: ['./mob-inplaytoday.component.css'],
})
export class MobInplaytodayComponent implements OnInit {
  todayGames: any[] = [];
  cricketGames: any[] = [];
  tennisGames: any[] = [];
  soccerGames: any[] = [];
  activeTab: string = 'cricket';

  constructor(
    private inPlayService: InPlayService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inPlayService.getTodayGames().subscribe({
      next: (games) => {
        this.todayGames = games;
        this.cricketGames = games.filter((g) => g.sportid === 1);
        this.tennisGames = games.filter((g) => g.sportid === 2);
        this.soccerGames = games.filter((g) => g.sportid === 4);
      },
      error: (err) => console.error('API error:', err),
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
