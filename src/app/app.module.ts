import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { ProfileComponent } from './views/profile/profile/profile.component';
import { RegisterComponent } from './views/register/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUpdateFormComponent } from './views/profile/modal-update-form/modal-update-form.component';
import { ModalButtonComponent } from './views/profile/modal-button/modal-button.component';
import { CreatePostComponent } from './views/profile/posts/create-post/create-post.component';
import { PostsContainerComponent } from './views/profile/posts/posts-container/posts-container.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
    PostsContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents:[
    NgbTooltipModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
