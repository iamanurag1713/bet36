import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InPlayService } from '../services/inplay.service';
import { SortCompetitionsByTimePipe } from '../pipes/sort-competitions-by-time.pipe';
import { formatDate } from '@angular/common'; // optional if you want custom formatting

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
  const gameTime = new Date(opendate).getTime();
  const now = new Date().getTime();
   console.log('Now:', new Date(now).toISOString());
  console.log('Game:', new Date(gameTime).toISOString());

  return now >= gameTime;
}
// isInPlay(opendate: string): boolean {
//   return new Date().getTime() >= new Date(opendate).getTime();
// }
formatTo12Hour(opendate: string): string {
  const date = new Date(opendate);

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

  handleResultClick() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/myAccount/checkresults']);
    } else {
      this.router.navigate(['/mob-login']);
    }
  }


getDisplayTime(opendate: string): string {
  const now = new Date();
  const gameDate = new Date(opendate);

  const nowTime = now.getTime();
  const gameTime = gameDate.getTime();

  // Match is in the past or now
  if (nowTime >= gameTime) {
    return 'In-Play';
  }

  // Format time in 12-hour format
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const timeStr = gameDate.toLocaleTimeString('en-US', timeOptions);

  // End of today
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const endOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59, 999);

  if (gameTime <= endOfToday.getTime()) {
    return timeStr;
  }

  if (gameTime <= endOfTomorrow.getTime()) {
    return `Tomorrow ${timeStr}`;
  }

   const dateStr = gameDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });

  return `${dateStr}, ${timeStr}`;
}


}
