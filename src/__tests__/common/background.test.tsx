import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Background from '~/components/common/Background';

describe('Background Component', () => {
  it('renders children correctly', () => {
    render(
      <Background hasBackground={true}>
        <p>Test Child</p>
      </Background>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies background classes when hasBackground = true', () => {
    render(
      <Background hasBackground={true}>
        <div>Child</div>
      </Background>,
    );

    const container = screen.getByText('Child').parentElement;

    expect(container).toHaveClass('absolute');
    expect(container).toHaveClass('inset-0');
    expect(container).toHaveClass('bg-primary-50');
    expect(container).toHaveClass('dark:bg-slate-800');
  });

  it('applies transparent background when hasBackground = false', () => {
    render(
      <Background hasBackground={false}>
        <div>Child</div>
      </Background>,
    );

    const container = screen.getByText('Child').parentElement;

    expect(container).toHaveClass('bg-transparent');
    expect(container).not.toHaveClass('bg-primary-50');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Background hasBackground={true}>
        <span>Snapshot</span>
      </Background>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
