'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Form from './Form';
import { IAddComment, IsubmitComment } from '~/shared/interfaces/addComment';

const fetcher = (url: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const AddComment = ({ postId, formData }: IAddComment) => {
  const [comment, setComment] = useState<string>('');

  const { data, error } = useSWR(`/api/new-comment/${postId}`, fetcher);

  useEffect(() => {
    if (data && !error) {
      setComment(data.comments);
    } else if (error) {
      console.error('Failed to fetch totalLikes:', error);
    }
  }, [data, error]);

  const handleAddComment = ({ username, comment }: IsubmitComment) => {
    console.log('testing comment', username, comment);

    /** save like to db */
    fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        username,
        comment,
      }),
    });
  };

  return <Form {...formData} customSubmission={handleAddComment} />;
};

export default AddComment;
