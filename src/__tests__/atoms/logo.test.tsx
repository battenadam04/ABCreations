import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '~/components/atoms/Logo';

describe('Logo Component', () => {
  it('renders without crashing', () => {
    render(<Logo />);
    const element = screen.getByText(/AB Creative Labs/i);
    expect(element).toBeInTheDocument();
  });

  it('renders the correct text', () => {
    render(<Logo />);
    expect(screen.getByText('AB Creative Labs')).toBeInTheDocument();
  });

  it('has the correct CSS classes', () => {
    render(<Logo />);
    const element = screen.getByText(/AB Creative Labs/i);

    expect(element).toHaveClass(
      'ml-2',
      'self-center',
      'whitespace-nowrap',
      'text-2xl',
      'font-bold',
      'text-gray-900',
      'dark:text-white',
      'md:text-xl',
    );
  });

  it('matches the snapshot', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('is accessible by role if wrapped later', () => {
    // Not strictly needed now but ensures future compatibility
    render(<Logo />);
    const element = screen.getByText(/AB Creative Labs/i);
    expect(element.tagName.toLowerCase()).toBe('span');
  });
});
