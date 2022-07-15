import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from 'carbon-components-angular';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    protected formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ],
        ],
        role: ['admin'],
      },
      { updateOn: 'blur' }
    );
  
    
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
    } else {
      this.api.UserLogin(this.loginForm.value).subscribe({
        next: (result) => {
          // console.log('resut', result);
          // console.log('resut.token', result.token);
          localStorage.setItem('token', result.token);
          this.notificationService.showToast({
            type: 'info',
            title: 'Login Successfully',
            target: '#notificationHolder',
            message: 'message',
            duration: 2000,
          });
          this.router.navigate(['/app']);
        },
        error: (error) => {
          this.notificationService.showToast({
            type: 'error',
            title: 'Invalid Details',
            subtitle: 'Please Enter valid Details',
            // caption: 'Sample caption',
            target: '#notificationHolder',
            message: 'message',
            duration: 2000,
          });
        },
      });
    }
  }

  isValid(name) {
    const instance = this.loginForm.get(name);
    return instance.invalid && (instance.dirty || instance.touched);
  }
}
