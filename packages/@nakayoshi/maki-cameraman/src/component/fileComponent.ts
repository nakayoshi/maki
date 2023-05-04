interface FileComponent {
  /**
   * Upload file from local path
   * @param path local path for file to upload
   * @returns key of file uploaded
   */
  upload(path: string): Promise<string>;
}
