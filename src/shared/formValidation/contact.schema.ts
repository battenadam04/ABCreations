import * as Yup from 'yup';

// 1. policy should be selected

export const contactSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  lastName: Yup.string().nullable(),
  email: Yup.string().required('Email is required'),
  message: Yup.string().required('Message is required'),
  policy: Yup.bool().oneOf([true], 'You must accept our terms and conditions'),
}).required();
