import { InPlayService } from './../services/inplay.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserBalanceResponse } from '../models/login.model';
@Component({
  selector: 'app-loggedin-header',
  imports: [RouterLink, CommonModule],
  standalone: true,
  templateUrl: './loggedin-header.component.html',
  styleUrl: './loggedin-header.component.css',
})
export class LoggedinHeaderComponent implements OnInit {
  messages: any[] = [];
  balance: string = '0.00';
  exposure: string = '0.00';



  constructor(private inPlayService: InPlayService) {}

  ngOnInit(): void {
    this.inPlayService.getMessageData().subscribe({
      next: (messages) => {
        this.messages = messages;
            console.log('Messages:', messages);

      },
      error: (err) => {
       console.error('Message API error:', err.status, err.message || err.error || 'unknown error');
    this.messages = [];
      },
    });

    this.inPlayService.getUserBalanceExpo().subscribe({
      next: (res: UserBalanceResponse) => {
        this.balance = res.balance || '0.00';
        this.exposure = res.expo || '0.00';
      },
      error: (err) => {
        console.error('getUserBalanceExpo error', err);
      },
    });
  }



  formatMessage(msg: any): string {
  return msg.title || 'No message';
  }
}
