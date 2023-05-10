import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import apiSpec from "@nakayoshi/maki-cameraman-spec";
import swaggerUi from "swagger-ui-express";
import { Methods } from "./adapters/generated/rest/v1/videos";
import { CreateVideo } from "./app/create-video";
import { StorageCloudStorage } from "./infra/storage-cloud-storage";
import { TextVideoGeneratorPlaywright } from "./infra/video-generator-text-playwright";
import path from "path";
import { RankingVideoGeneratorPlaywright } from "./infra/video-generator-ranking-playwright";
import { CombineVideoAndAudioFfmpeg } from "./infra/combine-video-and-audio-ffmpeg";

const pathOfShiningStar = path.join(
  __dirname,
  "../assets/maou_14_shining_star.mp3"
);

const app = express();
app.use(express.json());

app.use(
  "/rest",
  OpenApiValidator.middleware({
    apiSpec: require.resolve("@nakayoshi/maki-cameraman-spec"),
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: false,
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

app.post("/rest/v1/videos", async (req, res) => {
  const body = req.body as Methods["post"]["reqBody"];

  if (body.type === "YUKKURI") {
    res.status(501).send("not implemented");
  }

  const storage = new StorageCloudStorage("maki-cameraman-outputs");

  const textVideoGenerator = new TextVideoGeneratorPlaywright(
    process.env.THEATER_URL as string,
    path.join(__dirname, "../videos/"),
    { width: 1920, height: 1080 }
  );

  const rankingVideoGenerator = new RankingVideoGeneratorPlaywright(
    new URL("/ranking", process.env.THEATER_URL as string).toString(),
    path.join(__dirname, "../videos/"),
    pathOfShiningStar
  );

  const combineAudioAndVideo = new CombineVideoAndAudioFfmpeg();

  const createVideo = new CreateVideo(
    storage,
    rankingVideoGenerator,
    textVideoGenerator,
    combineAudioAndVideo,
    {
      audioPath: pathOfShiningStar,
      outputDir: path.join(__dirname, "../videos/"),
    }
  );

  if (body.type === "RANKING") {
    const url = await createVideo.invoke({
      type: "RANKING",
      title: body.title,
      items: body.items,
    });

    res.send({ url } as Methods["post"]["resBody"]);
  }

  if (body.type === "TEXT") {
    const url = await createVideo.invoke({
      type: "TEXT",
      text: body.text,
    });

    res.send({ url } as Methods["post"]["resBody"]);
  }
});

const port = Number(process.env.PORT);
app.listen(port, (): void => {
  console.log(`Server is ready at ${port}`);
});
