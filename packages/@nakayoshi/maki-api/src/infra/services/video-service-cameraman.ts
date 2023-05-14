import aspida from "@aspida/axios";
import axios from "axios";
import {
  CreateVideoRankingParams,
  IVideoService,
} from "../../app/_external/video-service";
import api, { ApiInstance } from "../generated/cameraman/$api";
import { ILogger } from "../../domain/service/logger";

export class VideoServiceCameraman implements IVideoService {
  private readonly api: ApiInstance;

  constructor(
    private readonly logger: ILogger,
    private readonly cameramanUrl: string
  ) {
    const axiosConfig = {
      timeout: 1000 * 60 * 60,
      baseURL: this.cameramanUrl,
    };

    this.api = api(aspida(axios, axiosConfig)) as ApiInstance;
  }

  async createVideo(params: CreateVideoRankingParams): Promise<string> {
    this.logger.info("Creating video", params);
    const result = await this.api.rest.v1.videos_ranking.$post({
      body: {
        title: params.title,
        items: params.items.map((item) => ({
          rank: item.rank,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
        })),
      },
    });
    this.logger.info("Created video", result);

    return result.url;
  }
}
