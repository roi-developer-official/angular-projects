
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isLoading:boolean;
  error:string = null;
  isLoginMode : boolean;

  constructor(
    private router:Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    let title = this.router.url.substring(1, this.router.url.length);
    this.btnTitle = title === 'login'? 'התחבר' : 'הירשם'
    this.isLoginMode = title === 'login' ? true : false

    this.store.select('auth').subscribe(
      (payload)=>{
         this.error = payload.authError
      }
    )
    this.error = null;
  }

  onSubmit(f:NgForm){
    const {email, password} = f.controls;
    if(!this.isLoginMode){
      this.store.dispatch(new fromActions.SignupStart({email: email.value, password: password.value}))
    } else {
       this.store.dispatch(new fromActions.LoginStart({email:email.value, password: password.value}))
    }
    f.reset()
  }

  

}

