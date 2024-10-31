import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { RegexService } from 'src/app/services/transfer-data/regex.service';
import { EmailService } from 'src/app/services/email.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordRecoveryRequest } from 'src/app/models/verification-token.model';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

/**
 * Component responsible for handling password recovery functionality.
 */
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  // Definition of component variables

  /** FormGroup instance to manage the password recovery form. */
  passRecoverForm!: FormGroup;

  /** Object holding password and token for password recovery. */
  passRecoverForBack: PasswordRecoveryRequest = {
    password: '',
    token: ''
  };

  /**
   * Constructs the PasswordRecoveryComponent.
   * @param formbuilder Instance of FormBuilder for form creation.
   * @param routeService Instance of routeService for authentication utilities.
   * @param notify Instance of NotificationService for displaying notifications.
   * @param emailService Instance of EmailService for handling email-related functionalities.
   * @param regex Instance of RegexService for regular expression utilities.
   * @param route Instance of ActivatedRoute for retrieving route parameters.
   */
  constructor(
    private formbuilder: FormBuilder,
    private routeService: RouteChangeSubscriptionService,
    protected notify: NotificationService,
    private emailService: EmailService,
    private regex: RegexService,
    private route: ActivatedRoute
  ) {}

  /**
   * Initializes the component when it is loaded.
   * Sets up the password recovery form and extracts token from URL parameters.
   */
  ngOnInit(): void {
    // Initializes the password recovery form with password and confirmPassword fields
    this.passRecoverForm = this.formbuilder.group({
      password: ['', [Validators.required]], // Password field with required validator
      confirmPassword: ['', [Validators.required]], // Confirm password field with required validator
    },
    {
      // Custom validator to ensure password and confirmPassword match
      validators: [this.regex.matchAndRegex('password', 'confirmPassword')]
    });

    // Subscribes to URL parameters to extract the recovery token
    this.route.params.subscribe(params => {
      this.passRecoverForBack.token = params['token'];
    });
  }

  /**
   * Submits the password recovery form.
   * Calls the email service to confirm password recovery and handles response.
   */
  onSubmit() {
    // Sets the recovered password in passRecoverForBack object
    this.passRecoverForBack.password = this.passRecoverForm.value.password;
    
    // Calls the email service to confirm password recovery
    this.emailService.confirmRecoverPassword(this.passRecoverForBack).subscribe({
      next: (res) => {
        // Shows success notification and redirects to login page
        NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, res.message, 3000)
        .then(() => {
          this.routeService.goToLogin();
        })
      },
      error: (error)=>{
        // Shows error notification in case of password recovery confirmation failure
        NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, error.error.message, 4000)
          .then(() => {

          }
        )
      }
    })
  }

  /**
   * Deletes the recovery token associated with the forgotten password.
   * Calls the email service to delete the token and handles response.
   */
  deleteVToken(){
    this.emailService.deleteTokenByToken(this.passRecoverForBack.token).subscribe({
      next: (res) => {
        // Shows success notification and redirects to login page
        NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, res.message, 3000)
        .then(() => {
          this.routeService.goToLogin();
        })
      },
      error: (error) => {
        // Logs error message and redirects to login page in case of token deletion failure
        console.log(error.error.message);
          this.routeService.goToLogin();
      }
    })
  }
}
