import { IStorage } from "./storage";
import {
  ExplanationScene,
  IExplanationVideoGenerator,
} from "./video-generator-explanation";

export interface CreateExplanationVideoParams {
  readonly title: string;
  readonly scenes: readonly ExplanationScene[];
}

export class CreateExplanationVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly explanationVideoGenerator: IExplanationVideoGenerator
  ) {}

  async invoke(params: CreateExplanationVideoParams): Promise<string> {
    const output = await this.explanationVideoGenerator.generate({
      title: params.title,
      scenes: params.scenes,
    });

    const file = await this.storage.upload(output);
    return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
  }
}
