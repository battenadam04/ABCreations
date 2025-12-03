import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Announcement from '~/components/widgets/Announcement';

describe('Announcement component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form when callToAction2 exists', () => {
    const { container } = render(<Announcement />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const user = userEvent.setup();

    render(<Announcement />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'John@live.co.uk');

    const submitBtn = screen.getByRole('button', { name: /Subscribe/i }) || screen.getByRole('button');

    await user.click(submitBtn);

    console.log(screen.debug());

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/saveUserDetails', {
      body: '{"policy":false,"email":"John@live.co.uk"}',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  it('matches snapshot', () => {
    const { container } = render(<Announcement />);
    expect(container).toMatchSnapshot();
  });
});
