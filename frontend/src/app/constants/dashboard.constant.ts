/**
 * Object with key-value pairs where both key and value are paths,
 * and the value is an object with 'title' and 'subtitle' properties.
 * Constant containing titles' texts.
 */
export const TITLE_CONSTANT = {
  profile_management: 'Gestione Profilo',
  profile: 'Profilo',
  edit_profile: 'Modifica profilo',
};

/**
 * Object with key-value pairs where the key is a path and the value is an object
 * with 'title' and 'subtitle' properties.
 * Constant containing titles and subtitles based on the path for subheader section.
 */
export const DASHBOARD_HEADER = {
  '/gestionale/utenti/lista': {
    title: 'Tutti gli utenti',
  },
};
