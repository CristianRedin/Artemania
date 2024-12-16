import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicialización explícita de registerForm (opcional aquí, ya que se hace en ngOnInit)
    this.registerForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });

    // Validador para asegurar que las contraseñas coinciden
    this.registerForm.controls['confirmPassword'].setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this)
    ]);
  }

  // Validador para las contraseñas
  passwordMatchValidator(control: any): { [s: string]: boolean } | null {
    if (this.registerForm && control.value !== this.registerForm.controls['password'].value) {
      return { mustMatch: true };
    }
    return null;
  }

  // Verificación de si el campo es inválido y tocado
  isInvalidAndTouched(field: string) {
    return this.registerForm.controls[field].invalid && this.registerForm.controls[field].touched;
  }

  // Manejo del formulario de registro
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Aquí puedes agregar tu lógica para hacer una solicitud HTTP al servidor
      console.log(this.registerForm.value);
      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  }
}
