import { z } from "zod";
import { registry } from "../../../api";
import { Video } from "../../../components/schemas/video";

export const CreateVideoParamsRanking = z
  .object({
    title: z.string(),
    items: z.array(
      z.object({
        rank: z
          .number()
          .int()
          .openapi({ description: "このアイテムの順位です" }),
        title: z
          .string()
          .openapi({ description: "このアイテムのタイトルです" }),
        description: z
          .string()
          .openapi({ description: "このアイテムの説明文です" }),
        imageUrl: z
          .string()
          .url()
          .optional()
          .openapi({ description: "このアイテムの画像URLです" }),
      })
    ),
  })
  .openapi({
    description: "ランキング形式の動画を作成するときのパラメータです。",
  });

registry.registerPath({
  method: "post",
  path: "/rest/v1/videos/ranking",
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

export const CreateVideoParamsExplanation = z
  .object({
    title: z.string().openapi({ description: "動画のタイトルです" }),
    scenes: z.array(
      z.object({
        text: z
          .string()
          .openapi({ description: "このシーンで読み上げるテキストです" }),
        facialExpression: z.union([
          z.literal("angry"),
          z.literal("embarrassed"),
          z.literal("fearful"),
          z.literal("joyful"),
          z.literal("normal"),
          z.literal("thinking"),
        ]),
        imageUrl: z.string().url().openapi({ description: "このシーンの画像" }),
      })
    ),
  })
  .openapi({
    description: "解説動画を作成するときのパラメータです。",
  });

registry.registerPath({
  method: "post",
  path: "/rest/v1/videos/explanation",
  operationId: "create_explanation_video",
  summary: "ずんだもんによる解説動画を作成",
  description:
    "指定した台本パラメータを元にして解説動画ので情報を紹介する映像作品を作成します",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: CreateVideoParamsExplanation,
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
