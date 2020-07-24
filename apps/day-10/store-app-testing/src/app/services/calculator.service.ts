import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor(private logger: LoggerService) { }

  add(a: number, b: number): number {
    this.logger.log(`CalculatorService.add(): a = ${a}, b = ${b}`);
    return a + b;
  }

  subtract(a: number, b: number): number {
    this.logger.log(`CalculatorService.subtract(): a = ${a}, b = ${b}`);
    return a - b;
  }
}

