/**
 * Interface for the panel data model
 * 
 * @param backdropClass - The CSS class containing the backdrop
 * @param panelClass - The CSS class containing the panel
 * @param type - The type of panel to display: panel | subpanel
 * @param components - List of components to display
 * @param actionsConfig - Configurations to show panel actions
 * @param headerConfig - Configurations to show the panel header
 */
export interface Panel {
  backdropClass: string;
  panelClass: string;
  type: string;
  components: any[];
  actionsConfig?: ActionsConfigModel;
  headerConfig: HeaderConfigModel;
}

/**
 * Interface for the model data of actions configurations to be shown at the top of the panel
 * 
 * @param edit - The possible action for editing
 * @param threeDotsActions - Actions to perform on the three-dots menu
 */
export interface ActionsConfigModel {
  edit?: ActionModel;
  threeDotsActions?: ActionModel[];
}

/**
 * Interface for the model data of actions
 * 
 * @param name - The name to display in the dropdown
 * @param callback - The callback to execute when clicking on the corresponding option
 */
export interface ActionModel {
  name: string;
  callback: any;
}

/**
 * Interface for the model data of header configurations in the panel
 * 
 * @param type - The type of header to display
 * @param title - The title to display, a different model is assigned based on the type of header
 */
export interface HeaderConfigModel {
  type: 'DEFAULT' | 'ICON_TITLE' | 'CHIPS_TITLE';
  title: any;
}

/**
 * Interface for the model data of the default title
 * 
 * @param name - The title
 */
export interface DefaultTitleModel {
  name: string;
}

/**
 * Interface for the model data of the title with icon, name, and surname
 * 
 * @param name - The name
 * @param surname - The surname
 * @param type - The user type
 */
export interface IconTitleModel {
  name: string;
  surname: string;
  type: 'PROFESSIONISTA' | 'PAZIENTE';
}

/**
 * Interface for the model data of the title with chips
 * 
 * @param name - The title
 * @param chips - The chips to display
 */
export interface ChipTitleModel {
  name: string;
  chips: ChipModel[];
}

/**
 * Interface for the model data of chips
 * 
 * @param name - The name of the chip to display
 * @param class - The class to assign to the chip
 */
export interface ChipModel {
  name: string;
  class: string;
}

/**
 * EXAMPLES FOR ACTIONS CONFIGURATION
 *
 * PANEL WITH ONLY EDIT ACTION
 * this.pazientiService.getPazienteById(this.paziente.id).subscribe({
 *     this.panelService.open(GenericDetailModalComponent, {
 *         backdropClass: 'small-custom-backdrop',
 *         panelClass: 'custom-subpanel',
 *         type: 'subpanel',
 *         components: [DettagliPazienteComponent],
 *         actionsConfig: {
 *             edit: {
 *                 name: 'edit',
 *                 callback: () => this.modifyPaziente()
 *             }
 *         },
 *         headerConfig: {
 *             type: 'ICON_TITLE',
 *             title: {
 *                 nome: res.anagrafica.nome,
 *                 cognome: res.anagrafica.cognome,
 *                 tipologia: 'PAZIENTE'
 *             }
 *         }
 *     });
 * });
 *
 * PANEL WITH THREE-DOTS MENU
 * this.panelService.open(GenericDetailModalComponent, {
 *     backdropClass: 'custom-backdrop',
 *     panelClass: 'custom-panel',
 *     type: 'panel',
 *     components: [DettaglioPazienteTerapiaComponent],
 *     actionsConfig: {
 *         threeDotsActions: [
 *             { name: 'Export Data', callback: () => this.exportData() },
 *         ],
 *     },
 *     headerConfig: {
 *         type: 'DEFAULT',
 *         title: {
 *             nome: terapiaInCorso.nome,
 *         }
 *     }
 * });
 */

/**
 * EXAMPLES FOR HEADER CONFIGURATION
 *
 * PANEL WITH DEFAULT HEADER
 * this.panelService.open(GenericDetailModalComponent, {
 *     backdropClass: 'custom-backdrop',
 *     panelClass: 'custom-panel',
 *     type: 'panel',
 *     components: [DettaglioClinicaComponent],
 *     headerConfig: {
 *         type: 'DEFAULT',
 *         title: {
 *             nome: LABEL_CONSTANT.dettaglio_clinica
 *         }
 *     }
 * });
 *
 * PANEL WITH ICON TITLE HEADER
 * this.panelService.open(GenericDetailModalComponent, {
 *     backdropClass: 'small-custom-backdrop',
 *     panelClass: 'custom-subpanel',
 *     type: 'subpanel',
 *     components: [DettagliProfessionistaComponent],
 *     headerConfig: {
 *         type: 'ICON_TITLE',
 *         title: {
 *             nome: res.anagrafica.nome,
 *             cognome: res.anagrafica.cognome,
 *             tipologia: 'PROFESSIONISTA'
 *         }
 *     }
 * });
 *
 * PANEL WITH CHIPS TITLE HEADER
 * this.panelService.open(GenericDetailModalComponent, {
 *     backdropClass: 'small-custom-backdrop',
 *     panelClass: 'custom-subpanel',
 *     type: 'subpanel',
 *     components: [DettagliTerapiaComponent],
 *     actionsConfig: {
 *         edit: {
 *             name: 'edit',
 *             callback: () => this.modifyTerapia()
 *         }
 *     },
 *     headerConfig: {
 *         type: 'CHIPS_TITLE',
 *         title: {
 *             nome: res.nome,
 *             chips: this.terapiaService.terapia?.tags?.map((tag: any) => ({
 *                 name: tag,
 *                 class: 'chip-default'
 *             }))
 *         }
 *     }
 * });
 */