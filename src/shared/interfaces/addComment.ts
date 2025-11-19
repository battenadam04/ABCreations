import { FormProps } from '../types';

export interface IAddComment {
  postId: string;
}

export interface IsubmitComment {
  username: string;
  comment: string;
  onCommentAdded: () => void;
}

export interface ICommentsFormData {
  id: string;
  hasBackground: boolean;
  header: {
    title: string;
  };
  form: FormProps;
}
