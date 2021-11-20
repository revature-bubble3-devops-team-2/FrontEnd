import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { ProfileComponent } from './views/home/profile/profile.component';
import { RegisterComponent } from './views/register/register/register.component';
import { LikeComponent } from './views/home/like/like.component';
import { ModalUpdateFormComponent } from './views/home/modal-update-form/modal-update-form.component';
import { ModalButtonComponent } from './views/home/modal-button/modal-button.component';
import { CreatePostComponent } from './views/posts/create-post/create-post.component';
import { PostsContainerComponent } from './views/posts/posts-container/posts-container.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostComponent } from './views/posts/post/post.component';
import { PostFeedComponent } from './views/posts/post-feed/post-feed.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ModalUpdateFormComponent,
    ModalButtonComponent,
    RegisterComponent,
    CreatePostComponent,
    PostsContainerComponent,
    HomeComponent,
    LikeComponent,
    PostComponent,
    PostFeedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ],
  entryComponents:[
    NgbTooltipModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
