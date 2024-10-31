import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { APP } from '../constants/app.constant';

/** Una classe per la impostare la strategia per i titoli delle pagine */
@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  /**
   * Override del metodo updateTitle della classe TitleStrategy per impostare il titolo della pagina
   * @param routerState
   */
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `${APP.title} - ${title}`;
    } else {
      document.title = `${APP.title}`;
    }
  }
}
