import { render, screen } from '@testing-library/react';
import Comparison from '~/components/widgets/Comparison';
import { IconCheck, IconMinus } from '@tabler/icons-react';

jest.mock('@tabler/icons-react', () => ({
  IconCheck: jest.fn(() => <div data-testid="mock-check" />),
  IconMinus: jest.fn(() => <div data-testid="mock-minus" />),
}));

describe('Comparison', () => {
  const baseProps = {
    id: 'compare-section',
    hasBackground: false,
    header: { title: 'Compare Plans' },
    columns: [
      {
        title: 'Features',
        items: [{ title: 'Fast support' }, { title: true }, { title: false }],
      },
      {
        title: 'Basic',
        items: [{ title: 'Fast support' }, { title: true }, { title: false }],
        callToAction: { text: 'Choose Basic', href: '/basic' },
      },
    ],
  };

  test('renders header when provided', () => {
    render(<Comparison {...baseProps} />);
    expect(screen.getByText('Compare Plans')).toBeInTheDocument();
  });

  test('renders all column titles', () => {
    render(<Comparison {...baseProps} />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
  });

  test('renders IconCheck when item title is true', () => {
    render(<Comparison {...baseProps} />);

    expect(IconCheck).toHaveBeenCalled();
    expect(screen.getAllByTestId('mock-check').length).toBeGreaterThan(0);
  });

  test('renders IconMinus when item title is false', () => {
    render(<Comparison {...baseProps} />);

    expect(IconMinus).toHaveBeenCalled();
    expect(screen.getAllByTestId('mock-minus').length).toBeGreaterThan(0);
  });

  test('renders CTA only in non-first columns when callToAction exists', () => {
    render(<Comparison {...baseProps} />);
    expect(screen.getByRole('link', { name: 'Choose Basic' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/basic');
  });

  test('first column does not render CTA even if provided', () => {
    const modified = {
      ...baseProps,
      columns: [
        {
          ...baseProps.columns[0],
          callToAction: { text: 'Should Not Show', href: '/no' },
        },
        baseProps.columns[1],
      ],
    };
    render(<Comparison {...modified} />);
    expect(screen.queryByText('Should Not Show')).toBeNull();
  });

  test('passes id to WidgetWrapper', () => {
    const { container } = render(<Comparison {...baseProps} />);
    expect(container.querySelector('#compare-section')).toBeInTheDocument();
  });

  test('renders empty id attribute when id is not provided', () => {
    const { container } = render(<Comparison {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Comparison {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
