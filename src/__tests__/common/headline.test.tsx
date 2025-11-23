import { render, screen } from '@testing-library/react';
import Headline from '~/components/common/Headline';

describe('Headline Component', () => {
  const defaultHeader = {
    title: 'Main Title',
    subtitle: 'This is a subtitle',
    tagline: 'Tagline text',
    position: 'center' as const,
  };

  it('renders title, subtitle, and tagline', () => {
    render(<Headline header={defaultHeader} />);

    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
    expect(screen.getByText('Tagline text')).toBeInTheDocument();
  });

  it('renders only title if subtitle and tagline are missing', () => {
    const header = { title: 'Only Title' };
    render(<Headline header={header} />);

    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText(/Tagline/)).not.toBeInTheDocument();
  });

  it('renders only subtitle if title and tagline are missing', () => {
    const header = { subtitle: 'Only Subtitle' };
    render(<Headline header={header} />);

    expect(screen.getByText('Only Subtitle')).toBeInTheDocument();
    expect(screen.queryByText(/Tagline/)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders only tagline if title and subtitle are missing', () => {
    const header = { tagline: 'Only Tagline' };
    render(<Headline header={header} />);

    expect(screen.getByText('Only Tagline')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText(/Subtitle/)).not.toBeInTheDocument();
  });

  it('renders nothing if title, subtitle, and tagline are missing', () => {
    const header = {};
    render(<Headline header={header as any} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText(/Tagline/)).not.toBeInTheDocument();
  });

  it('renders all elements with custom container, title, and subtitle classes', () => {
    const header = defaultHeader;
    render(
      <Headline
        header={header}
        containerClass="container-class"
        titleClass="title-class"
        subtitleClass="subtitle-class"
      />,
    );

    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
    expect(screen.getByText('Tagline text')).toBeInTheDocument();
  });

  it('renders elements for different positions', () => {
    ['left', 'center', 'right'].forEach((pos) => {
      const header = { ...defaultHeader, position: pos as any };
      const { unmount } = render(<Headline header={header} />);
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      unmount();
    });
  });
});
