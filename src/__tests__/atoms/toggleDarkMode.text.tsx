import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToggleDarkMode from '~/components/atoms/ToggleDarkMode';


// Mock icons to simple identifiable components
jest.mock('@tabler/icons-react', () => ({
  IconSun: (props: any) => <div data-testid="icon-sun" {...props} />,
  IconMoon: (props: any) => <div data-testid="icon-moon" {...props} />,
}));

// Mock next-themes
const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    systemTheme: 'light',
    setTheme: mockSetTheme
  }),
}));

describe('ToggleDarkMode Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it('renders the button with correct aria label', () => {
    render(<ToggleDarkMode />);
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument();
  });

  it('renders placeholder before mounting', () => {
    const { container } = render(<ToggleDarkMode />);
    const placeholder = container.querySelector('div.h-5.w-5');
    // First render happens before useEffect (mounted = false)
    expect(placeholder).toBeInTheDocument();
  });

  it('renders IconSun when theme = light and mounted = true', () => {
    render(<ToggleDarkMode />);

    // After first render, useEffect triggers synchronously in test env
    expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
  });

  it('toggles theme from light → dark on click', () => {
    render(<ToggleDarkMode />);

    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('matches snapshot', () => {
    const { container } = render(<ToggleDarkMode />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
