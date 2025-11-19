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
  const [totalDislikes, setTotalDislikes] = useState<number>(0);
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | undefined>(undefined);
  const { data, error } = useSWR(`/api/blogLikes/${postId}`, fetcher);

  useEffect(() => {
    if (data && !error) {
      console.log('check likes ', data);
      setTotalLikes(Number(data.totalLikes));
      setTotalDislikes(Number(data.totalDislikes));
    } else if (error) {
      console.error('Failed to fetch totalLikes:', error);
    }
  }, [data, error]);

  const handleLikeClick = (liked: boolean) => {
    /** prevent repeated likes */
    if ((userReaction === 'like' && liked) || (userReaction === 'dislike' && !liked)) {
      return;
    }

    let updatedLikes = liked ? totalLikes + 1 : totalLikes;
    let updatedDislikes = !liked ? totalDislikes + 1 : totalDislikes;

    if (liked && userReaction === 'dislike') {
      updatedDislikes = updatedDislikes - 1;
    }

    if (!liked && userReaction === 'like') {
      updatedLikes = updatedLikes - 1;
    }

    setUserReaction(liked ? 'like' : 'dislike');
    setTotalLikes(updatedLikes);
    setTotalDislikes(updatedDislikes);

    /** save like to db */
    fetch('/api/blogLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalLikes: updatedLikes,
        totalDislikes: updatedDislikes,
        postId,
      }),
    });
  };

  return (
    <div className="flex justify-end gap-2 text-center">
      <button onClick={() => handleLikeClick(true)} className="hover:text-sky-300">
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
      <span className="w-8">{totalLikes}</span>
      <button onClick={() => handleLikeClick(false)} className="hover:text-sky-300">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
          </svg>
        }
      </button>
      <span className="w-8">{totalDislikes}</span>
    </div>
  );
};

export default LikeButton;
