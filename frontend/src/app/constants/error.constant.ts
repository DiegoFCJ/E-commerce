/** Constant with error messages */
export const ERRORS_CONSTANT = {
  genericError: 'Qualcosa è andato storto',
  required: 'Il campo è obbligatorio',
  email: {
    already_present: 'Email già associata ad un account',
  },
  list_input: {
    min_length_1: 'Inserire almeno un elemento',
  },
  input: {
    no_white_space: 'Presenza di uno o più caratteri non validi',
    min_length_3: 'Lunghezza minima consentita 3 caratteri',
    min_length_8: 'Lunghezza minima consentita 8 caratteri',
    max_length_32: 'Lunghezza massima consentita 32 caratteri',
    max_length_64: 'Lunghezza massima consentita 64 caratteri',
    max_length_128: 'Lunghezza massima consentita 128 caratteri',
    max_length_256: 'Lunghezza massima consentita 256 caratteri',
    max_length_500: 'Lunghezza massima consentita 500 caratteri',
    max_length_1024: 'Lunghezza massima consentita 1024 caratteri',
    max_number_length_3: 'Lunghezza massima consentita 3 numeri',
    max_number_length_32: 'Lunghezza massima consentita 32 numeri',
    email_pattern: 'Formato email non valido',
  },
  password: {
    pattern: 'La password inserita non soddisfa i requisiti richiesti',
    match: 'Le password non corrispondono',
  },
};

/** Constant with password validation error messages */
export const PASSWORD_VALIDATORS = [
  {
    validatorName: 'minlength',
    validatorLabel: 'Almeno 8 caratteri',
  },
  {
    validatorName: 'hasCapitalCase',
    validatorLabel: '1 lettera maiuscola',
  },
  {
    validatorName: 'hasSmallCase',
    validatorLabel: '1 lettera minuscola',
  },
  {
    validatorName: 'hasSpecialCharacters',
    validatorLabel: '1 carattere speciale (!?#*@%$)',
  },
];
