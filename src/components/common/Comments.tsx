'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Features4 from '../widgets/Features4';
import { IconUser } from '@tabler/icons-react';
import { format } from 'date-fns';
import Spinner from '../widgets/spinner';

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

const Comments = ({ postId }: { [key: string]: string }) => {
  const [comments, setComments] = useState<string[]>([]);

  const { data, error, isLoading } = useSWR(`/api/comments/${postId}`, fetcher);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (data && !error) {
      setComments(data.result);
    }
  }, [data, error]);

  const formattedComments = comments.map((comment: any) => {
    const formattedDate = format(comment.timestamp, 'dd-MM-yyyy HH:mm');
    return {
      title: comment.username,
      description: comment.comment,
      timestamp: formattedDate,
      icon: IconUser,
    };
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading comments</div>;

  return <Features4 data-testid="comments" columns={1} items={formattedComments} header={{ title: 'Comments' }} />;
};

export default Comments;
