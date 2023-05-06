import { generateAsync } from "stability-client";

import { IImageService } from "../../app/_external/image-service";

type ResponseType = {
  images: Array<{
    buffer: Buffer;
    filePath: string;
    seed: number;
    mimeType: string;
    classifications: {
      realizedAction: number;
    };
  }>;
};

export class ImageServiceDreamStudio implements IImageService {
  constructor(
    private readonly apiKey: string,
    private readonly outDir: string
  ) {}

  async createImage(prompt: string): Promise<string> {
    const result = await generateAsync({
      apiKey: this.apiKey,
      engine: "stable-diffusion-512-v2-1",
      prompt,
      outDir: this.outDir,
      width: 64 * 5,
      height: 64 * 5,
      samples: 1,
      steps: 10,
    });

    if (result == null) {
      throw new Error("Failed to generate");
    }

    return (result as ResponseType).images[0].filePath;
  }
}
