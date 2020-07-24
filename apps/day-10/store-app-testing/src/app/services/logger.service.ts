import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: any) {
    console.log('LoggerService.log():', message);
  }
}
