import { ILogger } from "../domain/service/logger";
import { IImageService } from "./_external/image-service";
import { IScenarioService } from "./_external/scenario-service";
import { IStorage } from "./_external/storage";
import {
  CreateVideoRankingParams,
  IVideoService,
} from "./_external/video-service";

export type CreateVideoParams = {
  readonly prompt: string;
};

export type CreateVideoResult = {
  readonly videoUrl: string;
};

export class CreateVideo {
  constructor(
    private readonly logger: ILogger,
    private readonly storage: IStorage,
    private readonly videoService: IVideoService,
    private readonly scenarioService: IScenarioService,
    private readonly imageService: IImageService
  ) {}

  async invoke(params: CreateVideoParams): Promise<CreateVideoResult> {
    const { prompt } = params;

    const scenario = await this.scenarioService.createScenario(
      "ranking",
      prompt
    );

    const entries = await Promise.all(
      Object.entries(scenario.items).map(async ([key, item]) => {
        this.logger.info(`Creating image for ${item.imagePrompt}`);
        const imagePath = await this.imageService.createImage(item.imagePrompt);
        const file = await this.storage.upload(imagePath);
        const imageUrl = `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
        this.logger.info(`Created image for ${item.imagePrompt}`);
        return [key, imageUrl] as const;
      })
    );
    const imageUrls = Object.fromEntries(entries);

    const videoParams: CreateVideoRankingParams = {
      type: "ranking",
      title: scenario.title,
      items: scenario.items.map((item, index) => ({
        rank: item.rank,
        title: item.title,
        description: item.description,
        imageUrl: imageUrls[index],
      })),
    };

    const videoUrl = await this.videoService.createVideo(videoParams);

    return { videoUrl };
  }
}
