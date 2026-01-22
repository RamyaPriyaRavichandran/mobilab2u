import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import SparklesText from '@/components/Animation/SparklesText'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Text/SparklesText',
  component: SparklesText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    text: { control: 'text' },
    sparklesCount: { control: 'number' },
    colors: {
      first: { control: 'color' },
      second: { control: 'color' },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { text: 'Mobilab2u' },
} satisfies Meta<typeof SparklesText>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const CustomColor: Story = {
  args: {
    text: 'Mobilab2u',
    colors: {
      first: 'red',
      second: 'blue',
    },
  },
}
