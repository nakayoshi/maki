import express from "express";
import apiSpec from "@nakayoshi/maki-api-spec";
import { mkdirp } from "mkdirp";
import path from "node:path";
import os from "node:os";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";
import { VideoServiceCameraman } from "./infra/services/video-service-cameraman";
import { createVideo } from "./adapters/controllers/videos";
import { ScenarioServiceOpenAI } from "./infra/services/scenario-service-openai";
import { ImageServiceDreamStudio } from "./infra/services/image-service-dream-studio";
import { Configuration, OpenAIApi } from "openai";
import { StorageCloudStorage } from "./infra/services/storage-cloud-storage";
import { LoggerConsoleImpl } from "./infra/services/logger-console";
import { Level } from "./domain/service/logger";

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
  const scenarioService = new ScenarioServiceOpenAI(
    logger,
    new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION,
      })
    )
  );

  const imageOutDir = path.join(os.tmpdir(), "maki");
  await mkdirp(imageOutDir);

  const imageService = new ImageServiceDreamStudio(
    process.env.DREAMSTUDIO_API_KEY as string,
    imageOutDir
  );

  try {
    const response = await createVideo(
      logger,
      storage,
      videoService,
      scenarioService,
      imageService,
      req.body
    );
    return res.json(response).status(200);
  } catch (error) {
    logger.error("Fatal error", { error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
