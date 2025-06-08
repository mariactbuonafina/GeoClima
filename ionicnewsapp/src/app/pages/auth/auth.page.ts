import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AuthPage {
  authForm!: FormGroup;
  isLoginMode = true;
  loading = false;
  error: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      name: ['', this.isLoginMode ? [] : [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', this.isLoginMode ? [] : [Validators.required, this.confirmPasswordValidator.bind(this)]]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.createForm();
    this.error = null;
  }

  confirmPasswordValidator(control: AbstractControl) {
    if (!this.authForm) return null;
    return control.value === this.authForm.get('password')?.value ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.authForm.invalid) return;

    this.loading = true;
    this.error = null;

    const { email, password, name } = this.authForm.value;
    const authObs = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.register(email, password, name);

    authObs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Exibe mensagem clara de erro conforme AuthService
        this.error = err?.message || 'Falha na autenticação. Verifique seus dados.';
        this.loading = false;
      },
    });
  }
}