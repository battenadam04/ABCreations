import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CTA from '~/components/common/CTA';

jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );

  MockLink.displayName = "MockNextLink";

  return MockLink;
});

jest.mock('tailwind-merge', () => ({
  twMerge: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

const MockIcon = ({ className }: { className?: string }) => <div data-testid="mock-icon" className={className} />;

describe('CTA Component', () => {
  const baseProps = {
    callToAction: {
      text: 'Click Here',
      href: '/test',
      targetBlank: false,
      icon: undefined,
    },
    containerClass: '',
    linkClass: '',
    iconClass: '',
  };

  it('renders text', () => {
    render(<CTA {...baseProps} />);
    expect(screen.getByText('Click Here')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const props = {
      ...baseProps,
      callToAction: { ...baseProps.callToAction, icon: MockIcon },
    };
    render(<CTA {...props} />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('opens in new tab when targetBlank is true', () => {
    const props = {
      ...baseProps,
      callToAction: { ...baseProps.callToAction, targetBlank: true },
    };
    render(<CTA {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render when missing text and icon', () => {
    const props = {
      ...baseProps,
      callToAction: { text: '', href: '/test', icon: undefined },
    };
    const { container } = render(<CTA {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies container and link classes', () => {
    const props = {
      ...baseProps,
      containerClass: 'container-x',
      linkClass: 'link-y',
    };
    render(<CTA {...props} />);
    const link = screen.getByRole('link');
    expect(link.parentElement).toHaveClass('container-x');
    expect(link).toHaveClass('link-y');
  });

  it('renders snapshot', () => {
    const { container } = render(<CTA {...baseProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
