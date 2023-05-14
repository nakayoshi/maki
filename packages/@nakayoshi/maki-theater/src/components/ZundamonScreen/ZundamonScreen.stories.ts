import { Meta, StoryObj } from "@storybook/vue3";

import ZundamonScreen from "./ZundamonScreen.vue";

export default {
  component: ZundamonScreen,
  render: (args) => ({
    components: { ZundamonScreen },
    setup: () => ({ args }),
    template: `<ZundamonScreen v-bind="args" />`,
  }),
} satisfies Meta<typeof ZundamonScreen>;

type Story = StoryObj<typeof ZundamonScreen>;

export const Default: Story = {
  args: {
    variant: "normal",
    text: "あ".repeat(66),
    imageUrl: "https://picsum.photos/seed/maki/800/800",
  },
};
