import { z } from "zod";
import { registry } from "../../../api";
import { Result } from "../../../components/schemas/Result";

export const YukkuriPosition = z.enum([
  "BACKGROUND",
  "LEFT_CHARACTER",
  "RIGHT_CHARACTER",
  "MAIN_VIEW",
  "TEXT_BACKGROUND",
]);

export const YukkuriImage = z.object({
  url: z.string().url(),
  position: YukkuriPosition,
});

export const YukkuriScene = z.object({
  caption: z.string(),
  images: YukkuriImage.array(),
});

const VideoYukkuri = z.object({
  type: z.literal("YUKKURI"),
  scenes: YukkuriScene.array(),
});

// ==================

const RankingItem = z.object({
  rank: z.number().int(),
  title: z.string(),
  imageUrl: z.string().url(),
  description: z.string(),
});

const VideoRanking = z.object({
  type: z.literal("RANKING"),
  title: z.string(),
  items: RankingItem.array(),
});

// =================

const VideoText = z.object({
  type: z.literal("TEXT"),
  text: z.string(),
});

export const Request = z.discriminatedUnion("type", [
  VideoYukkuri,
  VideoRanking,
  VideoText,
]);

registry.registerPath({
  method: "post",
  path: "/rest/v1/videos",
  operationId: "createVideo",
  summary: "動画を作成",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: Request,
        },
      },
    },
  },
  responses: {
    200: {
      description: "動画の作成に成功",
      content: {
        "application/json": { schema: Result },
      },
    },
  },
});
