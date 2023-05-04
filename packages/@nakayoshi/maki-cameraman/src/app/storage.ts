export interface File {
  readonly filename: string;
  readonly bucket?: string;
}

export interface IStorage {
  create(filename: string, source: Buffer): Promise<File>;
  create(filename: string, path: string): Promise<File>;
}
