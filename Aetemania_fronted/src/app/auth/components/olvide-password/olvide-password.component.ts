import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.component.html',
  styleUrls: ['./olvide-password.component.scss']
})
export class OlvidePasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;  // Definimos el formulario
  submitted = false;  // Flag para indicar que el formulario fue enviado

  constructor(private router: Router) {
    // Inicializamos el formulario con un campo de correo electrónico
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {}

  // Método que se llama al enviar el formulario
  onSubmit() {
    this.submitted = true;  // Indicamos que el formulario ha sido enviado

    // Verificamos si el formulario es válido
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('Enviando enlace de recuperación a:', email);

      // Simulamos el envío del enlace de recuperación
      setTimeout(() => {
        alert('Si el correo existe en nuestra base de datos, se enviará un enlace de restablecimiento.');
        this.router.navigate(['/login']);  // Redirigimos al login después de enviar el correo
      }, 1000);
    }
  }

  // Método para acceder al control del correo electrónico
  get email() {
    return this.forgotPasswordForm.get('email');
  }

  // Método para comprobar si un control es inválido y ha sido tocado
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.forgotPasswordForm.get(controlName);
    return (control?.invalid ?? false) && (control?.touched ?? false);
  }

  // Método para obtener el mensaje de error
  getErrorMessage(controlName: string): string | null {
    const control = this.forgotPasswordForm.get(controlName);
    if (control?.hasError('required')) {
      return 'El correo electrónico es obligatorio.';
    } else if (control?.hasError('email')) {
      return 'Por favor, ingrese un correo válido.';
    }
    return null;
  }
}