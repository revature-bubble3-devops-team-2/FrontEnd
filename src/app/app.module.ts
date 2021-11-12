import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login/login.component';
import { ProfileComponent } from './views/profile/profile/profile.component';
import { RegisterComponent } from './views/register/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUpdateFormComponent } from './views/profile/modal-update-form/modal-update-form.component';
import { ModalButtonComponent } from './views/profile/modal-button/modal-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ModalUpdateFormComponent,
    ModalButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
