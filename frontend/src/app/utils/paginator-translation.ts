import { Injectable } from '@angular/core';

import { MatPaginatorIntl } from '@angular/material/paginator';

/** Una classe per la traduzione della label del paginator */
@Injectable()
export class MatPaginatorIntlIta extends MatPaginatorIntl {
  /** Label per il numero di elementi per pagina */
  override itemsPerPageLabel = 'Elementi per pagina';
  /** Label per la cta della pagina successiva */
  override nextPageLabel = 'Pagina successiva';
  /** Label per la cta della pagina precedente */
  override previousPageLabel = 'Pagina precedente';
  /** Label per la cta dell'ultima pagina */
  override lastPageLabel = 'Ultima pagina';
  /** Label per la cta della prima pagina */
  override firstPageLabel = 'Prima pagina';

  /**
   * Formatta le label del paginator
   * @param {number} page Il numero della pagina corrente
   * @param {number} pageSize Il numero di elementi per ogni pagina
   * @param {number} length Il numero totale degli elementi
   * @returns {string} La label
   */
  override getRangeLabel = function (
    page: number,
    pageSize: number,
    length: number
  ): string {
    if (length === 0 || pageSize === 0) {
      return '0 di ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' di ' + length;
  };
}
