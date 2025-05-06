import { render } from '@/test-utils';

// Components
import { Modal, Text } from '@/components';

describe('Modal component', () => {
  it('renders correctly', () => {
    const { toJSON } = render(
      <Modal visible={true} onClose={jest.fn()}>
        <Text>Modal Content</Text>
      </Modal>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children when visible', () => {
    const { getByText } = render(
      <Modal visible={true} onClose={jest.fn()}>
        <Text>Modal Content</Text>
      </Modal>,
    );

    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <Modal visible={false} onClose={jest.fn()}>
        <Text>Modal Content</Text>
      </Modal>,
    );

    expect(queryByText('Modal Content')).toBeNull();
  });
});
