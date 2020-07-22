import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class AppValidators {
  static isEmailTakenSync(control: AbstractControl): ValidationErrors | null {
    // logic for checking duplicate email
    if (control.value === 'naveen@abc.com') {
      return {
        isEmailTaken: true
      }
    }
    return null;
  }

  static isEmailTakenAsync(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // call authService.checkDuplicateEmail(control.value);
    // return this.http.get('rest-api-url');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'naveen@abc.com') {
          resolve({
            isEmailTaken: true
          })
        } else {
          resolve(null);
        }
      }, 5000);
    });
  }
}