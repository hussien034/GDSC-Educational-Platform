import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  isLgoin:boolean=false;
  constructor(private _Router:Router, private authService: AuthService) {
    this.isLgoin = this.authService.isAuthenticated();
  }
  logout(){
    this.authService.logout();
    this._Router.navigateByUrl('/main')
  }

  ngOnInit(): void {
  }

}
