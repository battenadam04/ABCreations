import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comments from '~/components/common/Comments';

jest.mock('swr');
jest.mock('date-fns', () => ({
  format: jest.fn(() => '01-01-2025 12:00'),
}));

jest.mock('~/components/widgets/spinner', () => {
  const MockSpinner = () => <div data-testid="spinner" />;
  MockSpinner.displayName = "MockSpinner";
  return MockSpinner;
});

jest.mock('~/components/widgets/Features4', () => {
  const MockFeatures4 = (props: any) => <div data-testid="features" {...props} />;
  MockFeatures4.displayName = "MockFeatures4";
  return MockFeatures4;
});

const useSWRMock = require('swr');

describe('Comments Component', () => {
  const mockData = {
    result: [
      {
        username: 'John',
        comment: 'Nice post!',
        timestamp: 1700000000000,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders spinner when loading', () => {
    useSWRMock.default = jest.fn().mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<Comments postId="123" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders error message', () => {
    useSWRMock.default = jest.fn().mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(<Comments postId="123" />);
    expect(screen.getByText('Error loading comments')).toBeInTheDocument();
  });

  //TODO: May be redundant as we will test feature4 component anyway
  it.skip('renders comments', async () => {
    useSWRMock.default = jest.fn().mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    render(<Comments postId="123" />);

    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Nice post!')).toBeInTheDocument();
    expect(screen.getByText('01-01-2025 12:00')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    useSWRMock.default = jest.fn().mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    const { container } = render(<Comments postId="123" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
