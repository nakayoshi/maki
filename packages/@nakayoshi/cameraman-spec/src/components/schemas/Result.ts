import { z } from "zod";
import { registry } from "../../api";

export const Result = registry.register(
  "Result",
  z.object({
    url: z.string().url(),
  })
);
