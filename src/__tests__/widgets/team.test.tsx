import { render, screen } from '@testing-library/react';
import Team from '~/components/widgets/Team';
import { TeamProps } from '~/shared/types';

describe('Team', () => {
  const baseProps: TeamProps = {
    id: 'team-section',
    hasBackground: false,
    header: { title: 'Our Team', subtitle: 'Meet the experts' },
    teams: [
      {
        name: 'Alice',
        occupation: 'Designer',
        image: { src: '/img/alice.png', alt: 'Alice' },
        items: [],
      },
      {
        name: 'Bob',
        occupation: 'Engineer',
        image: { src: '/img/bob.png', alt: 'Bob' },
        items: [],
      },
    ],
  };

  test('renders Headline when header is provided', () => {
    render(<Team {...baseProps} />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('Meet the experts')).toBeInTheDocument();
  });

  test('does not render Headline when header is missing', () => {
    render(<Team {...baseProps} header={undefined} />);
    expect(screen.queryByText('Our Team')).toBeNull();
    expect(screen.queryByText('Meet the experts')).toBeNull();
  });

  test('renders all team member names and occupations', () => {
    render(<Team {...baseProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  test('passes id correctly to WidgetWrapper', () => {
    const { container } = render(<Team {...baseProps} />);
    expect(container.querySelector('#team-section')).toBeInTheDocument();
  });

  test('renders empty id when none provided', () => {
    const { container } = render(<Team {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Team {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
