import { CreateVideoParamsRanking } from "./videos";
import { test, expect } from "vitest";

test("ランキング動画", () => {
  const result = CreateVideoParamsRanking.safeParse({
    type: "RANKING",
    title: "ランキング",
    items: [
      {
        rank: 10,
        title: "掃除当番争い",
        description: "掃除の当番決めでいつも言い合いに",
        imageUrl: "https://example.com",
      },
      {
        rank: 9,
        title: "食材管理係",
        description: "買い物忘れるな！常備食の番人だよ",
        imageUrl: "https://example.com",
      },
      {
        rank: 8,
        title: "トイレットペーパー戦争",
        description: "紙切れ？誰の責任だよ！",
        imageUrl: "https://example.com",
      },
      {
        rank: 7,
        title: "恋愛ドラマの選択肢",
        description: "どっちを見る？選ぶのは戦いだぜ",
        imageUrl: "https://example.com",
      },
      {
        rank: 6,
        title: "お互いの寝言ネタ",
        description: "夜中に話す？寝言の謎を追及しよう",
        imageUrl: "https://example.com",
      },
      {
        rank: 5,
        title: "休日の過ごし方協議",
        description: "外に出る？家でまったり？揉めるね",
        imageUrl: "https://example.com",
      },
      {
        rank: 4,
        title: "デリバリーの選択権",
        description: "今夜はどこのピザ？え、寿司？",
        imageUrl: "https://example.com",
      },
      {
        rank: 3,
        title: "観葉植物の命名権",
        description: "植物の名前もめたら親バカだな",
        imageUrl: "https://example.com",
      },
      {
        rank: 2,
        title: "お風呂の順番決め",
        description: "先に入る？後に入る？毎日の駆け引き",
        imageUrl: "https://example.com",
      },
      {
        rank: 1,
        title: "クッション取り合い",
        description: "ソファーのクッション奪い合い大戦",
        imageUrl: "https://example.com",
      },
    ],
  });

  expect(result.success).toBe(true);
});
