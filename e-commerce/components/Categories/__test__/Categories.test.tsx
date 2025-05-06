import { render } from 'test-utils';

// Components
import { Categories } from '../index';

describe('Categories', () => {
  it('should render properly', () => {
    const { toJSON } = render(<Categories />);
    expect(toJSON()).toMatchSnapshot();
  });
});
