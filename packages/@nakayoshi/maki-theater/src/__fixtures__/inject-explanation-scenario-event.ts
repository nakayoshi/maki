import { ExplanationScenario } from "../models/scenario";

export const injectExplanationScenarioEvent =
  new CustomEvent<ExplanationScenario>("InjectExplanationScenario", {
    detail: {
      title: "大政奉還の解説",
      scenes: [
        {
          text: "こんにちわ、ぼくはずんだもんなのだ！今日は大政奉還について話すのだ。",
          facialExpression: "normal",
          imageUrl: "https://picsum.photos/seed/maki1/800/800",
        },
        {
          text: "大政奉還は、1867年に起きた日本の歴史的な出来事なのだ。",
          facialExpression: "thinking",
          imageUrl: "https://picsum.photos/seed/maki2/800/800",
        },
        {
          text: "江戸時代の末期に、徳川慶喜が政権を天皇に返したことを指すのだ。",
          facialExpression: "normal",
          imageUrl: "https://picsum.photos/seed/maki3/800/800",
        },
        {
          text: "これにより、幕府の時代が終わり、明治時代が始まったのだ。",
          facialExpression: "joyful",
          imageUrl: "https://picsum.photos/seed/maki4/800/800",
        },
        {
          text: "ぼくの友だち茜は、大政奉還が日本の近代化のきっかけだと言っているのだ。",
          facialExpression: "thinking",
          imageUrl: "https://picsum.photos/seed/maki5/800/800",
        },
        {
          text: "大政奉還後、日本は急速に西洋の技術や文化を取り入れたのだ。",
          facialExpression: "joyful",
          imageUrl: "https://picsum.photos/seed/maki6/800/800",
        },
        {
          text: "葵は、大政奉還が日本の歴史に大きな影響を与えたと考えているのだ。",
          facialExpression: "thinking",
          imageUrl: "https://picsum.photos/seed/maki7/800/800",
        },
        {
          text: "大政奉還は、日本の政治や社会にも変化をもたらしたのだ。",
          facialExpression: "normal",
          imageUrl: "https://picsum.photos/seed/maki8/800/800",
        },
        {
          text: "しかし、大政奉還による変化は、すべての人にとって良いことばかりではなかったのだ。",
          facialExpression: "fearful",
          imageUrl: "https://picsum.photos/seed/maki9/800/800",
        },
        {
          text: "これがぼくの大政奉還の解説なのだ。また次回のお話も楽しみにしていてほしいのだ！",
          facialExpression: "joyful",
          imageUrl: "https://picsum.photos/seed/maki10/800/800",
        },
      ],
    },
  });
