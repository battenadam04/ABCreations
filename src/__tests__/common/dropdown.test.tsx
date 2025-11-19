import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tab } from '~/shared/types';
import Dropdown from '~/components/common/Dropdown';

jest.mock('@tabler/icons-react', () => ({
  IconChevronDown: (props: any) => <svg data-testid="icon-down" {...props} />,
  IconChevronUp: (props: any) => <svg data-testid="icon-up" {...props} />,
  IconCheck: (props: any) => <svg data-testid="icon-check" {...props} />,
}));

const mockOptions: Tab[] = [
  { link: { label: 'Option A', href: '/' } },
  { link: { label: 'Option B', href: '/' } },
  { link: { label: 'Option C', href: '/' } },
];

describe('Dropdown', () => {
  const onActiveTabSelected = jest.fn();

  const setup = (activeTab = 0) =>
    render(
      <Dropdown
        options={mockOptions}
        activeTab={activeTab}
        onActiveTabSelected={onActiveTabSelected}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial selected option', () => {
    setup(1);
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    setup();
    fireEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('displays correct fallback icons (chevron down when closed, up when open)', () => {
    setup();
    expect(screen.getByTestId('icon-down')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Option A'));
    expect(screen.getByTestId('icon-up')).toBeInTheDocument();
  });

  it('selects an option and triggers callback', () => {
    setup();

    fireEvent.click(screen.getByText('Option A'));
    fireEvent.click(screen.getByText('Option B'));

    expect(onActiveTabSelected).toHaveBeenCalledTimes(1);
    expect(onActiveTabSelected).toHaveBeenCalledWith(1);
  });

  it('shows checkmark icon on active option', () => {
    setup(2);

    fireEvent.click(screen.getByText('Option C'));

    expect(screen.getByTestId('icon-check')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    setup();

    fireEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Option B')).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(screen.queryByText('Option B')).not.toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
  });
});
