import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Providers from '~/components/atoms/Providers';

// Mock next-themes so ThemeProvider renders without requiring browser APIs
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

describe('Providers Component', () => {
  it('renders without crashing', () => {
    render(
      <Providers>
        <div>Test Child</div>
      </Providers>,
    );

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('renders children passed to it', () => {
    render(
      <Providers>
        <span>Hello World</span>
      </Providers>,
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('wraps content inside the mocked ThemeProvider', () => {
    render(
      <Providers>
        <p>Nested content</p>
      </Providers>,
    );

    const provider = screen.getByTestId('theme-provider');
    expect(provider).toContainHTML('<p>Nested content</p>');
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <Providers>
        <div>Snapshot Test</div>
      </Providers>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
