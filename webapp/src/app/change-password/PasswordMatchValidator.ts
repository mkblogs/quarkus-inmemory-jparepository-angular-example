import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

/* tslint:disable */
export const PasswordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const repeatPasswordControl = control.get('repeatPassword');
  const password = passwordControl.value;
  const repeatPassword = repeatPasswordControl.value;

  if(password && repeatPassword && password !== repeatPassword){
	   return { nomatch: true };
  }else{
	  return null;
  }  
};
