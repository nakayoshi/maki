import { z } from "zod";

export const videoType = z.enum(["YUKKURI", "ZUNDAMON", "RANKING"]);
export const imagePos = z.enum([
  "BACKGROUND",
  "LEFT_CHARACTOR",
  "RIGHT_CHARACTOR",
  "MAIN_VIEW",
  "TEXT_BACKGROUND",
]);
export const image = z.object({
  imageId: z.string(),
  imagePos: imagePos,
});
export const point = z.object({
  prompt: z.string(),
  image: image,
});

const Request = z.object({
  id: z.string(),
  videoType: videoType,
  scene: point,
});

type Request = z.infer<typeof Request>;

export default Request;
