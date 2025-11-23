import { render, screen, waitFor } from '@testing-library/react';
import ItemGrid from '~/components/common/ItemGrid';
import { IconMenu, IconX } from '@tabler/icons-react';

describe('ItemGrid Component', () => {
  const items = [
    { title: 'Item 1', description: 'Description 1', icon: IconMenu, callToAction: { text: 'Go' }, timestamp: '10:00' },
    { title: 'Item 2', description: 'Description 2', icon: IconX, callToAction: { text: 'Click' } },
    { title: 'Item 3' }, // Only title
  ];

  const defaultProps = {
    id: 'test-grid',
    items,
    defaultColumns: 3,
    defaultIcon: IconMenu, // real default icon
    containerClass: 'container-class',
    panelClass: 'panel-class',
    iconClass: 'icon-class',
    titleClass: 'title-class',
    descriptionClass: 'description-class',
    actionClass: 'action-class',
  };

  it('renders all item titles', () => {
    render(<ItemGrid {...defaultProps} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<ItemGrid {...defaultProps} />);
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders icon elements', () => {
    render(<ItemGrid {...defaultProps} />);
    // Both FaBeer (custom) and FaCoffee (default) render as <svg>
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it('renders CTA buttons when callToAction is provided', () => {
    render(<ItemGrid {...defaultProps} />);

    waitFor(() => {
      expect(screen.getByText('Go')).toBeInTheDocument();
      expect(screen.getByText('Click')).toBeInTheDocument();
    });
  });

  it('renders timestamps if provided', () => {
    render(<ItemGrid {...defaultProps} />);
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('renders nothing if items array is empty', () => {
    const { container } = render(<ItemGrid {...defaultProps} items={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
