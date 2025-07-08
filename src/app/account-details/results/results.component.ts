import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InPlayService } from '../../services/inplay.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit {
  isReadonly = true;
  startDate: string = '';
  endDate: string = '';
  results: any[] = [];
  errorMsg = '';
  sportId: number | undefined;

  constructor(private inPlayService: InPlayService) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
     const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  this.startDate = this.formatDate(twoDaysAgo);
  this.endDate = this.formatDate(today);

  this.sportId = 4; // default to Cricket
  this.fetchResults(this.sportId); // load default cricket results
  }

  fetchResults(sportId: number) {
    if (!this.startDate || !this.endDate) {
      this.errorMsg = 'Please select both start and end dates.';
      return;
    }

    this.inPlayService
      .getResults(this.startDate, this.endDate, sportId)
      .subscribe({
        next: (res) => {


          if (res?.type === 'error') {
            this.results = [];
            this.errorMsg = res.message || 'Failed to fetch results.';
            return;
          }

          if (Array.isArray(res)) {
            this.results = res;
            this.errorMsg = '';
          } else {
            this.results = [];
            this.errorMsg = 'Unexpected response format.';
          }
        },
        error: (err) => {
          this.results = [];
          this.errorMsg = 'Failed to load results.';

        },
      });
  }
  getSportName(sportId: number): string {
    switch (sportId) {
      case 1:
        return 'Soccer';
      case 2:
        return 'Tennis';
      case 4:
        return 'Cricket';
      case 9:
        return 'Virtual T10';
      default:
        return 'Unknown';
    }
  }
  formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

}
