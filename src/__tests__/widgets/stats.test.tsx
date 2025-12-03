import { render, screen } from '@testing-library/react';
import Stats from '~/components/widgets/Stats';

jest.mock('~/utils/utils', () => ({
  getSuffixNumber: jest.fn((n) => `${n}+`), // deterministic mock for testing
}));

describe('Stats', () => {
  const baseProps = {
    id: 'stats-section',
    hasBackground: false,
    items: [
      { title: 1000, description: 'Users' },
      { title: 2500, description: 'Downloads' },
      { title: 75, description: 'Countries' },
      { title: 10, description: 'Awards' },
    ],
  };

  test('renders all stat numbers via getSuffixNumber', () => {
    render(<Stats {...baseProps} />);

    expect(screen.getByText('1000+')).toBeInTheDocument();
    expect(screen.getByText('2500+')).toBeInTheDocument();
    expect(screen.getByText('75+')).toBeInTheDocument();
    expect(screen.getByText('10+')).toBeInTheDocument();
  });

  test('renders all descriptions', () => {
    render(<Stats {...baseProps} />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(screen.getByText('Awards')).toBeInTheDocument();
  });

  test('renders the correct number of stat items', () => {
    render(<Stats {...baseProps} />);
    const items = screen.getAllByText(/.+\+/); // matches "1000+", "2500+", etc.
    expect(items.length).toBe(4);
  });

  test('passes id to WidgetWrapper', () => {
    const { container } = render(<Stats {...baseProps} />);
    expect(container.querySelector('#stats-section')).toBeInTheDocument();
  });

  test('renders empty id when none is provided', () => {
    const { container } = render(<Stats {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Stats {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
