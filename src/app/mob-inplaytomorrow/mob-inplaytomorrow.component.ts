import { CommonModule } from '@angular/common';
import { InPlayService } from './../services/inplay.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mob-inplaytomorrow',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mob-inplaytomorrow.component.html',
  styleUrl: './mob-inplaytomorrow.component.css',
})
export class MobInplaytomorrowComponent implements OnInit {
  tomorrowGames: any[] = [];
  cricketGames: any[] = [];
  soccerGames: any[] = [];
  tennisGames: any[] = [];
  activeTab: string = 'cricket';

  constructor(
    private inplayService: InPlayService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inplayService.getTomorrowGames().subscribe({
      next: (games) => {
        this.tomorrowGames = games;
        this.cricketGames = games.filter((g) => g.sportid === 4);
        this.soccerGames = games.filter((g) => g.sportid === 1);
        this.tennisGames = games.filter((g) => g.sportid === 2);
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
