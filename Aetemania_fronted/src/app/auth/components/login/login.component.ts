import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;  // Variable para mostrar el estado de carga

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit(): void {
    // Verificamos si las credenciales están almacenadas en localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedRememberMe = localStorage.getItem('rememberMe');

    if (savedEmail && savedPassword && savedRememberMe === 'true') {
      // Si hay datos en localStorage y 'rememberMe' es true, rellenamos el formulario
      this.loginForm.setValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true
      });
    }
  }

  // Método que se llama cuando el formulario se envía
  funIngresar() {
    if (this.loginForm.valid) {
      this.loading = true;  // Activamos el estado de carga

      const credentials = this.loginForm.value; // Obtén los valores del formulario

      console.log(credentials);

      // Guardamos las credenciales en localStorage si 'rememberMe' está marcado
      if (this.loginForm.get('rememberMe')?.value) {
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        // Si no está marcado 'rememberMe', eliminamos las credenciales de localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      // Lógica de autenticación (ejemplo)
      // Aquí iría la lógica para verificar el login con el servicio de autenticación.
      setTimeout(() => {
        this.loading = false; // Desactivamos el estado de carga
        this.router.navigate(['/admin']); // Redirige a la página de administración
      }, 2000); // Simulación de un retraso (puedes reemplazar esto con la llamada real al servicio)
    } else {
      console.log("Formulario no válido");
      // Lógica para mostrar un mensaje de error o hacer algo cuando el formulario no es válido
    }
  }

  // Métodos para acceder a los campos del formulario
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')?.value ?? false;
  }

  // Método para verificar si el campo es inválido y ha sido tocado
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.invalid ?? false) && (control?.touched ?? false);
  }

  // Método para mostrar el mensaje de error
  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control?.hasError('email')) {
      return 'Por favor, ingrese un correo válido.';
    }
    return null;
  }
}