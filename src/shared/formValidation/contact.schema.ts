import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Username must be at least 3 characters long"),
  lastName: Yup.string().nullable(),
  email: Yup.string().required("Email is required"),
  reason: Yup.string().nullable(),
  message: Yup.string().required("Message is required"),
  checkboxes: Yup.string().required(''),
}).required();