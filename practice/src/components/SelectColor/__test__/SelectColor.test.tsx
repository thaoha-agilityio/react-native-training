import {fireEvent, render, screen} from 'test-utils';

// Components
import {SelectColor} from '../index';

// Themes
import {colors} from '@/themes';

describe('SelectColor', () => {
  it('should render properly', () => {
    const {toJSON} = render(<SelectColor bgColor={colors.light} isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    render(<SelectColor bgColor="blue" onPress={onPressMock} />);

    fireEvent.press(screen.getByTestId('selected-color'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
