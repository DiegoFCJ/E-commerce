import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { AuthUtilsService } from 'src/app/services/transfer-data/auth-utils.service';
import { CartUtilsService } from 'src/app/services/transfer-data/cart-utils.service';
import { NotificationService } from 'src/app/services/transfer-data/notification.service';
import * as notifications from 'src/app/constants/sweat-alert.constant';
import { UserService } from 'src/app/services/user.service';
import { LoginRequest } from 'src/app/models/util-DTOs/JWT/auth.model';
import { RouteChangeSubscriptionService } from 'src/app/services/transfer-data/route-change-subscription.service';
import { CartService } from 'src/app/services/cart.service';
import { UserDTO } from 'src/app/models/user.model';
import { CartDTO } from 'src/app/models/cart.model';

/**
 * Component for the login page.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  /** Form group for login */
  userFormLogin!: FormGroup;

  /** Model for login request */
  loginModel: LoginRequest = {
    username: '',
    password: '',
  };

  /** Flag for 'Remember Me' option */
  rememberMe: boolean = false;

  /** Type of sign (login or register) */
  signType: string = "";

  /** Subscription for authentication */
  authSubscription!: Subscription;

  /**
   * Constructor
   * @param formbuilder FormBuilder for creating form
   * @param authService AuthService for authentication
   * @param router Router for navigation
   * @param notify NotificationService for notifications
   */
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private notify: NotificationService,
    protected cartUtilsService: CartUtilsService,
    protected authUtilsService: AuthUtilsService,
    private routeService: RouteChangeSubscriptionService,
    private route: ActivatedRoute,
    private vTService: EmailService,
    private userService: UserService,
    private cartService:CartService
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // Handle case where user is already logged in
    this.authUtilsService.handleLoggedCase();
    
    this.signType = "login";
    // Initialize login form
    this.userFormLogin = this.formbuilder.group({
      username: ['', /*Validators.required*/], // Username field (required)
    password: ['', /*Validators.required*/], // Password field (required)
      rememberMe: [false, /*Validators.required*/], // 'Remember Me' field (required)
    });

    /**
     * if the route of the login contains the token then it'll be retrieved
     */
    this.route.params.subscribe(params => {
      this.activation(params['token']);
    });
  }

  /**
   * check wether or not the user account will be activated
   */
  private activation(token: string){
    if(token){
      this.vTService.activation(token).subscribe({
        next: (res)=>{
          if(res){
            if(res.message !== "Account verificato con successo!"){
              NotificationService.showDynamicResponseAlert(notifications.ICO_INFO, res.message, 3000);
            }else{
              NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, res.message, 3000);
            }
          }
        },
        error: (error)=>{
          NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, error.error.message, 4000)
        }
      })
    }
  }

  /**
   * Function called when login form is submitted.
   */
  onSubmit() {
    this.loginModel.username = this.userFormLogin.value.username;
    this.loginModel.password = this.userFormLogin.value.password;
    this.rememberMe = this.userFormLogin.value.rememberMe;
    // Call authentication service for login
    this.authService.login(this.loginModel).subscribe({
      next: (response) => { // Handle response
        // Show success notification
        NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, response.message, 1000)
        .then(() => {
          // Save user information to session or local storage based on 'Remember Me' option
          if (this.rememberMe) {
            this.authUtilsService.setUserLocal(response.data);
          }else{
            this.authUtilsService.setUserSession(response.data);
          }
          // CART INITIALIZAZION
          
          this.cartSingleton(response.data)

          // Redirect to home page
          this.routeService.goToHome();
        })
      },
      error: (error) => { // Handle errors
        NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, error.error.message, 4000)
      },
    });
  }

  passwordRecovery() {
    // Asynchronous call to enterEmail
    this.notify.enterEmail().then((emailOrUsername) => {
      // After entering the emailOrUsername, perform further actions here
      const userSubscription = this.userService.getUserByEmailOrUsername(emailOrUsername).subscribe({
        next: (res) => {
          console.log('res', res)
          let userForEmailService = res.data;
  
          this.vTService.sendRecoveryMail(userForEmailService).subscribe({
            next: (res) => {
              console.log('res', res)
              NotificationService.showDynamicResponseAlert(notifications.ICO_SUCCESS, res.message, 4000);
            },
            error: (error) => {
              console.log('error', error)
              NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, error.error.message, 4000)
              userSubscription.unsubscribe(); // Unsubscribe in case of error
            }
          });
        },
        error: (error) => {
          console.log('error', error)
          NotificationService.showDynamicResponseAlert(notifications.ICO_ERROR, error.error.message, 4000)
          userSubscription.unsubscribe(); // Unsubscribe in case of error
        }
      });
    });
  }
  cartSingleton(user:UserDTO){
    this.cartService.readByUserId(user.id).subscribe({
      next:(res)=>{
        this.cartUtilsService.setCart(res.data)
        console.log('carrello:>> ', res);
      },
      error:(err)=>{
        this.cartInit(user)
      }
    })
  }

  cartInit(user:UserDTO){
    const emptyCart:CartDTO={
      id:0,
      userDTO:user,
      productDetailDTOList:[]
    }
    this.cartService.create(emptyCart).subscribe()
    this.cartUtilsService.setCart(emptyCart)
  }
}

