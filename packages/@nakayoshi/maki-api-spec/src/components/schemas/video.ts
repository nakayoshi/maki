import { z } from "zod";
import { registry } from "../../api";

export const Video = registry.register(
  "Video",
  z.object({
    url: z.string().url(),
  })
);
