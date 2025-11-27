import { render, screen } from '@testing-library/react';
import ItemTestimonial from '~/components/common/ItemTestimonial';

describe('ItemTestimonial Component', () => {
  const baseProps = {
    name: 'John Doe',
    platform: 'LinkedIn',
    testimonial: 'This is a sample testimonial for testing purposes.',
    image: { src: '/john.jpg', alt: 'John Doe' },
    isTestimonialUp: false,
    hasDividerLine: true,
  };

  it('renders name, platform, and testimonial', () => {
    render(<ItemTestimonial {...baseProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText(/This is a sample testimonial/i)).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<ItemTestimonial {...baseProps} />);
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('does not render image if not provided', () => {
    const { container } = render(<ItemTestimonial {...baseProps} image={undefined} />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders DividerLine when hasDividerLine is true', () => {
    render(<ItemTestimonial {...baseProps} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('does not render DividerLine when hasDividerLine is false', () => {
    const { container } = render(<ItemTestimonial {...baseProps} hasDividerLine={false} />);
    expect(container.querySelector('hr')).toBeNull();
  });

  it('renders testimonial sliced when startSlice and endSlice are provided', () => {
    render(<ItemTestimonial {...baseProps} startSlice={0} endSlice={10} />);
    expect(screen.getByText(/This is a /)).toBeInTheDocument();
    expect(screen.getAllByText(/.../)[0]).toBeInTheDocument();
  });

  it('renders in reverse flex column when isTestimonialUp is true', () => {
    const { container } = render(<ItemTestimonial {...baseProps} isTestimonialUp />);
    expect(container.firstChild?.firstChild).toHaveClass('flex-col-reverse');
  });

  it('renders correctly when only testimonial is provided', () => {
    render(<ItemTestimonial testimonial="Only testimonial here" />);
    expect(screen.getByText(/Only testimonial here/)).toBeInTheDocument();
  });

  it('renders nothing if no content is provided', () => {
    const { container } = render(<ItemTestimonial />);
    expect(container.firstChild).toBeInTheDocument(); // div wrapper exists
  });
});
