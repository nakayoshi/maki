import ffmpeg from "fluent-ffmpeg";

const ffprobe = (path: string) => {
  return new Promise<ffmpeg.FfprobeData>((resolve, reject) => {
    ffmpeg.ffprobe(path, (err, data) => {
      if (err != null) reject(err);
      resolve(data);
    });
  });
};

export class CombineVideoAndAudio {
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

    const fadeLength = 4;
    const fadeStartSec = videoDuration - fadeLength;

    await ffmpeg(videoPath)
      .input(audioPath)
      .outputOption("-map 0:v")
      .outputOption("-map 1:a")
      .videoFilters(`fade=out:st=${fadeStartSec}:d=${fadeLength}`) // 動画の開始位置からfadeStartSec秒で映像のフェードアウト開始, fadeLength秒間かけてフェードアウト
      .audioFilters(`afade=out:st=${fadeStartSec}:d=${fadeLength}`) // 動画の開始位置からfadeStartSec秒で音声のフェードアウト開始, fadeLength秒間かけてフェードアウト
      .outputOption(`-t ${videoDuration}`)
      .save(outputFilePath);
  }
}
