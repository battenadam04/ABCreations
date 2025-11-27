import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '~/components/common/Form';
import { FormProps } from '~/shared/types';

describe('Form Component', () => {
  const defaultProps: FormProps = {
    id: 'test-form',
    title: 'Contact Us',
    description: 'Please fill out the form',
    inputs: [
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name' },
    ],
    btn: { title: 'Submit', type: 'submit' },
  };

  it('renders title, description, inputs, and button', () => {
    render(<Form {...defaultProps} />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Please fill out the form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows spinner when submitting', async () => {
    const mockSubmit = jest.fn(() => new Promise((res) => setTimeout(res, 50)));

    render(<Form {...defaultProps} customSubmission={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'John' } });

    fireEvent.click(screen.getByText('Submit'));

    // ⬅️ Automatically waits for spinner to show
    const spinner = await screen.findByTestId('spinner');

    expect(spinner).toBeInTheDocument();
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('calls customSubmission with form data', async () => {
    const mockSubmit = jest.fn(() => Promise.resolve());
    render(<Form {...defaultProps} customSubmission={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'Jane' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'user@example.com', name: 'Jane' }),
        undefined,
      ),
    );
  });

  it('resets form and shows success text after successful submit', async () => {
    const mockSubmit = jest.fn(() => Promise.resolve());
    render(<Form {...defaultProps} customSubmission={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'B' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

    // Button text changes to "Success"
    expect(screen.getByText('Success')).toBeInTheDocument();

    // Inputs should be reset
    expect(screen.getByPlaceholderText('Enter email')).toHaveValue('');
    expect(screen.getByPlaceholderText('Enter name')).toHaveValue('');
  });

  //TODO: implement error component to display on submission failure
  it.skip('shows error text if customSubmission throws', async () => {
    const mockSubmit = jest.fn(() => Promise.reject());
    render(<Form {...defaultProps} customSubmission={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'fail@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter name'), { target: { value: 'Fail' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  //TODO: add back when Yup validation schema added
  it.skip('renders validation errors for inputs', async () => {
    const customValidation = {
      resolver: (values: any) => {
        const errors: any = {};
        if (!values.email) errors.email = { message: 'Email is required' };
        return { values, errors };
      },
    };

    render(<Form {...defaultProps} customValidation={customValidation} />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.getByText('Email is required')).toBeInTheDocument());
  });
});
