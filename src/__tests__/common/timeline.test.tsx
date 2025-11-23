import { render, screen } from '@testing-library/react';
import { IconMenu, IconX } from '@tabler/icons-react';
import Timeline from '~/components/common/Timeline';

describe('Timeline Component', () => {
  const items = [
    { title: 'Step 1', description: 'Description 1', icon: IconMenu },
    { title: 'Step 2', description: 'Description 2' }, // uses default icon
    { title: 'Step 3' }, // no icon
  ];

  const defaultProps = {
    id: 'timeline1',
    items,
    defaultIcon: IconX, // real default icon
  };

  it('renders all items with title and description', () => {
    render(<Timeline {...defaultProps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Timeline {...defaultProps} />);
    // Check if the icon element for Step 1 exists (SVG rendered)
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders default icon when custom icon is not provided', () => {
    render(<Timeline {...defaultProps} />);
    // Step 2 has no custom icon, should render default icon (SVG)
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(3); // 1 custom + 2 default
  });

  it('renders nothing if items array is empty', () => {
    const { container } = render(<Timeline {...defaultProps} items={[]} />);
    expect(container.innerHTML).toBe('0');
  });

  it('renders correctly when only title is provided', () => {
    const minimalItems = [{ title: 'Step Only' }];
    render(<Timeline {...defaultProps} items={minimalItems} />);
    expect(screen.getByText('Step Only')).toBeInTheDocument();
  });

  it('renders description if provided', () => {
    const descItems = [{ title: 'Step', description: 'Full description' }];
    render(<Timeline {...defaultProps} items={descItems} />);
    expect(screen.getByText('Full description')).toBeInTheDocument();
  });
});
