import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registaration:FormGroup=new FormGroup(
    {
      'first_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
      'last_name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
      'email':new FormControl(null,[Validators.required,Validators.required]),
      'password':new FormControl(null,[Validators.required])
    }
  )
  subRegister(){
    this._AuthService.signup(this.registaration.value).subscribe((response)=>{
      if(response.message=="success"){
        this._Router.navigateByUrl('/login')
      }
      else{
        alert("You're Alerady Register");
        this._Router.navigateByUrl('/login')
      }
    })
  }
    constructor(private _AuthService:AuthService , private _Router:Router) {

     }

    ngOnInit(): void {
    }

  }
