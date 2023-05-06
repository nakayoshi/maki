import { IImageService } from "../../app/_external/image-service";
import { IScenarioService } from "../../app/_external/scenario-service";
import { IStorage } from "../../app/_external/storage";
import { IVideoService } from "../../app/_external/video-service";
import { CreateVideo } from "../../app/create-video";
import { ILogger } from "../../domain/service/logger";
import { Methods } from "../generated/rest/v1/videos";

export const createVideo = async (
  logger: ILogger,
  storage: IStorage,
  videoService: IVideoService,
  scenarioService: IScenarioService,
  imageService: IImageService,
  body: Methods["post"]["reqBody"]
): Promise<Methods["post"]["resBody"]> => {
  const useCase = new CreateVideo(
    logger,
    storage,
    videoService,
    scenarioService,
    imageService
  );
  const result = await useCase.invoke({
    prompt: body.prompt,
  });
  return {
    url: result.videoUrl,
  };
};
