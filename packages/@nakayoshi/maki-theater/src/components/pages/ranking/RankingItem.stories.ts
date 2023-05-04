import type { Meta, StoryObj } from "@storybook/vue3";

import RankingItem from "./RankingItem.vue";

const meta = {
  title: "RankingScreen/RankingItem",
  component: RankingItem,
  tags: ["autodocs"],
} satisfies Meta<typeof RankingItem>;

export default meta;

type Ranking = StoryObj<typeof meta>;

export const Demo: Ranking = {
  args: {
    rank: 10,
    title: "掃除当番争い",
    description: "掃除の当番決めでいつも言い合いに",
    imageUrl: "https://placehold.jp/300x300.png",
  },
};
