import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData:FormGroup=new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required]),
  })

  constructor(private _AuthService:AuthService, private _Router:Router) { }
  sendData(){
    this._AuthService.signin(this.loginData.value).subscribe((response)=>{
      if(response.message=="success"){
        localStorage.setItem('token',response.token
        )
        this._Router.navigateByUrl('/home')
      }
      else{
        alert(response.message)
      }
    })
  }
  ngOnInit(): void {
  }

}

