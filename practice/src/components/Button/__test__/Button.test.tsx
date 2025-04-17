import {render, screen} from 'test-utils';
import {Text} from 'react-native';

import {Button} from '../index';

describe('Button', () => {
  it('should render properly', () => {
    const {toJSON} = render(<Button title="Press me" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children instead of title when provided', () => {
    render(
      <Button>
        <Text>Custom Child</Text>
      </Button>,
    );
    expect(screen.getByText('Custom Child')).toBeTruthy();
  });
});
