import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login/login.component';
import { ProfileComponent } from './views/profile/profile/profile.component';
import { RegisterComponent } from './views/register/register/register.component';
import { PostsContainerComponent } from './views/posts/posts-container/posts-container.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'posts', component: PostsContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

