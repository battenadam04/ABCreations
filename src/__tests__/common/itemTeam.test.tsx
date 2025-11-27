import { render, screen } from '@testing-library/react';
import Team from '~/components/widgets/Team';

describe('Team Component', () => {
  const header = { title: 'Our Team', subtitle: 'Meet the team' };
  const teams = [
    { name: 'Alice', occupation: 'Developer', image: new Image(), items: [] },
    { name: 'Bob', occupation: 'Designer', image: new Image(), items: [] },
  ];

  teams[0].image.alt = 'Alice';

  teams[1].image.alt = 'Bob';

  it('renders Headline when header is provided', () => {
    render(<Team header={header} teams={teams} />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('Meet the team')).toBeInTheDocument();
  });

  it('renders all team members with name, occupation, and image', () => {
    render(<Team header={header} teams={teams} />);
    teams.forEach((team) => {
      expect(screen.getByText(team.name)).toBeInTheDocument();
      expect(screen.getByText(team.occupation)).toBeInTheDocument();
      if (team.image) {
        expect(screen.getByAltText(team.name)).toBeInTheDocument();
      }
    });
  });

  it('renders correctly when hasBackground is true', () => {
    render(<Team header={header} teams={teams} hasBackground />);
    teams.forEach((team) => {
      expect(screen.getByText(team.name)).toBeInTheDocument();
    });
  });

  it('renders correctly when header is not provided', () => {
    render(<Team teams={teams} />);
    teams.forEach((team) => {
      expect(screen.getByText(team.name)).toBeInTheDocument();
      expect(screen.getByText(team.occupation)).toBeInTheDocument();
    });
    expect(screen.queryByTestId('headline')).not.toBeInTheDocument();
  });

  it('renders nothing when teams array is empty', () => {
    const { container } = render(<Team header={header} teams={[]} />);
    expect(container.querySelectorAll('.grid > div')).toHaveLength(0);
  });
});
