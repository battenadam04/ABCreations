import { render, screen } from '@testing-library/react';
import Testimonials from '~/components/widgets/Testimonials';
import { Image, TestimonialsProps } from '~/shared/types';

describe('Testimonials', () => {
  const baseProps: TestimonialsProps = {
    id: 'testimonials-section',
    hasBackground: false,
    header: { title: 'What People Say' },
    isTestimonialUp: false,
    callToAction: undefined,
    testimonials: [
      {
        name: 'Alice',
        platform: 'Google',
        testimonial: 'Great service!',
        image: { src: '/img/john.png', alt: 'John' },
        href: 'https://google.com',
      },
      {
        name: 'Bob',
        platform: 'Trustpilot',
        testimonial: 'Amazing!',
        image: { src: '/img/john.png', alt: 'John' },
      },
    ],
  };

  test('renders headline when header is provided', () => {
    render(<Testimonials {...baseProps} />);
    expect(screen.getByRole('heading', { name: /what people say/i })).toBeInTheDocument();
  });

  test('renders all testimonial names and text', () => {
    render(<Testimonials {...baseProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText(/Great service/i)).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText(/Amazing/i)).toBeInTheDocument();
  });

  test('wraps testimonial with link when href exists and no callToAction', () => {
    render(<Testimonials {...baseProps} />);
    const link = screen.getByRole('link', { name: /alice/i });
    expect(link).toHaveAttribute('href', 'https://google.com');
  });

  test('does not wrap testimonial in link when callToAction exists', () => {
    render(<Testimonials {...baseProps} callToAction={{ text: 'Learn More', href: '/learn' }} />);

    // CTA should render
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();

    // No testimonial links
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(1); // only CTA link
  });

  test('renders CTA only when callToAction is provided', () => {
    const { rerender } = render(<Testimonials {...baseProps} />);
    expect(screen.queryByRole('link', { name: /learn more/i })).toBeNull();

    rerender(<Testimonials {...baseProps} callToAction={{ text: 'Learn More', href: '/learn' }} />);
    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument();
  });

  test('passes id to WidgetWrapper', () => {
    const { container } = render(<Testimonials {...baseProps} />);
    expect(container.querySelector('#testimonials-section')).toBeInTheDocument();
  });

  test('renders empty id when none is provided', () => {
    const { container } = render(<Testimonials {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Testimonials {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
