import fs from "fs";
import { Storage as CloudStorage } from "@google-cloud/storage";
import { IStorage, File } from "../app/storage";

export class StorageCloudStorage implements IStorage {
  constructor(private readonly bucket: string) {}

  private readonly storage = new CloudStorage();

  async upload(path: string): Promise<File> {
    if (typeof path !== "string") {
      throw new Error("Upload from buffer is not supported yet");
    }

    if (!fs.existsSync(path)) {
      throw new Error(`Given file ${path} does not exist`);
    }

    const bucket = this.storage.bucket(this.bucket);
    const [file] = await bucket.upload(path);

    return {
      filename: file.name,
      bucket: file.bucket.name,
    };
  }
}
