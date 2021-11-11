import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'app/views/profile/profile/profile.component';
import { Routes } from '@angular/router';
import { AppRoutingRoutingModule } from './app-routing-routing.module';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent}

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingRoutingModule
  ]
})
export class AppRoutingModule { }
