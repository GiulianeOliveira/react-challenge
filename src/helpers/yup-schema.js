import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Required field',
  },
});

export const validateSignIn = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const validateSignUp = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email('Invalid email'),
});

export const validateJournal = yup.object().shape({
  journal_name: yup
    .string()
    .required()
    .max(30, 'Field must be have max 30 characters'),
});

export const validateNote = yup.object().shape({
  note_title: yup
    .string()
    .required()
    .max(20, 'Field must be have max 20 characters'),
  note_description: yup
    .string()
    .max(500, 'Field must be have max 500 characters'),
});
