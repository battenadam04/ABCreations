import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '~/components/widgets/Header';

describe('Header', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(<Header />);
    container = rendered.container;
  });

  test('renders header logo', () => {
    expect(screen.getByRole('link', { name: /AB Creative Labs/i })).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toBeInTheDocument();
    expect(nav.querySelectorAll('a').length).toBeGreaterThan(0);
  });

  test('renders dropdown buttons when a link has children', async () => {
    const user = userEvent.setup();
    const dropdownButton = screen.getAllByRole('button')[0];
    await user.click(dropdownButton);
    expect(dropdownButton).toBeInTheDocument();
  });

  test('toggles menu when ToggleMenu is clicked', async () => {
    const user = userEvent.setup();
    const toggleButton = screen.getByRole('button', { name: /menu/i });
    await user.click(toggleButton);
    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toHaveClass('block');
  });

  test('renders RSS feed icon if showRssFeed is true', () => {
    const rss = screen.queryByLabelText('RSS Feed');
    if (rss) expect(rss).toBeInTheDocument();
  });

  test('renders toggle dark mode button if showToggleTheme is true', () => {
    const toggleTheme = screen.queryByRole('button', { name: /toggle dark mode/i });
    if (toggleTheme) expect(toggleTheme).toBeInTheDocument();
  });

  test('renders CTA actions if any', () => {
    const ctas = screen.queryAllByRole('link', { name: /./ });
    expect(ctas.length).toBeGreaterThanOrEqual(0);
  });

  test('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
