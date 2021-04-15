import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  logs: string[] = [];

  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}
