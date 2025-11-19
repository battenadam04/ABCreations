import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleMenuProps } from '~/shared/types';
import ToggleMenu from '~/components/atoms/ToggleMenu';

// Mock icons
jest.mock('@tabler/icons-react', () => ({
  IconMenu: (props: any) => <div data-testid="icon-menu" {...props} />,
  IconX: (props: any) => <div data-testid="icon-x" {...props} />,
}));

describe('ToggleMenu Component', () => {
  const mockHandler = jest.fn();

  const setup = (props: Partial<ToggleMenuProps> = {}) => {
    const defaultProps: ToggleMenuProps = {
      handleToggleMenuOnClick: mockHandler,
      isToggleMenuOpen: false,
      ...props,
    };

    return render(<ToggleMenu {...defaultProps} />);
  };

  beforeEach(() => {
    mockHandler.mockClear();
  });

  it('renders the button with correct aria-label', () => {
    setup();
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('shows IconMenu when isToggleMenuOpen = false', () => {
    setup({ isToggleMenuOpen: false });
    expect(screen.getByTestId('icon-menu')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
  });

  it('shows IconX when isToggleMenuOpen = true', () => {
    setup({ isToggleMenuOpen: true });
    expect(screen.getByTestId('icon-x')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-menu')).not.toBeInTheDocument();
  });

  it('calls the click handler when clicked', () => {
    setup();

    const button = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(button);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });
});
