import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { RegisterRequest } from 'src/app/models/util-DTOs/JWT/auth.model';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

/**
 * Component for the registration page.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  /** Form group for registration */
  userFormRegister!: FormGroup;

  /** Model for registration request */
  registerModel: RegisterRequest = {
    email: '',
    username: '',
    password: '',
  };

  /** Type of sign (login or register) */
  signType: string = "register";

  /**
   * Constructor
   * @param formbuilder FormBuilder for creating form
   * @param authService AuthService for authentication
   * @param notify NotificationService for notifications
   * @param regex RegexService for regex validation
   * @param router Router for navigation
   */
  constructor(
    private formbuilder: FormBuilder, 
    private routeService: RouteChangeSubscriptionService,
    private authService: AuthService,
    private authUtilsService: AuthUtilsService,
    protected notify: NotificationService) {}
    

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // Handle case where user is already logged in
    this.authUtilsService.handleLoggedCase();
    this.signType = "register";
    // Initialize registration form
    this.userFormRegister = this.formbuilder.group({
      username: ['', [Validators.required, /*this.regex.usernameRegex*/]], // Username field (required)
      email: ['', [Validators.required, /*this.regex.emailRegex*/]], // Email field (required)
      password: ['', [Validators.required, /*this.regex.passRegex*/]], // Password field (required)
      checkboxControl: [false, Validators.requiredTrue], // Checkbox field (required)
    });
  }

  // TODO cambiare requisiti per username e password DIEGO PERFAVORE
  /**
   * Function called when registration form is submitted.
   */
  onSubmit() {
    // Populate registration model with form values
    this.registerModel.email = this.userFormRegister.value.email;
    this.registerModel.username = this.userFormRegister.value.username;
    this.registerModel.password = this.userFormRegister.value.password;
    // Call authentication service for registration
    this.authService.register(this.registerModel).subscribe({
      next: (res) => {
        // Show success notification and redirect to login page
        
        NotificationService.showDynamicResponseAlert(
          notifications.ICO_SUCCESS, res.message, 3000)
        .then(() => {
          this.routeService.goToLogin();
        })
      },
      error: (error)=>{
        NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, error.error.message, 4000);
      }
    })
  }
}
