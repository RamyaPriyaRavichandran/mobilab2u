import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Card, CardTitle, CardDescription } from '@/components/common/SleekCard'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Card/SeekCard',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CardWithDescription = {
  render: () => (
    <Card>
      <CardTitle>My Card</CardTitle>
      <CardDescription>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur quaerat itaque quae officiis harum
        laborum molestiae, soluta et. Eaque iure ducimus animi quis dolores, nihil adipisci ipsa in mollitia. Quam?
      </CardDescription>
    </Card>
  ),
}

export const CardWithoutDescription = {
  render: () => (
    <Card>
      <CardTitle>Card Without Description</CardTitle>
    </Card>
  ),
}
