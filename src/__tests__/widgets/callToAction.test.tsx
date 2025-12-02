import { render, screen } from '@testing-library/react';
import CallToAction from '~/components/widgets/CallToAction';

describe('CallToAction', () => {
  const baseProps = {
    id: 'cta-section',
    hasBackground: false,
    title: 'Main Title',
    subtitle: 'Sub Title',
    callToAction: { text: 'Click here', href: '/test' },
  };

  test('renders title when provided', () => {
    render(<CallToAction {...baseProps} />);
    expect(screen.getByText('Main Title')).toBeInTheDocument();
  });

  test('does not render title when not provided', () => {
    const updatedProps = { ...baseProps, title: '' };
    render(<CallToAction {...updatedProps} />);
    expect(screen.queryByRole('heading')).toBeNull();
  });

  test('renders subtitle when provided', () => {
    render(<CallToAction {...baseProps} subtitle="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  test('does not render subtitle when not provided', () => {
    render(<CallToAction {...baseProps} />);
    expect(screen.queryByText(/gray-600/)).toBeNull();
  });

  test('renders CTA button when text and href exist', () => {
    render(<CallToAction {...baseProps} />);
    expect(screen.getByRole('link', { name: 'Click here' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  test('does not render CTA when text is missing', () => {
    render(<CallToAction {...baseProps} callToAction={{ text: '', href: '/test' }} />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  test('does not render CTA when href is missing', () => {
    render(<CallToAction {...baseProps} callToAction={{ text: 'Click here', href: '' }} />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  test('passes id to WidgetWrapper', () => {
    const { container } = render(<CallToAction {...baseProps} />);
    expect(container.querySelector('#cta-section')).toBeInTheDocument();
  });

  test('renders empty id value when id is not provided', () => {
    const { container } = render(<CallToAction {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<CallToAction {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
