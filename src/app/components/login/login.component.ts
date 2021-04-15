import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup:any;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      userName:['', Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    console.warn(this.loginGroup.value);
  }
}
