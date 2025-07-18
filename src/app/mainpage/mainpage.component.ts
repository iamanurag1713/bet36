import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { InPlayService } from '../services/inplay.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FancySocketService } from '../services/socket.service';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent implements OnInit, OnDestroy {
  activeTab: 'fancy' | 'premium' = 'fancy';
  eventId = '';
  sportId = '';
  team1 = '';
  team2 = '';
  iframeSrc = '';
  sportName: string = 'Cricket';
  matches: any[] = [];
  tossMarket: any;
  isLoggedIn = false;

  private socketSub: Subscription | null = null;

  constructor(
    private inPlayService: InPlayService,
    private route: ActivatedRoute,
    private fancySocket: FancySocketService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('eventid') || '';
      this.sportId = params.get('sportId') || '';

      console.log('🟡 Event ID:', this.eventId, 'Sport ID:', this.sportId);

      if (!this.eventId || this.eventId === 'undefined') {
        console.error('🚫 Invalid or missing event ID, skipping socket setup.');
        return;
      }

      this.sportName = this.getSportNameById(this.sportId);
      this.buildIframeSrc();
      this.fetchMatchAndSubscribe(this.eventId);
    });
  }

  getSportNameById(id: string): string {
    const map: { [key: string]: string } = {
      '4': 'Cricket',
      '1': 'Soccer',
      '2': 'Tennis',
    };
    return map[id] || 'Unknown';
  }


  buildIframeSrc() {
    const version = Math.floor(Math.random() * 10000);
    this.iframeSrc = `https://score1.365cric.com/#/score1/${this.eventId}?v=${version}`;
  }

  fetchMatchAndSubscribe(eventId: string) {
    if (this.socketSub) {
      this.socketSub.unsubscribe();
      this.socketSub = null;
    }
    this.fancySocket.disconnect(); // Disconnect old socket

    this.inPlayService.getEventDataOnLoad(eventId).subscribe({
      next: (game) => {
        if (!game) {
          console.warn('⚠️ No match data from API');
          return;
        }

        this.team1 =
          game.team1 || game.matchname?.split('vs')[0]?.trim() || 'Team 1';
        this.team2 =
          game.team2 || game.matchname?.split('vs')[1]?.trim() || 'Team 2';

        this.matches = [
          {
            ...game,
            eventid: eventId,
            team1: this.team1,
            team2: this.team2,
            fancy: {
              backPrice: '0',
              backStake: '0',
              layPrice: '0',
              layStake: '0',
            },
          },
        ];

        console.log('✅ Loaded match:', this.matches[0]);


        this.fancySocket.connect(this.eventId, [
          'Fancy/Auto',
          'BookM/Auto',
          'Event/Auto',
          'MEvent/Auto',
        ]);

        this.socketSub = this.fancySocket.getData$().subscribe((packet) => {
          if (!packet || !packet.data) return;
          if (packet.event.includes('Fancy/Auto')) {
            console.log(`📡 Fancy data for ${eventId}:`, packet.data);
            this.zone.run(() => {
              this.matches[0].fancy = {
                backPrice: packet.data.back || '0',
                backStake: packet.data.backSize || '0',
                layPrice: packet.data.lay || '0',
                layStake: packet.data.laySize || '0',
              };
            });
          }
        });
      },
      error: (err) => {
        console.error('❌ Error fetching  match data:', err);
      },
    });
  }

  setTab(tab: 'fancy' | 'premium') {
    this.activeTab = tab;
  }

  ngOnDestroy(): void {
    this.fancySocket.disconnect();
    if (this.socketSub) this.socketSub.unsubscribe();
  }
}
