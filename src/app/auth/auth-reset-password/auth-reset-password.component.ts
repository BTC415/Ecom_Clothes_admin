import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'carbon-components-angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss'],
})
export class AuthResetPasswordComponent implements OnInit {
  public ForgotPwdForm: FormGroup;
  _id: any;
  constructor(
    protected formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private acroute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.ForgotPwdForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}'
            ),
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
      },
      { updateOn: 'blur' }
    );

    this._id = this.acroute.snapshot.queryParams['id'];
    console.log('id', this._id);
  }

  onSubmit() {
    this.ForgotPwdForm.markAllAsTouched();
    if (!this.ForgotPwdForm.valid) {
      // this.router.navigate(['/app']);
    } else if (
      this.ForgotPwdForm.value.password !==
      this.ForgotPwdForm.value.passwordConfirm
    ) {
      this.notificationService.showToast({
        type: 'info',
        title: 'Password & confirm password does not match',
        target: '#notificationHolder',
        message: 'message',
        duration: 2000,
      });
    } else {
      const obj = {
        password: this.ForgotPwdForm.value.password,
        _id: this._id,
      };
      this.api.ForgotPassword(obj).subscribe({
        next: (res) => {
          // console.log("res",res)
          this.notificationService.showToast({
            type: 'info',
            title: 'Password change successfully, Login Now.',
            target: '#notificationHolder',
            message: 'message',
            duration: 2000,
          });
          this.router.navigate(['/auth/modern/signup']);
        },
        error: (error) => {
          console.log('errror', error);
        },
      });
    }
  }

  isValid(name) {
    const instance = this.ForgotPwdForm.get(name);
    return instance.invalid && (instance.dirty || instance.touched);
  }
}
