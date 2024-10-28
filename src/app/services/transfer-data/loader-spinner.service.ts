import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/** Service per il loader spinner */
@Injectable({
  providedIn: 'root',
})
export class LoaderSpinnerService {
  /** Subject per la visualizzazione dello spinner */
  private showSpinnerEvent = new Subject<boolean>();

  /** Emette l'evento per far vedere il loader spinner*/
  show() {
    Promise.resolve(null).then(() => this.showSpinnerEvent.next(true));
  }

  /** Emette l'evento per nascondere il loader spinner */
  hide() {
    Promise.resolve(null).then(() => this.showSpinnerEvent.next(false));
  }

  /**
   * Ritorna un Observable di tipo boolean per l'evento di mostra/nascondi loader spinner
   *
   * @returns {Observable<boolean>}
   */
  showSpinnerEventListener(): Observable<boolean> {
    return this.showSpinnerEvent.pipe();
  }
}