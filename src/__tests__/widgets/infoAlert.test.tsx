import { render, screen } from '@testing-library/react';
import InfoAlert from '~/components/widgets/infoAlert';

describe('InfoAlert', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(<InfoAlert value="Dynamic info message" />);
    container = rendered.container;
  });

  test('renders the alert container with role="alert"', () => {
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('renders the static heading', () => {
    expect(screen.getByText('This is a info alert')).toBeInTheDocument();
  });

  test('renders the passed value', () => {
    expect(screen.getByText('Dynamic info message')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
