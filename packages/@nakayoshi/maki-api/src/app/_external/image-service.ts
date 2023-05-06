export interface IImageService {
  createImage(prompt: string): Promise<string>;
}
