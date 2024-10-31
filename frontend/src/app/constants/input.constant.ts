/** Constant with texts to use in inputs */
export const INPUT_CONSTANT = {
  name: 'Nome',
  surname: 'Cognome',
  birthDate: 'Data di nascita',
  birthPlace: 'Luogo di nascita',
  email: 'Email',
  phone: 'Telefono',
  notes: 'Note',
  password: 'Password',
  delete: 'Elimina',
  group_actions: 'Azioni di gruppo',
  role: 'Ruolo',
  first_last_name: 'Nome o Cognome',
  status: 'Stato',
  search: 'Ricerca',
  pageNumber: 0,
  pageSize: 10,
  tags: 'Tags',
  tag: 'Tag',
  description: 'Descrizione',
  start_date: 'Data inizio',
  end_date: 'Data fine',
  full_name: 'Nome e cognome',
  recovery_email: 'Email di recupero',
  required_fields: '* Campi obbligatori',
  quantity: 'Quantità',
};

/** Constant with texts to use in table inputs */
export const TABLE_INPUT_CONSTANT = {
  username: 'Username',
  usertype: 'Ruolo',
  id: 'ID',
};

/** Constant with texts to use in group actions select */
export const TABLE_GROUP_ACTIONS_CONSTANT = [
  {
    icon: 'delete',
    value: 'Elimina',
  },
];

export const TABLE_COLUMNS = {
  users: ['select', 'username', 'usertype', 'action'],
};
