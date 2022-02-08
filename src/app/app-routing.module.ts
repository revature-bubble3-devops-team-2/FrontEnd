import { GroupHomeComponent } from './views/group-home/group-home.component';
import { GroupPageComponent } from './views/group-page/group-page.component';
import { PasswordResetComponent } from './views/password-reset/password-reset.component';
import { CheckEmailComponent } from './views/check-email/check-email.component';
import { ProfileviewComponent } from './views/home/profileview/profileview.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login/login.component';
import { RegisterComponent } from './views/register/register/register.component';
import { HomeComponent } from './views/home/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './views/home/profile/profile.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[LoginGuard]},
  {path: 'passwordreset', component: PasswordResetComponent},
  {path: 'email/verify/password', component: PasswordResetComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path : "profile/:id", component: ProfileComponent , canActivate:[AuthGuard],pathMatch: 'full'},
  {path : "profileview/:id", component: ProfileviewComponent, pathMatch: 'full' },
  {path: "groups/:id", component: GroupHomeComponent, pathMatch: 'full'},
  {path: 'group-page', component: GroupPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'verify/email', component: VerifyEmailComponent},
  {path: 'check-email', component: CheckEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

