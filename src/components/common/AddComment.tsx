'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Form from './Form';
import { IAddComment, IsubmitComment } from '~/shared/interfaces/addComment';
import { commentsData } from '~/shared/data/pages/blogs.data';

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const AddComment = ({ postId }: IAddComment) => {

  const { data: comments, error, mutate } = useSWR(`/api/comments/${postId}`, fetcher);

  const handleAddComment = ({ username, comment, onCommentAdded }: IsubmitComment) => {
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
    }).then(() => mutate());
  };

  return <Form {...commentsData.form} customSubmission={handleAddComment} containerClass="mt-15" />;
};

export default AddComment;
