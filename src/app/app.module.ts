import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GscComponent } from './gsc/gsc.component';
import { CoursesComponent } from './courses/courses.component';
import {NgxTypedJsModule} from 'ngx-typed-js';
import {  ReactiveFormsModule} from "@angular/forms";
import { BoodcastsComponent } from './boodcasts/boodcasts.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    GscComponent,
    CoursesComponent,
    BoodcastsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
