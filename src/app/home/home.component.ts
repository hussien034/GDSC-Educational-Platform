import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
