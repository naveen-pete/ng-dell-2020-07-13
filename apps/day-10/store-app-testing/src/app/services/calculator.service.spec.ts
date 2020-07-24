import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let loggerSpy: any;

  // setup - beforeEach(), beforeAll()
  beforeEach(() => {
    // arrange - preparation (step 1)
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });

    service = TestBed.get(CalculatorService);
  });

  // tear down - afterEach(), afterAll()

  it('should add 2 numbers and return result', () => {
    // act - execute (step 2)
    const result = service.add(1, 2);

    // assert - verification (step 3)
    expect(result).toBe(3);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract second number from first number and return result', () => {
    // act - execute (step 2)
    const result = service.subtract(5, 2);

    // assert - verification (step 3)
    expect(result).toBe(3, 'Incorrect result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});