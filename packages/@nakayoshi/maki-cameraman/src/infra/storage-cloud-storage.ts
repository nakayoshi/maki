import { Storage as CloudStorage } from "@google-cloud/storage";
import { IStorage, File } from "../app/storage";

export class StorageCloudStorage implements IStorage {
  constructor(private readonly bucket: string) {}

  private readonly storage = new CloudStorage();

  async create(filename: string, source: Buffer): Promise<File>;
  async create(filename: string, path: string): Promise<File>;
  async create(filename: string, path: Buffer | string): Promise<File> {
    if (typeof path !== "string") {
      throw new Error("Upload from buffer is not supported yet");
    }

    const bucket = this.storage.bucket(this.bucket);
    const file = bucket.file(filename);
    await file.save(path);

    return {
      filename: file.name,
      bucket: file.bucket.name,
    };
  }
}
