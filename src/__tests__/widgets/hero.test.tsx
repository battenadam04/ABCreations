import { render, screen, cleanup } from '@testing-library/react';
import Hero from '~/components/widgets/Hero';

jest.mock('next/image', () => {
  const NextImage = ({ src, alt, ...rest }: any) => <img src={src} alt={alt ?? ''} {...rest} />;
  return NextImage;
});

describe('Hero', () => {
  const baseProps = {
    title: 'Welcome to Our Site',
    subtitle: 'We provide awesome solutions',
    tagline: 'Your Success',
    callToAction: { text: 'Get Started', href: '/get-started' },
    callToAction2: { text: 'Learn More', href: '/learn-more' },
    image: { src: '/hero.png', alt: 'Hero Image' },
  };

  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(<Hero {...baseProps} />);
    container = rendered.container;
  });

  afterEach(() => {
    cleanup();
  });

  test('renders tagline if provided', () => {
    expect(screen.getByText('Your Success')).toBeInTheDocument();
  });

  test('renders title if provided', () => {
    expect(screen.getByText('Welcome to Our Site')).toBeInTheDocument();
  });

  test('renders subtitle if provided', () => {
    expect(screen.getByText('We provide awesome solutions')).toBeInTheDocument();
  });

  test('renders primary CTA if provided', () => {
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Get Started').closest('a')).toHaveAttribute('href', '/get-started');
  });

  test('renders secondary CTA if provided', () => {
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Learn More').closest('a')).toHaveAttribute('href', '/learn-more');
  });

  test('renders image if provided', () => {
    const img = screen.getByAltText('Hero Image'); // use the alt text
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/hero.png');
  });

  test('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('does not render optional elements when not provided', () => {
    cleanup();
    const props = { title: 'Only Title' };
    const { container: optionalContainer } = render(<Hero {...props} />);
    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText('Your Success')).toBeNull();
    expect(screen.queryByText('Get Started')).toBeNull();
    expect(screen.queryByTestId('next-image')).toBeNull();
    expect(optionalContainer).toMatchSnapshot();
  });
});
