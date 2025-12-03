import { render, screen } from '@testing-library/react';
import Features from '~/components/widgets/Features';
import { FeaturesProps } from '~/shared/types';

describe('Features', () => {
  const baseProps: FeaturesProps = {
    id: 'features-section',
    hasBackground: false,
    header: { title: 'Our Features' },
    items: [
      { title: 'Fast', description: 'Super quick performance' },
      { title: 'Reliable', description: 'Always available' },
      { title: 'Secure', description: 'Protected by design' },
    ],
    columns: 3,
  };

  test('renders header when provided', () => {
    render(<Features {...baseProps} />);
    expect(screen.getByText('Our Features')).toBeInTheDocument();
  });

  test('renders all feature titles', () => {
    render(<Features {...baseProps} />);
    expect(screen.getByText('Fast')).toBeInTheDocument();
    expect(screen.getByText('Reliable')).toBeInTheDocument();
    expect(screen.getByText('Secure')).toBeInTheDocument();
  });

  test('renders all feature descriptions', () => {
    render(<Features {...baseProps} />);
    expect(screen.getByText('Super quick performance')).toBeInTheDocument();
    expect(screen.getByText('Always available')).toBeInTheDocument();
    expect(screen.getByText('Protected by design')).toBeInTheDocument();
  });

  test('passes id to WidgetWrapper', () => {
    const { container } = render(<Features {...baseProps} />);
    expect(container.querySelector('#features-section')).toBeInTheDocument();
  });

  test('renders empty id when none provided', () => {
    const { container } = render(<Features {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('applies 2-column class modifiers when columns=2', () => {
    const { container } = render(<Features {...baseProps} columns={2} />);
    expect(container.querySelector('.max-w-5xl')).toBeInTheDocument();
    expect(container.querySelector('.sm\\:max-w-md')).toBeInTheDocument();
  });

  test('does not apply 2-column modifiers when columns!=2', () => {
    const { container } = render(<Features {...baseProps} columns={3} />);
    expect(container.querySelector('.max-w-5xl')).toBeNull();
    expect(container.querySelector('.sm\\:max-w-md')).toBeNull();
  });

  // Snapshot test
  test('matches snapshot', () => {
    const { container } = render(<Features {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
