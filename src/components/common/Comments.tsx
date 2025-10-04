'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const Comments = ({ postId }: { [key: string]: string }) => {
  const [comments, setComments] = useState<string[]>([]);

  const { data, error } = useSWR(`/api/comments/${postId}`, fetcher);

  useEffect(() => {
    if (data && !error) {
      console.log('all comments', data);
      setComments(data.comments);
    } else if (error) {
      console.error('Failed to fetch  comments:', error);
    }
  }, [data, error]);

  return (
    <div className="">
      {comments.map((comment: any) => {
        return (
          <div key={comment.id}>
            <p>{comment.username}</p>
            <p>{comment.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
