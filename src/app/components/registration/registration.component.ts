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

  registerForm : any;

  constructor(private fb:FormBuilder, private router:Router, private logger:LoggerService) { }

  ngOnInit(): void {
   this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['']
    });
  }

  onSubmit() {
    this.logger.log(this.registerForm.value);
    this.router.navigate(['login']);
  }
}
