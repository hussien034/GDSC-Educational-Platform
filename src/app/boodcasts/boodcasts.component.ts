import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boodcasts',
  templateUrl: './boodcasts.component.html',
  styleUrls: ['./boodcasts.component.css']
})
export class BoodcastsComponent implements OnInit {

  isLgoin:boolean=false;
  constructor(private _Router:Router) {
    let token=localStorage.getItem('token');
    if(token){
      this.isLgoin=true
    }
    else{
      this.isLgoin=false
    }
   }
  logout(){
    localStorage.removeItem('token');
    this._Router.navigateByUrl('/main')
  }

  ngOnInit(): void {
  }

}
