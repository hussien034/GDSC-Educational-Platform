import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

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
