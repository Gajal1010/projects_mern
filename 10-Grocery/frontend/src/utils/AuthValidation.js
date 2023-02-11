import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Please provide a name!'),
  email: yup
    .string()
    .email('Please provide a valid email!')
    .required('Please provide a email!'),
  password: yup.string().min(4).required('Please provide a password!'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email!')
    .required('Please provide a email!'),
  password: yup.string().min(4).required('Please provide a password!'),
});