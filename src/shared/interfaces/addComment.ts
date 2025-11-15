export interface IAddComment {
  postId: string;
}

export interface IsubmitComment {
  username: string;
  comment: string;
  onCommentAdded: () => void;
}
