import { render, screen } from '@testing-library/react';
import SocialProof from '~/components/widgets/SocialProof';

jest.mock('next/image', () => (props: any) => {
  return <img {...props} />;
});

describe('SocialProof', () => {
  const baseProps = {
    id: 'social-proof',
    images: [
      { src: '/img/logo1.png', alt: 'Logo One', link: 'https://one.com' },
      { src: '/img/logo2.png', alt: 'Logo Two', link: 'https://two.com' },
    ],
  };

  test('renders all images passed in props', () => {
    render(<SocialProof {...baseProps} />);

    const imgs = screen.getAllByRole('img');

    expect(imgs.length).toBe(2);
    expect(imgs[0]).toHaveAttribute('src', '/img/logo1.png');
    expect(imgs[1]).toHaveAttribute('src', '/img/logo2.png');
  });

  test('wraps each image with a link', () => {
    render(<SocialProof {...baseProps} />);

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute('href', 'https://one.com');
    expect(links[1]).toHaveAttribute('href', 'https://two.com');
  });

  test('passes id prop to WidgetWrapper', () => {
    const { container } = render(<SocialProof {...baseProps} />);

    expect(container.querySelector('#social-proof')).toBeInTheDocument();
  });

  test('renders an empty id when id is undefined', () => {
    const { container } = render(<SocialProof {...baseProps} id={undefined} />);

    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<SocialProof {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
