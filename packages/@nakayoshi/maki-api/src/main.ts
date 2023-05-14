import apiSpec from "@nakayoshi/maki-api-spec";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { mkdirp } from "mkdirp";
import os from "node:os";
import path from "node:path";
import { Configuration, OpenAIApi } from "openai";
import swaggerUi from "swagger-ui-express";
import {
  createExplanationVideo,
  createRankingVideo,
} from "./adapters/controllers/videos";
import { Level } from "./domain/service/logger";
import { ImageServiceDreamStudio } from "./infra/services/image-service-dream-studio";
import { LoggerConsoleImpl } from "./infra/services/logger-console";
import { ExplanationScenarioServiceOpenAI } from "./infra/services/scenario-explanation-service-openai";
import { RankingScenarioServiceOpenAI } from "./infra/services/scenario-ranking-service-openai";
import { StorageCloudStorage } from "./infra/services/storage-cloud-storage";
import { VideoServiceCameraman } from "./infra/services/video-service-cameraman";

const app = express();
app.use(express.json());

app.use(
  "/rest",
  OpenApiValidator.middleware({
    apiSpec: require.resolve("@nakayoshi/maki-api-spec"),
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: true,
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

app.post("/rest/v1/videos", async (req, res) => {
  const logger = new LoggerConsoleImpl(Level.from("debug"));
  const storage = new StorageCloudStorage("maki-api-image-outputs");
  const videoService = new VideoServiceCameraman(
    logger,
    process.env.CAMERAMAN_URL as string
  );
  const openApi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    })
  );

  const imageOutDir = path.join(os.tmpdir(), "maki");
  await mkdirp(imageOutDir);

  const imageService = new ImageServiceDreamStudio(
    process.env.DREAMSTUDIO_API_KEY as string,
    imageOutDir
  );

  try {
    if (req.body.type === "RANKING") {
      const scenarioService = new RankingScenarioServiceOpenAI(logger, openApi);
      const response = await createRankingVideo(
        logger,
        storage,
        videoService,
        scenarioService,
        imageService,
        req.body
      );
      return res.json(response).status(200);
    }

    if (req.body.type === "EXPLANATION") {
      const scenarioService = new ExplanationScenarioServiceOpenAI(
        logger,
        openApi
      );
      const response = await createExplanationVideo(
        logger,
        storage,
        videoService,
        scenarioService,
        imageService,
        req.body
      );
      return res.json(response).status(200);
    }
  } catch (error) {
    logger.error("Fatal error", { error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
