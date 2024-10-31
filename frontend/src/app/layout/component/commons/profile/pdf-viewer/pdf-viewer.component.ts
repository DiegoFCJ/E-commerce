import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  template: `
    <div *ngIf="isLoading" class="loading-indicator">Caricamento PDF...</div>
    <div *ngIf="error" class="error-message">Errore durante il caricamento del PDF</div>
    <!-- <pdf-viewer
      *ngIf="!isLoading && !error"
      [src]="pdfSource"
      [render-text]="true"
      [external-link-target]="'blank'"
      style="display: block;"
      (after-load-complete)="onLoadComplete()"
      (error)="onError($event)">
    </pdf-viewer> -->
  `,
  styles: [`
    .loading-indicator {
      text-align: center;
      padding: 20px;
      font-size: 1.2em;
    }
    .error-message {
      text-align: center;
      color: red;
      padding: 20px;
      font-size: 1.2em;
    }
  `]
})

export class PdfViewerComponent {
  pdfSource: string = 'src/assets/privacy.pdf';
  isLoading: boolean = true;
  error: boolean = false;

  onLoadComplete() {
    this.isLoading = false;
  }

  onError(event: any) {
    console.error('Errore durante il caricamento del PDF: ', event);
    this.error = true;
    this.isLoading = false;
  }
}