export interface IAddComment {
  postId: string;
  formData: { [key: string]: string };
}

export interface IsubmitComment {
  username: string;
  comment: string;
}
