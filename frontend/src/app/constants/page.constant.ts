/** Costante per il menù di navigazione laterale */
export const SIDENAV_MENU_CONSTANT = [
  {
    name: 'Utenti',
    icon: 'group',
    childrenPath: [
      '/gestionale/utenti/lista'
    ],
    children: [
      {
        wip: false, // Booleana per il controllo se la pagina è in work in progress
        name: 'Tutti gli utenti',
        path: '/gestionale/utenti/lista',
      }
    ]
  },
  {
    wip: true,
    name: 'Il tuo profilo',
    icon: 'person',
    path: '/gestionale/profilo',
  },

]
