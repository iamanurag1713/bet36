import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InPlayService } from '../services/inplay.service';
import { SortCompetitionsByTimePipe } from '../pipes/sort-competitions-by-time.pipe';

@Component({
  selector: 'app-mob-sport',
  imports: [RouterLink, NgIf, CommonModule ,SortCompetitionsByTimePipe],
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
  sportId: string = '';
  groupedGames: { [key: string]: any[] } = {};

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

    this.groupGamesByCompetition();
  }

  groupGamesByCompetition() {
    this.groupedGames = this.games.reduce(
      (acc: { [key: string]: any[] }, game: any) => {
        const key = game.seriesname || 'Others';
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(game);
        return acc;
      },
      {}
    );

     Object.keys(this.groupedGames).forEach((key) => {
    this.groupedGames[key].sort((a, b) => {
      const aInPlay = this.isInPlay(a.opendate);
      const bInPlay = this.isInPlay(b.opendate);

      if (aInPlay !== bInPlay) {
        return aInPlay ? -1 : 1; // in-play first
      }

      return new Date(a.opendate).getTime() - new Date(b.opendate).getTime();
    });
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
    this.games = (res || []).map((g: any) => ({
      ...g,
      sportId,
    }));
    this.groupGamesByCompetition(); // ✅ Group after games are loaded
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
