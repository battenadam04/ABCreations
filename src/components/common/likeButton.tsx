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

const LikeButton = ({ postId }: { [key: string]: string }) => {
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false); // Track if the user has liked the post

  const { data, error } = useSWR(`/api/blogLikes/${postId}`, fetcher);

  useEffect(() => {
    if (data && !error) {
      setTotalLikes(Number(data.totalLikes));
      setUserLiked(data.userHasLiked);
    } else if (error) {
      console.error('Failed to fetch totalLikes:', error);
    }
  }, [data, error]);

  const handleLikeClick = () => {
    const updatedLikes = userLiked ? totalLikes - 1 : totalLikes + 1;

    setTotalLikes(updatedLikes);
    setUserLiked(!userLiked);

    /** save like to db */
    fetch('/api/blogLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalLikes: updatedLikes,
        postId,
      }),
    });
  };

  return (
    <div className="float-right">
      <button onClick={handleLikeClick}>
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
          </svg>
        }
      </button>
      <span>{totalLikes}</span>
    </div>
  );
};

export default LikeButton;
