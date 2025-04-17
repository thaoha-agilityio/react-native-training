// Utils
import {render, screen} from 'test-utils';

// Components
import {Text} from '../index';

describe('Text', () => {
  it('should render properly', () => {
    const {toJSON} = render(<Text>Login Screen</Text>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correct content in the text', () => {
    render(<Text>Login Screen</Text>);
    expect(screen.getByText('Login Screen')).toBeVisible();
  });
});
