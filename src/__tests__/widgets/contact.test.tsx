import { render, screen } from '@testing-library/react';
import Contact from '~/components/widgets/Contact';
import { FormProps } from '~/shared/types';

describe('Contact', () => {
  const MockIcon = (props: any) => <svg data-testid="mock-icon" {...props} />;

  const baseProps = {
    id: 'contact-section',
    hasBackground: false,
    header: { title: 'Contact Us' },
    content: 'Reach out to us anytime',
    items: [
      {
        title: 'Email',
        description: 'support@example.com',
        icon: MockIcon,
      },
      {
        title: 'Address',
        description: ['123 Street', 'City, Country'],
        icon: MockIcon,
      },
    ],
    form: {
      formId: 'contact-form',
      inputs: [],
      btn: { title: 'test', type: 'submit' },
    } as FormProps,
  };

  test('renders header when provided', () => {
    render(<Contact {...baseProps} />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('renders content when provided', () => {
    render(<Contact {...baseProps} />);
    expect(screen.getByText('Reach out to us anytime')).toBeInTheDocument();
  });

  test('renders all item titles', () => {
    render(<Contact {...baseProps} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  test('renders string descriptions correctly', () => {
    render(<Contact {...baseProps} />);
    expect(screen.getByText('support@example.com')).toBeInTheDocument();
  });

  test('renders array descriptions correctly', () => {
    render(<Contact {...baseProps} />);
    expect(screen.getByText('123 Street')).toBeInTheDocument();
    expect(screen.getByText('City, Country')).toBeInTheDocument();
  });

  test('renders icons when provided', () => {
    render(<Contact {...baseProps} />);
    expect(screen.getAllByTestId('mock-icon').length).toBe(2);
  });

  test('renders the Form component with provided form props', () => {
    render(<Contact {...baseProps} />);
    const form = screen.getByRole('heading', { name: /Contact Us/i }) || document.getElementById('contact-form');
    expect(form).toBeInTheDocument();

    // Alternatively, check if the submit button exists inside the form
    expect(screen.getByRole('button', { name: /test/i })).toBeInTheDocument();
  });

  test('renders id attribute on WidgetWrapper', () => {
    const { container } = render(<Contact {...baseProps} />);
    expect(container.querySelector('#contact-section')).toBeInTheDocument();
  });

  test('renders empty id when none provided', () => {
    const { container } = render(<Contact {...baseProps} id={undefined} />);
    expect(container.querySelector('[id=""]')).toBeInTheDocument();
  });

  test('renders layout with single column when content and items are missing', () => {
    const props = {
      id: 'simple',
      form: {
        formId: 'simple-form',
        inputs: [],
        btn: { title: 'test', type: 'submit' },
      } as FormProps,
    };
    const { container } = render(<Contact {...props} />);
    expect(container.querySelector('.md\\:grid-cols-1')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<Contact {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
