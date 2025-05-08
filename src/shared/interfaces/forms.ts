export interface contactFormValues {
  name: string;
  email: string;
  message: string;
  policy?: boolean;
  lastName?: string | null;
  doNotSaveEmail?: boolean; // Ensure this is included
  [key: string]: any; // This line allows any dynamic string to be used as an index
}
