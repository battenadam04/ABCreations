"use client";

import { useState, useEffect } from 'react';

const LikeButton = ({ postId } : {[key: string]: string}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const savedLikeStatus = localStorage.getItem(`liked-${postId}`);
    if (savedLikeStatus) {
      setLiked(JSON.parse(savedLikeStatus));
    }
  }, [postId]);

  const handleLikeClick = () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    localStorage.setItem(`liked-${postId}`, JSON.stringify(newLikeStatus));

    /** save like or dislike to db */
    fetch('/api/blogLikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        liked: newLikeStatus,
        postId,
      }),
    });
  };

  const numberOfLikes = 0;
  const numberOfDisLikes = 0;

  return (
    <div className="float-right">
    <button onClick={handleLikeClick}>
      {liked ? <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-thumb-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg> : <svg  xmlns="http://www.w3.org/2000/svg"  width="34"  height="34"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" /></svg>}
    </button>
    <span>{numberOfLikes}</span>   
    </div>
  );
};

export default LikeButton;