import { ILogger } from "../domain/service/logger";
import { IImageService } from "./_external/image-service";
import { IExplanationScenarioService } from "./_external/scenario-service";
import { IStorage } from "./_external/storage";
import { IVideoService } from "./_external/video-service";

export type CreateExplanationVideoParams = {
  readonly prompt: string;
  readonly model?: string;
};

export type CreateExplanationVideoResult = {
  readonly videoUrl: string;
};

export class CreateExplanationVideo {
  constructor(
    private readonly logger: ILogger,
    private readonly storage: IStorage,
    private readonly videoService: IVideoService,
    private readonly scenarioService: IExplanationScenarioService,
    private readonly imageService: IImageService
  ) {}

  async invoke(
    params: CreateExplanationVideoParams
  ): Promise<CreateExplanationVideoResult> {
    const { prompt, model } = params;

    const scenario = await this.scenarioService.createScenario(prompt, model);

    const entries = await Promise.all(
      Object.entries(scenario.scenes).map(async ([key, item]) => {
        this.logger.info(`Creating image for ${item.imagePrompt}`);
        const imagePath = await this.imageService.createImage(item.imagePrompt);
        const file = await this.storage.upload(imagePath);
        const imageUrl = `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
        this.logger.info(`Created image for ${item.imagePrompt}`);
        return [key, imageUrl] as const;
      })
    );
    const imageUrls = Object.fromEntries(entries);

    const videoUrl = await this.videoService.createExplanationVideo({
      type: "explanation" as const,
      title: scenario.title,
      scenes: scenario.scenes.map((item, index) => ({
        text: item.text,
        facialExpression: item.facialExpression,
        imageUrl: imageUrls[index],
      })),
    });

    return { videoUrl };
  }
}
