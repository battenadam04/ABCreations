import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DividerLine from '~/components/common/DividerLine';


jest.mock('tailwind-merge', () => ({
  twMerge: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

describe('DividerLine', () => {
  it('renders the default divider', () => {
    const { container } = render(<DividerLine />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('border-gray-200 dark:border-gray-700 my-4');
  });

  it('applies custom classes', () => {
    const { container } = render(<DividerLine dividerLineClass="custom-class" />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveClass('custom-class');
  });

  it('matches snapshot', () => {
    const { container } = render(<DividerLine />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
