import { z } from "zod";
import { registry } from "../../api";

export const Video = z
  .object({
    url: z.string().url().openapi({
      description: "動画の公開URLです。MP4形式の動画が入っています",
      example: "https://example.com/video.mp4",
    }),
  })
  .openapi({
    description: "Cameramanによって生成された動画を表します。",
  });

registry.register("Video", Video);
