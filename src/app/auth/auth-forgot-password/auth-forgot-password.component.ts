import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auth-forgot-password',
  templateUrl: './auth-forgot-password.component.html',
  styleUrls: ['./auth-forgot-password.component.scss'],
})
export class AuthForgotPasswordComponent implements OnInit {
  public FormSendMail: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.FormSendMail = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit() {
    this.FormSendMail.markAllAsTouched();
    if (this.FormSendMail.valid) {
      this.api.SendEmail(this.FormSendMail.value.email).subscribe({
        next: (res) => {
          console.log('res', res);
          this.notificationService.showToast({
            type: 'info',
            title: 'Email send successfully , please check your Email',
            target: '#notificationHolder',
            message: 'message',
            duration: 2000,
          });
          // this.router.navigate(['/app']);
        },
        error: (error) => {
          this.notificationService.showToast({
            type: 'error',
            title: 'Please Enter the valid email address',
            target: '#notificationHolder',
            message: 'message',
            duration: 2000,
          });
          console.log('error', error);
        },
      });
    }
  }

  isValid(name) {
    const instance = this.FormSendMail.get(name);
    return instance.invalid && (instance.dirty || instance.touched);
  }
}
