import { render, screen } from 'test-utils';
import { Button } from '../index';

describe('Button', () => {
  it('should render properly', () => {
    const { toJSON } = render(<Button>Press me</Button>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correct content in the button', () => {
    render(<Button title="Press me" />);
    expect(screen.getByText('Press me')).toBeVisible();
  });
});
