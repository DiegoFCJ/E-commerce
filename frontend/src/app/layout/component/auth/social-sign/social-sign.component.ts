import { Component, OnInit, Input } from '@angular/core';

/**
 * Component for social sign-in.
 */
@Component({
  selector: 'app-social-sign',
  templateUrl: './social-sign.component.html',
  styleUrls: ['./social-sign.component.scss'],
})
export class SocialSignComponent implements OnInit {
  /** Type of action (login or registration). */
  @Input() signType: string = "";

  /** Flag to remember the user. */
  @Input() rememberMe: boolean = false;

  /** Method called on component initialization. */
  ngOnInit(): void {
  }

  /**
   * Method to trigger Google sign-in.
   * @param googleWrapper An object with a `click` method to emulate Google login button click.
   */
  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
}
