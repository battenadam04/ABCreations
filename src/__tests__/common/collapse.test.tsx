import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collapse from '~/components/common/Collapse';

jest.mock('~/hooks/useCollapse', () => ({
  __esModule: true,
  default: () => ({
    activeIndex: 0,
    handleSetIndex: jest.fn(),
  }),
}));

jest.mock('@tabler/icons-react', () => ({
  IconChevronDown: (props: any) => <div data-testid="icon-down" {...props} />,
  IconChevronUp: (props: any) => <div data-testid="icon-up" {...props} />,
}));

describe('Collapse Component', () => {
  const items = [
    { title: 'Title 1', description: 'Description 1' },
    { title: 'Title 2', description: 'Description 2' },
  ];
  const classCollapseItem = 'test-collapse-item';

  it('renders all items', () => {
    render(<Collapse items={items} classCollapseItem={classCollapseItem} />);
    items.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('applies classCollapseItem to each item', () => {
    render(<Collapse items={items} classCollapseItem={classCollapseItem} />);
    const elements = screen.getAllByRole('button');
    elements.forEach((el) => {
      expect(el.parentElement).toHaveClass(classCollapseItem);
    });
  });

  it('renders default icons for active and inactive items', () => {
    render(<Collapse items={items} classCollapseItem={classCollapseItem} />);
    expect(screen.getAllByTestId('icon-up')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-down')[0]).toBeInTheDocument();
  });

  it('renders custom icons if provided', () => {
    const CustomUp = <div data-testid="custom-up" />;
    const CustomDown = <div data-testid="custom-down" />;
    render(<Collapse items={items} classCollapseItem={classCollapseItem} iconUp={CustomUp} iconDown={CustomDown} />);
    expect(screen.getByTestId('custom-up')).toBeInTheDocument();
    expect(screen.getByTestId('custom-down')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Collapse items={items} classCollapseItem={classCollapseItem} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
