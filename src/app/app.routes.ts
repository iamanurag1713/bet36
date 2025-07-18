import { MobInplayComponent } from './mob-inplay/mob-inplay.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MobInplaytodayComponent } from './mob-inplaytoday/mob-inplaytoday.component';
import { MobInplaytomorrowComponent } from './mob-inplaytomorrow/mob-inplaytomorrow.component';
import { MobSportComponent } from './mob-sport/mob-sport.component';
import { MobLoginComponent } from './mob-login/mob-login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MultimarketComponent } from './multimarket/multimarket.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MyprofileComponent } from './account-details/myprofile/myprofile.component';
import { ActivityLogsComponent } from './account-details/activity-logs/activity-logs.component';
import { BalanceoverviewComponent } from './account-details/balanceoverview/balanceoverview.component';
import { BetsHistoryComponent } from './account-details/bets-history/bets-history.component';
import { MyBetsComponent } from './account-details/my-bets/my-bets.component';
import { ProfitLossComponent } from './account-details/profit-loss/profit-loss.component';
import { ResultsComponent } from './account-details/results/results.component';
import { MobSettingComponent } from './mob-setting/mob-setting.component';
import { SportwiseresultComponent } from './sportwiseresult/sportwiseresult.component';

export const routes: Routes = [
   { path: '', redirectTo: 'mob-login' , pathMatch : 'full' },
  {path : 'home' , component: HomeComponent},
  {path : 'mob-inplay' , component: MobInplayComponent},
  {path :'mob-inplay/today' , component: MobInplaytodayComponent},
  {path : 'mob-inplay/tomorrow' , component: MobInplaytomorrowComponent},
  {path : 'mob-sport' , component: MobSportComponent},
  {path : 'mob-login' , component: MobLoginComponent},
  {path : 'match/:sportId/:eventid' , component : MainpageComponent},
  {path : 'mob-multiMarket' , component: MultimarketComponent},
  {path: 'mob-myProfile' , component: AccountDetailsComponent},
  {path: 'myAccount/my-profile', component: MyprofileComponent},
  {path: 'myAccount/balance-overview', component: BalanceoverviewComponent},
  {path: 'myAccount/account-statement', component: AccountDetailsComponent},
  {path: 'myAccount/mybet', component: MyBetsComponent},
  {path: 'myAccount/bet-history/Odds', component: BetsHistoryComponent},
  {path: 'myAccount/profit-loss/Odds', component: ProfitLossComponent},
  {path: 'myAccount/checkresults', component: ResultsComponent},
  {path: 'myAccount/activity-log', component: ActivityLogsComponent},
  {path : 'mob-setting' , component: MobSettingComponent},
  {path: 'Mchecksportwiseresult', component: SportwiseresultComponent}


];
