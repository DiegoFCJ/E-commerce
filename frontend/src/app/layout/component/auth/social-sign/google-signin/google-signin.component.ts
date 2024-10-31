import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { LoginRequest, RegisterRequest } from 'src/app/models/util-DTOs/JWT/auth.model';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';

/**
 * Global interface to define global methods and variables.
 */
declare global {
  interface Window {
    handleGoogleLoginCallback: () => void;
    google: any;
  }
}

/**
 * Component for Google sign-in and registration.
 */
@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss'],
})
export class GoogleSigninComponent implements OnInit, OnDestroy {
  /** Event emitted on Google login. */
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  /** Type of action (login or registration). */
  @Input() signType: string = "";

  /** Flag to remember the user. */
  @Input() rememberMe: boolean = false;

  /** Model for registration request. */
  registerModel: RegisterRequest = {
    email: '',
    username: '',
    password: '',
  };

  /** Model for login request. */
  loginModel: LoginRequest = {
    username: '',
    password: '',
  };

  /** Subscription for authentications. */
  authSubscription!: Subscription;

  /** Constructor */
  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private authUtilsService: AuthUtilsService,
    private routeService: RouteChangeSubscriptionService,
    private router: Router
  ) {}

  /** Method called on component initialization. */
  ngOnInit(): void {
    window.handleGoogleLoginCallback = () => {
      this.handleGoogleLogin();
    };
  }

  /**
   * Method to create a fake wrapper for Google login.
   * @returns An object with a `click` method to emulate Google login button click.
   */
  createFakeGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);

    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  /** Method to handle Google login. */
  handleGoogleLogin() {
    //this calls the fake wrapper for google sign in
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
console.log('this.signType', this.signType)
    if(this.signType==="login"){
      this.handleCustomLoginGoogle();
    }else if(this.signType==="register"){
      this.handleCustomGoogleRegister();
    }
  }

  /** Method for Google login. */
  handleCustomLoginGoogle() {
    this.authSubscription = this.socialAuthService.authState.subscribe({
      next: (user) => {
        this.loginModel.username = user.email;
        this.loginModel.password = user.id;

        this.authService.login(this.loginModel).subscribe({
          next: (response) => {
            this.handleSuccess(
              response.message,
              () => {
                if (this.rememberMe) {
                  this.authUtilsService.setUserLocal(response.data);
                } else {
                  this.authUtilsService.setUserSession(response.data);
                }
                this.router.navigate(['OfficeOasis/home']);
              }
            );
          },
          error: (error) => {
            this.handleError(
              error.error.message
            );
          },
        });
      },
      error: (error) => {
        this.handleError(error.error.message);
      },
    });
  }

  /** Method for Google registration. */
  handleCustomGoogleRegister() {
    this.authSubscription = this.socialAuthService.authState.subscribe({
      next: (user) => {
        this.registerModel.email = user.email;
        this.registerModel.username = user.name;
        this.registerModel.password = user.id;

        this.authService.register(this.registerModel).subscribe({
          next: (res) => {
            this.handleSuccess(
              res.message,
              () => {
                this.routeService.goToLogin();
              }
            );
          },
          error: (error) => {
            this.handleError(
              error.error.message
            );
          },
        });
      },
      error: (error) => {
        this.handleError(
          error.error.message
        );
      },
    });
  }

  /**
   * Method to handle success responses.
   * @param title The title of the success alert.
   * @param message The message of the success alert.
   * @param callback A callback function to be executed after the alert is closed.
   */
  private handleSuccess(message: string, callback: () => void) {
    NotificationService.showDynamicResponseAlert(
      notifications.ICO_SUCCESS,
      message,
      2500
    ).then(callback);
  }

  /**
   * Method to handle errors.
   * @param title The title of the error alert.
   * @param message The message of the error alert.
   */
  private handleError(message: string) {
    NotificationService.showDynamicResponseAlert(
      notifications.ICO_ERROR,
      message,
      2500
    );
  }

  /** Method called on component destruction. */
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
