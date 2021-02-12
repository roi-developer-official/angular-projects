
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as fromActions from '../store/auth.actions'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{
  btnTitle:string;
  loading:boolean;
  error:string = null;
  emailError:string;
  nameError:string;
  passwordError:string;
  isLoginMode : boolean;
  form:FormGroup;

  constructor(
    private router:Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {

    let title = this.router.url.substring(1, this.router.url.length);
    this.btnTitle = title === 'login'? 'התחבר' : 'הירשם'
    this.isLoginMode = title === 'login' ? true : false


    if(this.isLoginMode)
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email,Validators.required]),
      password: new FormControl(null, Validators.required)
    })
    else{
      this.form = new FormGroup({
        email: new FormControl(null, [Validators.email,Validators.required]),
        name: new FormControl(null, Validators.required),
        password: new FormControl(null,[Validators.minLength(5), Validators.required])
      })
    }
    this.store.select('auth').subscribe(
      (payload)=>{
         this.error = payload.authError;
         this.loading = payload.loading
         if(!this.error && !this.loading){
           this.form.reset();
         }
       
      }
    )
    this.error = null;
  }

  onSubmit(){
    const {email, password,name} = this.form.controls;
    if(this.checkForErrors(email,password,name)){
        if(!this.isLoginMode){
          this.store.dispatch(new fromActions.SignupStart({email: email.value, password: password.value,name:name.value}))
        } else {
            this.store.dispatch(new fromActions.LoginStart({email:email.value, password: password.value}))
        }
    }

  }

  checkForErrors(email, password,name){

    let isError = false;
    if(email.errors){
      isError = true;
      this.emailError = 'כתובת מייל לא תקינה'
    }
    if(password.errors){
     
      isError = true;
      if(password.errors.required){
        this.passwordError = 'שדה זה הינו שדה חובה'
      } 
      else if(password.errors.minlength){
        this.passwordError = 'סיסמא קצרה מדי'
      }
    }
    if(name && name.errors){
      isError = true;
      this.nameError = 'שדה זה הינו שדה חובה'
    }

    if(isError){
      return false;
    }
    return true;

  }

  

}

