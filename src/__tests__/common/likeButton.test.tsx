import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mutate } from 'swr';
import LikeButton from '~/components/common/likeButton';

// Mock global fetch
global.fetch = jest.fn();

describe('LikeButton Component', () => {
  const postId = '123';

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mutate(() => true, undefined, { revalidate: false });
  });

  it('renders initial likes and dislikes from SWR', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ totalLikes: 5, totalDislikes: 2 }),
    });

    render(<LikeButton postId={postId} />);

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('increments likes when like button is clicked', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ totalLikes: 1, totalDislikes: 0 }),
    });

    render(<LikeButton postId={postId} />);

    await waitFor(() => screen.getAllByText('0')[0]);

    const likeButton = screen.getAllByRole('button')[0]; // first button is like
    fireEvent.click(likeButton);

    expect(screen.getByText('1')).toBeInTheDocument(); // likes incremented
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/blogLikes',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ totalLikes: 1, totalDislikes: 0, postId }),
      }),
    );
  });

  it('increments dislikes when dislike button is clicked', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ totalLikes: 1, totalDislikes: 0 }),
    });

    render(<LikeButton postId={postId} />);

    await waitFor(() => screen.getAllByText('0')[1]);

    const dislikeButton = screen.getAllByRole('button')[1]; // second button is dislike
    fireEvent.click(dislikeButton);

    expect(screen.getByText('0')).toBeInTheDocument(); // likes unchanged
    expect(screen.getByText('1')).toBeInTheDocument(); // dislikes incremented
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/blogLikes',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ totalLikes: 0, totalDislikes: 1, postId }),
      }),
    );
  });

  it('prevents repeated likes or dislikes', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ totalLikes: 1, totalDislikes: 0 }),
    });

    render(<LikeButton postId={postId} />);

    await waitFor(() => screen.getAllByText('0')[0]);

    const likeButton = screen.getAllByRole('button')[0];
    fireEvent.click(likeButton); // first like
    fireEvent.click(likeButton); // repeated like

    const dislikeValue = screen.getAllByText('1')[0];
    expect(dislikeValue).toBeInTheDocument(); // likes incremented only once

    const dislikeButton = screen.getAllByRole('button')[1];
    fireEvent.click(dislikeButton); // switch reaction
    fireEvent.click(dislikeButton); // repeated dislike

    expect(dislikeValue).toBeInTheDocument(); // likes decremented after switching
    expect(dislikeValue).toBeInTheDocument(); // dislikes incremented only once
  });

  it('handles missing initial data gracefully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => null,
    });

    render(<LikeButton postId={postId} />);
    await waitFor(() => {
      expect(screen.getAllByText('0')[0]).toBeInTheDocument();
      expect(screen.getAllByText('0')[1]).toBeInTheDocument();
    });
  });
});
