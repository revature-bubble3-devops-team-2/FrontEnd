import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { ProfileComponent } from './views/profile/profile/profile.component';
import { RegisterComponent } from './views/register/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostComponent } from './views/posts/create-post/create-post.component';
import { PostComponent } from './views/posts/post/post.component';
import { PostsContainerComponent } from './views/posts/posts-container/posts-container.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    CreatePostComponent,
    PostComponent,
    PostsContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  entryComponents:[
    PostComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
