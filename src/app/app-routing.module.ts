import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { FormBlogComponent } from './form-blog/form-blog.component';

import { AuthGuardGuard } from './_guard/auth-guard.guard';

const routes: Routes = [
  { 
    path: 'blog', 
    component: BlogComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: 'blog/:id', component: FormBlogComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'blog', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
