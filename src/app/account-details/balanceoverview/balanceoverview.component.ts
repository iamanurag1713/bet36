import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InPlayService } from '../../services/inplay.service';
import { UserBalanceResponse } from '../../models/login.model';
import { error } from 'console';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-balanceoverview',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './balanceoverview.component.html',
  styleUrl: './balanceoverview.component.css',
})
export class BalanceoverviewComponent implements OnInit {
  balance: string = '0.00';
  inPlayService: any;

  constructor(inPlaySerivce: InPlayService) {}
  ngOnInit(): void {
    this.inPlayService.getUserBalanceExpo().subscribe({
      next: (res: UserBalanceResponse) => {
        this.balance = res.balance || '0.00';
      },
      error: (err: any) => {
        console.error('api error', err);
      },
    });
  }
}
