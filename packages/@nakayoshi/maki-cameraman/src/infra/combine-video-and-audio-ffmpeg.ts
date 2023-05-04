import ffmpeg from "fluent-ffmpeg";
import { ICombineVideoAndAudio } from "../app/combine-video-and-audio";

const ffprobe = (path: string) => {
  return new Promise<ffmpeg.FfprobeData>((resolve, reject) => {
    ffmpeg.ffprobe(path, (err, data) => {
      if (err != null) reject(err);
      resolve(data);
    });
  });
};

export class CombineVideoAndAudioFfmpeg implements ICombineVideoAndAudio {
  async combine(
    videoPath: string,
    audioPath: string,
    outputFilePath: string
  ): Promise<void> {
    const metadata = await ffprobe(videoPath);

    const videoDuration = Math.ceil(metadata.format.duration ?? 0);

    if (videoDuration == null) {
      throw Error("videoDuration is not defined.");
    }

    const fadeLength = Math.min(videoDuration * 0.05, 4);
    const fadeStartSec = videoDuration - fadeLength;

    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .input(audioPath)
        .outputOption("-map 0:v")
        .outputOption("-map 1:a")
        .videoFilters(`fade=out:st=${fadeStartSec}:d=${fadeLength}`) // 動画の開始位置からfadeStartSec秒で映像のフェードアウト開始, fadeLength秒間かけてフェードアウト
        .audioFilters(`afade=out:st=${fadeStartSec}:d=${fadeLength}`) // 動画の開始位置からfadeStartSec秒で音声のフェードアウト開始, fadeLength秒間かけてフェードアウト
        .outputOption(`-t ${videoDuration}`)
        .save(outputFilePath)
        .on("end", () => {
          resolve();
        });
    });
  }
}
