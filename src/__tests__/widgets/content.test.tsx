import { render, screen } from '@testing-library/react';
import Content from '~/components/widgets/Content';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub';
  },
}));

describe('Content', () => {
  const baseProps = {
    id: 'content-section',
    hasBackground: false,
    header: { title: 'Our Features' },
    content: 'Discover what we offer',
    items: [
      { title: 'Feature A', description: 'Description A' },
      { title: 'Feature B', description: 'Description B' },
    ],
    image: {
      src: '/image.png',
      alt: 'Example Image',
    },
    isReversed: false,
    isAfterContent: false,
  };

  test('renders header when provided', () => {
    render(<Content {...baseProps} />);
    expect(screen.getByText('Our Features')).toBeInTheDocument();
  });

  test('renders content text when provided', () => {
    render(<Content {...baseProps} />);
    expect(screen.getByText('Discover what we offer')).toBeInTheDocument();
  });

  test('renders ItemGrid items by visible text', () => {
    render(<Content {...baseProps} />);
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Description A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByText('Description B')).toBeInTheDocument();
  });

  test('renders the image when provided', () => {
    render(<Content {...baseProps} />);
    expect(screen.getByText('Next image stub')).toBeInTheDocument();
  });

  test('does not render image when not provided', () => {
    const props = { ...baseProps, image: undefined };
    render(<Content {...props} />);
    expect(screen.queryByTestId('next-image')).toBeNull();
  });

  test('applies reversed layout when isReversed=true', () => {
    const props = { ...baseProps, isReversed: true };
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.md\\:flex-row-reverse')).toBeInTheDocument();
  });

  test('does not apply reversed layout when isReversed=false', () => {
    const { container } = render(<Content {...baseProps} />);
    expect(container.querySelector('.md\\:flex-row-reverse')).toBeNull();
  });

  test('applies after-content padding when isAfterContent=true', () => {
    const props = { ...baseProps, isAfterContent: true };
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.pb-12')).toBeInTheDocument();
  });

  test('renders id attribute on WidgetWrapper', () => {
    const { container } = render(<Content {...baseProps} />);
    expect(container.querySelector('#content-section')).toBeInTheDocument();
  });

  test('renders empty id when none provided', () => {
    const { container } = render(<Content {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Content {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
