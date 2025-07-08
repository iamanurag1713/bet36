import { Component, OnInit } from '@angular/core';
// import { NgIf } from '@angular/common';
import { InPlayService } from '../services/inplay.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FancySocketService } from '../services/socket.service';
@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent implements OnInit {
  activeTab: 'fancy' | 'premium' = 'fancy';
  matchData: any;
  tossMarket: any;
  eventId = '';
  team1: string = '';
  team2: string = '';
  selectedEventId: string | undefined;
  isLoggedIn = false;
  matches: any[] = [];
  games: any[] = [];

  setTab(tab: 'fancy' | 'premium') {
    this.activeTab = tab;
  }

  constructor(
    private inPlayService: InPlayService,
    private route: ActivatedRoute,
    private fancySocket: FancySocketService
  ) {}
  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventid') || '';
    const sportId = this.route.snapshot.paramMap.get('sportId') || '';

    if (this.eventId) {
      this.loadEventData(this.eventId);
    }

    this.inPlayService.getGameBySport(sportId).subscribe((games) => {
      this.matches = games;

      for (const game of games) {
        const eventId = game.eventid;
        this.fancySocket.subscribeFancy(eventId);
        this.fancySocket.listenFancy(eventId).subscribe((data) => {
          console.log(`Odds for ${eventId}:`, data);
        
          const index = this.matches.findIndex((g) => g.eventid === eventId);
          if (index !== -1) {
            this.matches[index].fancy = data;
          }
        });
      }
    });
  }

  loadEventData(eventid: string) {
    this.inPlayService.getEventDataOnLoad(eventid).subscribe((res) => {
      this.team1 = res.team1;
      this.team2 = res.team2;
    });
  }

  fetchTimelineData(eventid: string) {
    this.inPlayService.getMatchTimelineDelta(eventid).subscribe({
      next: (res) => {
        const markets = res?.doc?.[0]?.data?.bookmaker?.markets;
        if (Array.isArray(markets)) {
          this.tossMarket = markets.find((m) =>
            m.name?.toLowerCase()?.includes('toss')
          );
        }
      },
      error: (err) => {
        console.error('Timeline API error', err);
      },
    });
  }
}
