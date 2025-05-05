import { render, screen } from 'test-utils';

// Component
import { Input } from '../index';

describe('Input component', () => {
  it('should render properly', () => {
    const { toJSON } = render(<Input label="Email" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correct label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeVisible();
  });

  it('should display error message when provided', () => {
    render(<Input label="Email" errorMessage="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeVisible();
  });
});
