import { ITextVideoGenerator } from "./video-generator-text";
import { IStorage } from "./storage";

export interface CreateTextVideoParams {
  readonly text: string;
}

export class CreateTextVideo {
  constructor(
    private readonly storage: IStorage,
    private readonly textVideoGenerator: ITextVideoGenerator
  ) {}

  async invoke(params: CreateTextVideoParams): Promise<string> {
    const output = await this.textVideoGenerator.generate(params.text);
    const file = await this.storage.upload(output);
    return `https://storage.googleapis.com/${file.bucket}/${file.filename}`;
  }
}
