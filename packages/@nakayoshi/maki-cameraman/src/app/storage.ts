export interface File {
  readonly filename: string;
  readonly bucket?: string;
}

export interface IStorage {
  upload(path: string): Promise<File>;
}
