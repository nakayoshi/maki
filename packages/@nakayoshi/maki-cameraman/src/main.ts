import apiSpec from "@nakayoshi/maki-cameraman-spec";
import cors from "cors";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { outdent } from "outdent";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { CreateExplanationVideo } from "./app/create-explanation-video";
import { CreateRankingVideo } from "./app/create-ranking-video";
import { CreateTextVideo } from "./app/create-text-video";
import { Level } from "./domain/services/logger";
import { LoggerConsoleImpl } from "./infra/logger-console";
import { StorageCloudStorage } from "./infra/storage-cloud-storage";
import { ExplanationVideoGeneratorPlaywright } from "./infra/video-generator-explanation-playwright";
import { RankingVideoGeneratorPlaywright } from "./infra/video-generator-ranking-playwright";
import { TextVideoGeneratorPlaywright } from "./infra/video-generator-text-playwright";

const port = Number(process.env.PORT ?? 3000);
const url = (process.env.APP_URL as string) ?? `http://localhost:${port}`;

const pathOfShiningStar = path.join(
  __dirname,
  "../assets/maou_14_shining_star.mp3"
);

const logger = new LoggerConsoleImpl(Level.from("debug"));

const app = express();
app.use(express.json());

app.use(
  "/rest",
  cors(),
  OpenApiValidator.middleware({
    apiSpec: require.resolve("@nakayoshi/maki-cameraman-spec"),
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: true,
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

app.get("/logo.jpeg", cors(), (_, res) => {
  return res.sendFile(path.join(__dirname, "../assets/logo.jpeg"));
});

app.get("/openapi.json", cors(), (_, res) => {
  return res.json(apiSpec);
});

app.get("/.well-known/ai-plugin.json", cors(), (_, res) => {
  return res.json({
    schema_version: "v1",
    name_for_human: "Maki",
    name_for_model: "maki_cameraman_plugin",
    description_for_human: outdent`
    Makiはキーワードを入力するだけでランキング動画や解説動画などを自動生成できるChatGPTプラグインです,
    `,
    description_for_model: outdent`
    台本をパラメーターとして指定することによって動画を作成できるプラグインです。作成できる動画は
     - ランキング動画 (ranking): ランキング形式で項目を紹介する動画
     - 解説動画 (explanation): テキストを読み上げる動画
    があります。
    `,
    auth: {
      type: "none",
    },
    api: {
      type: "openapi",
      url: new URL("/openapi.json", url).toString(),
      is_user_authenticated: false,
    },
    logo_url: new URL("/logo.jpeg", url).toString(),
    contact_email: "n33t5hin@gmail.com",
    legal_info_url: "https://github.com/nakayoshi/maki/issues",
  });
});

app.post("/rest/v1/videos/ranking", async (req, res) => {
  logger.debug("/rest/v1/videos/ranking", req.body);
  const storage = new StorageCloudStorage("maki-cameraman-outputs");

  const rankingVideoGenerator = new RankingVideoGeneratorPlaywright(
    new URL("/ranking", process.env.THEATER_URL as string).toString(),
    path.join(__dirname, "../videos/"),
    pathOfShiningStar
  );

  const createRankingVideo = new CreateRankingVideo(
    storage,
    rankingVideoGenerator
  );

  const url = await createRankingVideo.invoke({
    type: "RANKING",
    title: req.body.title,
    items: req.body.items,
  });

  return res.send({ url });
});

app.post("/rest/v1/videos/explanation", async (req, res) => {
  logger.debug("/rest/v1/videos/explanation", req.body);
  const storage = new StorageCloudStorage("maki-cameraman-outputs");

  const explanationVideoGenerator = new ExplanationVideoGeneratorPlaywright(
    new URL("/explanation", process.env.THEATER_URL as string).toString(),
    process.env.VOICEVOX_ENGINE_URL as string,
    path.join(__dirname, "../videos/")
  );

  const createExplanationVideo = new CreateExplanationVideo(
    storage,
    explanationVideoGenerator
  );

  const url = await createExplanationVideo.invoke({
    title: req.body.title,
    scenes: req.body.scenes,
  });

  return res.send({ url });
});

app.post("/rest/v1/videos/text", async (req, res) => {
  logger.debug("/rest/v1/videos/text", req.body);
  const storage = new StorageCloudStorage("maki-cameraman-outputs");

  const textVideoGenerator = new TextVideoGeneratorPlaywright(
    process.env.THEATER_URL as string,
    path.join(__dirname, "../videos/"),
    { width: 1920, height: 1080 }
  );

  const createTextVideo = new CreateTextVideo(storage, textVideoGenerator);

  const url = await createTextVideo.invoke({
    text: req.body.text,
  });

  return res.send({ url });
});

app.listen(port, (): void => {
  console.log(`Server is ready at ${port}`);
});
