import { InPlayService } from './../services/inplay.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gameCounts: any = {};
  constructor(private inplayService: InPlayService) {}

  ngOnInit(): void {
    this.inplayService.getGameCounts().subscribe({
      next: (data) => {
        this.gameCounts = data;
      },
      error: (err) => {
        console.error('failed to fetch game counts', err);
      },
    });
  }
}
