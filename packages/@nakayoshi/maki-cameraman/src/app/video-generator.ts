export interface IVideoGenerator {
  generate(type: "text", text: string): Promise<string>;
}
