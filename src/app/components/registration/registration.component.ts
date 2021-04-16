import { AuthToken } from 'src/app/models/AuthToken';
import { AuthService } from './../../services/auth/auth.service';
import { LoggerService } from './../../services/logger/logger.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  registerGroup : any;

  authToken !:AuthToken;

  constructor(private fb:FormBuilder,
    private router:Router,
    private logger:LoggerService,
    private authService:AuthService) { }

  ngOnInit(): void {
   this.registerGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['']
    });
  }

  onSubmit() {
    this.logger.log(this.registerGroup.value);
    this.authService.registration(this.registerGroup.value).subscribe(data=>
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
