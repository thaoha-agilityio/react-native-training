import {View} from 'react-native';
import type {Meta, StoryObj} from '@storybook/react';
import {Button} from '.';

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: {action: 'pressed the button'},
  },
  args: {
    title: 'Hello world',
  },
  decorators: [
    Story => (
      <View style={{width: 200}}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const OutLine: Story = {
  args: {
    title: 'outline',
    variant: 'outline',
  },
};
