import { Meta, StoryObj } from "@storybook/vue3";

import ZundamonTachie from "./ZundamonTachie.vue";

export default {
  component: ZundamonTachie,
  render: (args) => ({
    components: { ZundamonTachie },
    setup: () => ({ args }),
    template: `<ZundamonTachie v-bind="args" />`,
  }),
} satisfies Meta<typeof ZundamonTachie>;

type Story = StoryObj<typeof ZundamonTachie>;

export const Default: Story = {
  args: {
    variant: "normal",
  },
};
