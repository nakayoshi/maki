import { IImageService } from "../../app/_external/image-service";
import {
  IExplanationScenarioService,
  IRankingScenarioService,
} from "../../app/_external/scenario-service";
import { IStorage } from "../../app/_external/storage";
import { IVideoService } from "../../app/_external/video-service";
import { CreateRankingVideo } from "../../app/create-ranking-video";
import { CreateExplanationVideo } from "../../app/create-explanation-video";
import { ILogger } from "../../domain/service/logger";
import { Methods } from "../generated/rest/v1/videos";

export const createRankingVideo = async (
  logger: ILogger,
  storage: IStorage,
  videoService: IVideoService,
  scenarioService: IRankingScenarioService,
  imageService: IImageService,
  body: Methods["post"]["reqBody"]
): Promise<Methods["post"]["resBody"]> => {
  const useCase = new CreateRankingVideo(
    logger,
    storage,
    videoService,
    scenarioService,
    imageService
  );
  const result = await useCase.invoke({
    prompt: body.prompt,
    model: body.model,
  });
  return {
    url: result.videoUrl,
  };
};

export const createExplanationVideo = async (
  logger: ILogger,
  storage: IStorage,
  videoService: IVideoService,
  scenarioService: IExplanationScenarioService,
  imageService: IImageService,
  body: Methods["post"]["reqBody"]
): Promise<Methods["post"]["resBody"]> => {
  const useCase = new CreateExplanationVideo(
    logger,
    storage,
    videoService,
    scenarioService,
    imageService
  );
  const result = await useCase.invoke({
    prompt: body.prompt,
    model: body.model,
  });
  return {
    url: result.videoUrl,
  };
};
