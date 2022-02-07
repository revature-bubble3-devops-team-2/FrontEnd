import { GroupHomeComponent } from './views/group-home/group-home.component';
import { TeamsPageComponent } from './views/teams-page/teams-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login/login.component';
import { RegisterComponent } from './views/register/register/register.component';
import { HomeComponent } from './views/home/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './views/home/profile/profile.component';
import { ProfileviewComponent } from './views/home/profileview/profileview.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path : "profile/:id", component: ProfileComponent},
  {path : "profileview/:id", component: ProfileviewComponent},
  {path: "group/:id", component: GroupHomeComponent},
  {path: 'teams-page', component: TeamsPageComponent},
  {path: 'verify/email', component: VerifyEmailComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

