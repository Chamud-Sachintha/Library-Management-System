import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssigningComponent } from './assigning/assigning.component';
import { BookComponent } from './book/book.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"adduser",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"addbook",
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "assigning",
    component: AssigningComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "gallery",
    component: GalleryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "contact",
    component: ContactComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
