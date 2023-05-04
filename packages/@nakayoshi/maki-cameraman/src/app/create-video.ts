import { IVideoGenerator } from "./video-generator";
import { IStorage } from "./storage";

export interface CreateVideoParams {
  readonly type: "TEXT";
  readonly text: string;
}

export class CreateVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly videoGenerator: IVideoGenerator
  ) {}

  async invoke(params: CreateVideoParams): Promise<string> {
    const videoFile = await this.videoGenerator.generate("text", params.text);
    const file = await this.storage.upload(videoFile);

    return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
  }
}