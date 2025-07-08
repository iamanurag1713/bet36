import { InPlayService } from './../../services/inplay.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
@Component({
  selector: 'app-activity-logs',
  standalone: true,
  imports: [RouterLink,NgClass, CommonModule],
  templateUrl: './activity-logs.component.html',
  styleUrl: './activity-logs.component.css'
})
export class ActivityLogsComponent implements OnInit {
logs: any[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private inPlayService : InPlayService){}
  ngOnInit(): void {
       this.fetchLogs(this.currentPage);

    }

 fetchLogs(page: number): void {
    this.inPlayService.getAccountLogs(page).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.logs = res.data;
          this.currentPage = res.currentPage;
          this.totalPages = res.totalPages;
        }
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
 }

 nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.fetchLogs(this.currentPage + 1);
    }
  }

   prevPage(): void {
    if (this.currentPage > 1) {
      this.fetchLogs(this.currentPage - 1);
    }
  }
}
