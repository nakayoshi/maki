import api, { ApiInstance } from "../generated/$api";
import aspida from "@aspida/axios";
import axios from "axios";
import { IVideoBuilder } from "./video-builder";
import { IScenarioBuilder } from "../scenario-builder/scenario-builder";

const CAMERAMAN_URL = "https://maki-cameraman-dkcjtb4edq-uc.a.run.app";

export class VideoBuilderCameraman implements IVideoBuilder {
  private readonly api: ApiInstance;

  constructor(private readonly scenarioBuilder: IScenarioBuilder) {
    const axiosConfig = {
      timeout: 1000 * 60 * 60,
      baseURL: CAMERAMAN_URL,
    };

    this.api = api(aspida(axios, axiosConfig)) as ApiInstance;
  }

  async buildRanking(keyword: string): Promise<string> {
    console.log("buildRanking", keyword);
    const scenario = await this.scenarioBuilder.buildRanking(keyword);

    console.log("posting scenario");
    const result = await this.api.rest.v1.videos.$post({
      body: {
        type: "RANKING",
        items: scenario,
      },
    });
    console.log("result", result);

    return result.url;
  }
}
