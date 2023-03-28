import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GscComponent } from './gsc/gsc.component';
import { CoursesComponent } from './courses/courses.component';
import { AuthGuard } from './auth.guard';
import { BoodcastsComponent } from './boodcasts/boodcasts.component';
const routes: Routes = [
  {path:'',redirectTo:'main',pathMatch:'full'},
  {path:"main", component:MainComponent},
  {path:"register",component:RegisterComponent},
  {path:"login" ,component:LoginComponent},
  {path:"boodcasts",component:BoodcastsComponent},
  {path:"home",component:HomeComponent ,canActivate:[AuthGuard]},
  {path:"gsc",component:GscComponent ,canActivate:[AuthGuard]},
  {path:"courses",component:CoursesComponent ,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
