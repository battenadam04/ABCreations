import { render, screen } from '@testing-library/react';
import WidgetWrapper from '~/components/common/WidgetWrapper';

describe('WidgetWrapper', () => {
  it('renders children inside the wrapper', () => {
    render(
      <WidgetWrapper id="section-id">
        <p>Visible child content</p>
      </WidgetWrapper>,
    );

    expect(screen.getByText('Visible child content')).toBeInTheDocument();
  });

  it('applies the given id to the section element', () => {
    render(
      <WidgetWrapper id="custom-id">
        <p>Child</p>
      </WidgetWrapper>,
    );

    const section = document.querySelector('section');
    expect(section).toHaveAttribute('id', 'custom-id');
  });

  it('renders correctly with containerClass', () => {
    render(
      <WidgetWrapper containerClass="my-container">
        <p>Child</p>
      </WidgetWrapper>,
    );

    const containerDiv = screen.getByText('Child').parentElement;
    expect(containerDiv).toHaveClass('my-container');
  });

  it('renders children even if hasBackground is false', () => {
    render(
      <WidgetWrapper hasBackground={false}>
        <span>Content without background</span>
      </WidgetWrapper>,
    );

    expect(screen.getByText('Content without background')).toBeInTheDocument();
  });

  it('renders children even if hasBackground is true', () => {
    render(
      <WidgetWrapper hasBackground>
        <span>Content with background</span>
      </WidgetWrapper>,
    );

    expect(screen.getByText('Content with background')).toBeInTheDocument();
  });
});
