import { render, screen } from '@testing-library/react';
import Footer from '~/components/widgets/Footer';

describe('Footer', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(<Footer />);
    container = rendered.container;
  });

  test('renders the footer title', () => {
    expect(screen.getByText('AB Creation Labs Ltd')).toBeInTheDocument();
  });

  test('renders top-level footer links', () => {
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  test('renders column titles', () => {
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Platform')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  test('renders column links', () => {
    expect(screen.getByText('T-shirts')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('goodreads')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  test('renders social links using aria-labels', () => {
    const socialLinks = ['Twitter', 'Facebook'];
    socialLinks.forEach((label) => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
    });
  });

  test('renders the footnote with link', () => {
    const link = screen.getByRole('link', { name: /Adam Batten/i });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/adam-batten-92850243/');
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
