import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Service providing regex validation for form controls.
 */
@Injectable({
  providedIn: 'root'
})
export class RegexService {
/** Regular expression pattern for email validation */
private emailPattern: string = '^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$';

/** Regular expression pattern for username validation */
private usernamePattern: string = '^[a-z0-9]+$';

/** Regular expression pattern for password validation */
private passwordPattern: string = '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,25}$';


  /** Constructor */
  constructor() { }

  /**
   * Validates email format using regex pattern.
   * @param control The form control to validate
   * @returns ValidationErrors if invalid, null if valid
   */
  emailRegex(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp(this.emailPattern);
    const valid = regex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  /**
   * Validates username format using regex pattern.
   * @param control The form control to validate
   * @returns ValidationErrors if invalid, null if valid
   */
  usernameRegex(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp(this.usernamePattern);
    const valid = regex.test(control.value);
    return valid ? null : { invalidUsername: true };
  }

  /**
   * Validates password format using regex pattern.
   * @param control The form control to validate
   * @returns ValidationErrors if invalid, null if valid
   */
  passRegex(passwordControl: AbstractControl | null): boolean {
    if (!passwordControl) {
      return false;
    };
    const password = passwordControl.value;
    const regex = new RegExp(this.passwordPattern);
    return regex.test(password);
  }

  /*
  passRegex(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp(this.passwordPattern);
    const valid = regex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }
  */
  
  /**
   * Validator function to check if the password and confirmPassword fields in a form group have the same value.
   * If the values are not the same, it returns a validation error with the key 'notSame'.
   * @param group The form group containing the password and confirmPassword fields.
   * @returns A validation error object with the key 'notSame' if the passwords don't match, or null if they match.
   */
  matchAndRegex(passwordInput: string, confirmPasswordInput: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const password = controls.get(passwordInput);
      const confirmPassword = controls.get(confirmPasswordInput);
      
      const validPassword = this.passRegex(password);
  
      if (!confirmPassword?.errors && password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({
          matching: {
            actualValue: confirmPassword?.value,
            requiredValue: password?.value
          }
        });
        return { matching: true };
      }
  
      if (!validPassword) {
        password?.setErrors({
          invalidPassword: true
        });
        return { invalidPassword: true };
      }
  
      return null;
    };
  }
  
}

