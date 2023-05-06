import { registry } from "../../../api";
import { z } from "zod";
import { Video } from "../../../components/schemas/video";

const CreateVideoRankingBody = z.object({
  type: z.literal("RANKING"),
  keyword: z.string(),
});

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
          schema: CreateVideoRankingBody,
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
