import { Injectable, Injector, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { INJECT_DATA_COMPONENT } from 'src/app/constants/injector.constant';
import { Panel } from 'src/app/models/util-DTOs/panel.model';

@Injectable({ providedIn: 'root' })
export class PanelService {
  /** Booleana per il controllo se il subpanel del dettaglio sesione è aperto */
  isDetailOpen: boolean = false;
  /** Riferimento all'overlay */
  overlayRef: any;
  /** Riferimento alla componente */
  componentRef: any;
  /** Riferimento al pannello padre */
  parentComponentRef: any;
  /** Subject per l'aggiornamento del titolo della generic modal */
  updateTitle: Subject<string> = new Subject<string>(); 

  /**
   * Il costruttore della classe
   * @param {Overlay} overlay L'injectable del service Overlay
   */
  constructor(private overlay: Overlay) {}

  /**
   * Funzione per l'apertura del panel
   * @param {Type<any>} component La componente da visualizzare
   * @param {Panel} config Oggetto contenente le configurazioni del panel
   */
  open(component: Type<any>, config: Panel) {
    if (this.componentRef) {
      this.close();
    }
    const injector = Injector.create({
      providers: [
        {
          provide: INJECT_DATA_COMPONENT,
          useValue: config,
        },
      ],
    });

    const componentPortal = new ComponentPortal(component, null, injector);
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: config.backdropClass,
    });

    overlayRef.addPanelClass(config.panelClass);
    const componentRef = overlayRef.attach(componentPortal);
    if (config.type == 'subpanel') {
      this.overlayRef = overlayRef;
      this.componentRef = componentRef;
    } else {
      this.parentComponentRef = componentRef;
    }

    overlayRef.backdropClick().subscribe(() => {
      this.close(componentRef, overlayRef);
    });
    componentRef.instance.closeDialogEmit.subscribe(() => overlayRef.detach());
  }

  /**
   * Funzione per la chiusura del panel
   * @param {any} componentRef Riferimento alla componente
   * @param {any} overlayRef Riferimento all'overlay
   */
  close(
    componentRef: any = this.componentRef,
    overlayRef: any = this.overlayRef
  ) {
    componentRef.instance.state = 'close';
    setTimeout(() => {
      overlayRef.detach();
    }, 300);
  }

  /** Emette l'evento che il titolo della generic modal è da aggiornare */
  emitUpdateTitleListener(title: string) {
    this.updateTitle.next(title);
  } 

  /**
   * Ritorna un observable del subject dell'aggiornamento del titolo della generic modal
   *
   * @returns {Observable<string>}
   */
  updateTitleListener(): Observable<string> {
    return this.updateTitle;
  }
}
