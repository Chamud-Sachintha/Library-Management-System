import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthServiceService } from './services/auth-service.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { AssigningComponent } from './assigning/assigning.component';
import { AssignBookComponent } from './assign-book/assign-book.component';
import { UserServiceService } from './services/user-service.service';
import { BookServiceService } from './services/book-service.service';
import { MasterService } from './services/master.service';
import { IntroComponent } from './intro/intro.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioCorouselComponent } from './portfolio-corousel/portfolio-corousel.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    AdminHeaderComponent,
    UserComponent,
    HomeComponent,
    BookComponent,
    BookRegisterComponent,
    AssigningComponent,
    AssignBookComponent,
    IntroComponent,
    GalleryComponent,
    ContactComponent,
    PortfolioCorouselComponent,
    ContactFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [AuthServiceService,UserServiceService,BookServiceService,MasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
