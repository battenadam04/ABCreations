import * as Yup from 'yup';

// 1. policy should be selected

export const annoucementSchema = Yup.object({
  email: Yup.string().required('Email is required'),
}).required();
