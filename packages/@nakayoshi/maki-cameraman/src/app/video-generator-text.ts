export interface ITextVideoGenerator {
  generate(text: string): Promise<string>;
}
