import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeNequiComponent } from './components/nequi/home/homeNequi.component';
import { UserComponent } from './components/nequi/user/user.component';
import { FeeComponent } from './components/nequi/fee/fee.component';
import { LoanComponent } from './components/nequi/loan/loan.component';
import { SummaryComponent } from './components/nequi/summary/summary.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'nequi/home', component: HomeNequiComponent },
    { path: 'nequi/user', component: UserComponent },
    { path: 'nequi/fee', component: FeeComponent },
    { path: 'nequi/loan', component: LoanComponent },
    { path: 'nequi/summary', component: SummaryComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);