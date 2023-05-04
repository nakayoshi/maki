export interface CombineVideoAndAudio {
  combine(
    videoPath: string,
    audioPath: string,
    outputFilePath: string
  ): Promise<void>;
}
