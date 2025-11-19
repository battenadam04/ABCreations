import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddComment from '~/components/common/AddComment';

const mockMutate = jest.fn();
jest.mock('swr', () => ({
  __esModule: true,
  default: () => ({
    mutate: mockMutate,
  }),
}));

global.fetch = jest.fn();

describe('AddComment Component', () => {
  const postId = '12345';

  beforeEach(() => {
    jest.clearAllMocks();
  })


it('submits the form and calls fetch + mutate', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: () => ({})
  });

  render(<AddComment postId={postId} />);

  const usernameInput = screen.getByPlaceholderText(/username/i);
  const commentInput = screen.getByPlaceholderText(/comment/i);
  const submitButton = screen.getByRole('button', { name: /Add comment/i });

  await userEvent.type(usernameInput, 'John');
  await userEvent.type(commentInput, 'Great post!');

  await userEvent.click(submitButton);

  expect(fetch).toHaveBeenCalledWith('/api/addComment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      postId,
      username: 'John',
      comment: 'Great post!',
    }),
  });

  expect(mockMutate).toHaveBeenCalledTimes(1);
});

  it('matches snapshot', () => {
    const { container } = render(<AddComment postId={postId} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
