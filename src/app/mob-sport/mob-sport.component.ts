import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InPlayService } from '../services/inplay.service';


@Component({
  selector: 'app-mob-sport',
  imports: [RouterLink, NgIf, CommonModule],
  standalone: true,
  templateUrl: './mob-sport.component.html',
  styleUrl: './mob-sport.component.css',
})
export class MobSportComponent {
  selectedView: 'time' | 'competition' = 'time';
  activeTab: string = 'cricket';
  games: any[] = [];
  gameCounts: any = {};
  sportName = '';

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private router: Router,
    private inplayService: InPlayService
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      const game = params['game'] || 'cricket';
      this.setView('time');
      this.setActive(game);
    });


    this.inplayService.getGameCounts().subscribe({
      next: (data) => (this.gameCounts = data),
      error: (err) => console.error('failed to fetch game counts', err),
    });
  }

  setView(view: 'time' | 'competition') {
    this.selectedView = view;

  }

  setActive(tab: string) {
    this.activeTab = tab;
    this.sportName = tab;
    this.loadGameData(tab);
  }

  loadGameData(game: string) {
    const sportId = this.mapGameToSportId(game);
    this.inplayService.getGameBySport(sportId).subscribe((res) => {
      this.games = res || [];
    });
  }

  mapGameToSportId(game: string): string {
    switch (game) {
      case 'cricket':
        return '4';
      case 'soccer':
        return '1';
      case 'tennis':
        return '2';
      default:
        return '0';
    }
  }

  isInPlay(opendate: string): boolean {
    const start = new Date(opendate).getTime();
    const now = Date.now();
    return now >= start;
  }

  handleResultClick() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/myAccount/checkresults']);
    } else {
      this.router.navigate(['/mob-login']);
    }
  }
}
