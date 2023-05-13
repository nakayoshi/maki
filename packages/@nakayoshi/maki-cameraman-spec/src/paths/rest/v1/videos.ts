import { z } from "zod";
import { registry } from "../../../api";
import { Video } from "../../../components/schemas/video";

const CreateVideoParamsRankingItem = z.object({
  rank: z.number().int().openapi({ description: "このアイテムの順位です" }),
  title: z.string().openapi({ description: "このアイテムのタイトルです" }),
  description: z.string().openapi({ description: "このアイテムの説明文です" }),
  imageUrl: z
    .string()
    .url()
    .optional()
    .openapi({ description: "このアイテムの画像URLです" }),
});

export const CreateVideoParamsRanking = z
  .object({
    title: z.string(),
    items: CreateVideoParamsRankingItem.array(),
  })
  .openapi({
    description: "ランキング形式の動画を作成するときのパラメータです。",
  });

// =================

// const CreateVideoParamsText = z
//   .object({
//     type: z.literal("TEXT"),
//     text: z.string(),
//   })
//   .openapi({
//     description:
//       "テキスト形式の動画を作成するときのパラメータです。このタイプは映像サーバーが動作していることを確認するためのもので、通常は使用しません。",
//   });

// export const Request = z.union([
//   CreateVideoParamsRanking,
//   CreateVideoParamsText,
// ]);

registry.registerPath({
  method: "post",
  path: "/rest/v1/videos:ranking",
  operationId: "create_ranking_video",
  summary: "ランキング動画を作成",
  description:
    "指定した台本パラメータを元にしてランキング形式で情報を紹介する映像作品を作成します",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateVideoParamsRanking,
        },
      },
    },
  },
  responses: {
    200: {
      description: "動画の作成に成功",
      content: {
        "application/json": { schema: Video },
      },
    },
  },
});
