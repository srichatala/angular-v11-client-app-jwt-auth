import { AuthToken } from 'src/app/models/AuthToken';
import { AuthService } from './../../services/auth/auth.service';
import { LoggerService } from './../../services/logger/logger.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authToken!: AuthToken;

  loginGroup:any;
  constructor(private fb:FormBuilder,
     private router:Router,
     private logger:LoggerService,
     private authService:AuthService) { }

  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      userName:['', Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    this.logger.log(this.loginGroup.value);
    this.authService.login(this.loginGroup.value).subscribe(data=>
      {
        if(data != null){
          this.authToken = {
            userName : data.userName,
            accessToken : data.accessToken,
            refreshToken : data.refreshToken
          };
          this.logger.log(JSON.stringify(this.authToken));
          this.router.navigate(['products']);
        }
    },
    _error =>this.logger.log("Something wrong, please try again"));
  }
}
