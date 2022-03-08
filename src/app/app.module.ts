import { ProfileHeaderComponent } from './views/home/profile-header/profile-header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './views/home/home/home.component';

import { RouterModule } from '@angular/router';
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

import { FollowComponent } from './views/home/follow/follow.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostComponent } from './views/posts/post/post.component';
import { PostFeedComponent } from './views/posts/post-feed/post-feed.component';
import { InterceptorService } from './helper/interceptor.service';

import { CreateCommentComponent } from './views/posts/create-comment/create-comment.component';
import { GroupPageComponent } from './views/group-page/group-page.component';
import { SearchComponent } from './views/search/search.component';
import { ProfileviewComponent } from './views/home/profileview/profileview.component';
import { GroupHomeComponent } from './views/group-home/group-home.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { PasswordResetComponent } from './views/password-reset/password-reset.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';
import { FollowingListComponent } from './views/home/following-list/following-list.component';
import { CheckEmailComponent } from './views/check-email/check-email.component';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupHeaderComponent } from './views/group-header/group-header.component';
import { CreateGroupPostComponent } from './views/create-group-post/create-group-post.component';
import { YoutubeVideoComponent } from './views/posts/youtube-video/youtube-video.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CreatePostComponent,
    HomeComponent,
    PostComponent,
    PostsContainerComponent,
    RegisterComponent,
    ModalUpdateFormComponent,
    ModalButtonComponent,
    CreateCommentComponent,
    FollowComponent,
    LikeComponent,
    PostFeedComponent,
    GroupPageComponent,
    SearchComponent,
    ProfileviewComponent,
    GroupHomeComponent,
    NavbarComponent,
    FollowingListComponent,
    ProfileHeaderComponent,
    PasswordResetComponent,
    VerifyEmailComponent,
    CheckEmailComponent,
    GroupHeaderComponent,
    CreateGroupPostComponent,
    YoutubeVideoComponent
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
    InfiniteScrollModule,
    RouterModule,
    YouTubePlayerModule
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }, HomeComponent,NgbActiveModal],
  entryComponents:[
    PostComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbTooltipModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
