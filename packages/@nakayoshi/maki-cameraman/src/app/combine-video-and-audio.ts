export interface ICombineVideoAndAudio {
  combine(
    videoPath: string,
    audioPath: string,
    outputFilePath: string
  ): Promise<void>;
}
