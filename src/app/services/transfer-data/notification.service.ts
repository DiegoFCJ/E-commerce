import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2.js';

/** A service class for notifications */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  timerInterval: any = '';

  constructor() { }

  /** Displays a customizable html alert. */
  customHTMLAlert(){
    Swal.fire({
      title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: `
        You can use <b>bold text</b>,
        <a href="#">links</a>,
        and other HTML tags
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down"
    });
  }

  /** display terms and conditions */
  async termsAndCondition(){
    const { value: accept } = await Swal.fire({
      title: "Terms and conditions",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
        I agree with the terms and conditions
      `,
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: (result) => {
        return !result && "You need to agree with T&C";
      }
    });
    if (accept) {
      Swal.fire("You agreed with T&C :)");
    }
  }

  /** Prompts the user to enter an email address. */
  enterEmail(): Promise<string> {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Password Recovery",
        input: "email",
        inputLabel: "Your email",
        inputPlaceholder: "Enter your email",
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: true,
        cancelButtonText: "Cancella",
        denyButtonText: "Email dimenticata?",
        confirmButtonText: "Avanti",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(result.value as string); // Resolve the promise with the entered email
        } 
        else if (result.isDenied) {
          this.enterUsername().then((email) => {
            // If user chooses "Forgot your email?", call enterUsername
            // and resolve the promise with the entered username
            resolve(email);
          });
        } 
        else if(result.isDismissed){
          resolve("");
        } 
        else {
          // If the user cancels, resolve the promise with an empty string
          resolve("");
        }
      });
    });
  }
  
  /** Prompts the user to enter an username address. */
  enterUsername(): Promise<string> {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Password Recovery",
        input: "text",
        inputLabel: "Try with your username",
        inputPlaceholder: "Enter your username",
        showCancelButton: true,
        showDenyButton: true,
        focusConfirm: true,
        confirmButtonText: "Avanti",
        denyButtonText: "Dietro",
        cancelButtonText: "Cancella",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(result.value as string); // Resolve the promise with the entered username
        } 
        else if (result.isDenied) {
          this.enterEmail().then((username) => {
            // If user chooses "Forgot your email?", call enterUsername
            // and resolve the promise with the entered username
            resolve(username);
          });
        } 
        else if(result.isDismissed){
          resolve("");
        } 
        else {
          // If the user cancels, resolve the promise with an empty string
          resolve("");
        }
      });
    });
  }

  /**
   * Dynamicly displays generic Alerts
   * @param icon to choose the kind of response
   * @param authMsg the response message itself
   * @param timer the timer for the alert to remain on
   * @returns the alert it self to let the dev choose what to do next
   */
  static showDynamicResponseAlert(icon: any, authMsg: string, timer:number){
    return Swal.fire({
      icon: icon,
      title: authMsg,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }
  /**
   * Displays a dynamic response alert using Swal (SweetAlert2) library.
   * @param icon The icon to display in the alert.
   * @param authMsg The message to display in the alert.
   * @param timer The duration (in milliseconds) for which the alert should be displayed.
   * @returns A Promise that resolves when the alert is closed.
   */
  showDynamicResponseAlert(icon: any, authMsg: string, timer:number){
    return Swal.fire({
      icon: icon,
      title: authMsg,
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }

  /**
   * It asks the user whether or not they are sure to proceed with the deletion.
   */
  async areYouSureToDelete(): Promise<boolean> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    const result = await swalWithBootstrapButtons.fire({
      title: "Sei sicuro?",
      text: "Non sarai in grado di recuperare i dati!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Elimina!",
      cancelButtonText: "No, Torna Indietro!",
      reverseButtons: true
    });
  
    if (result.isConfirmed) {
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return false;
    }
  
    return false;
  }

  /** Displays an alert for saving changes before closing. */
  saveChangesBeforeClosing(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }


  /** Converts an array buffer to base64 string. after that it changes the profile img  */
  profileImgChange() {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Select image",
        input: "file",
        inputAttributes: {
          "accept": "image/*",
          "aria-label": "Upload your profile picture"
        },
        inputValidator: (value) => {
          if (!value) {
            return 'You need to select a file';
          }
          return '';
        },
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Upload',
        showLoaderOnConfirm: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const base64String = dataUrl.split(',')[1]; // Converti il file in base64
            const fileData = {
              file: base64String,
              originalFilename: result.value.name,
              contentType: result.value.type
            };
            resolve(fileData);
          };
          reader.onerror = () => {
            reject(new Error("Error reading the file."));
          };
          reader.readAsDataURL(result.value);
        }
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
    });
  }
  
  
  

  /** method to use asynchronusly the image change */
  saveImage(imageBase64: string, userIdForPath: number) {
    try {
      // Crea un elemento <a> temporaneo e lo utilizza per scaricare l'immagine
      const a = document.createElement('a');
      a.href = imageBase64;
      a.download = `${userIdForPath}_profile.png`; 
      a.click();
      console.log('Immagine salvata con successo.');
    } catch (error) {
      console.error('Si è verificato un errore durante il salvataggio dell\'immagine:', error);
    }
  }

  yourUploadedPicture(result: any){
    Swal.fire({
      title: 'Your uploaded picture',
      imageUrl: result.value,
      imageAlt: 'The uploaded picture'
    });
  }


}
