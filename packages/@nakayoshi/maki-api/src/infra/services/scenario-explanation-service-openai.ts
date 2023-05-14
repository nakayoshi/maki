import outdent from "outdent";
import neatCsv from "neat-csv";

import { OpenAIApi } from "openai";
import {
  IExplanationScenarioService,
  ScenarioExplanation,
} from "../../app/_external/scenario-service";
import { ILogger } from "../../domain/service/logger";

export class ExplanationScenarioServiceOpenAI
  implements IExplanationScenarioService
{
  constructor(
    private readonly logger: ILogger,
    private readonly openai: OpenAIApi
  ) {}

  async createScenario(
    prompt: string,
    model = "gpt-3.5-turbo-0301"
  ): Promise<ScenarioExplanation> {
    if (prompt.length >= 100) {
      throw new Error("Maximum length of prompt is 100");
    }
    this.logger.info("Creating scenario", { prompt });

    const response = await this.openai.createChatCompletion({
      model,
      messages: [
        {
          role: "user",
          content: outdent`
					「ずんだもん」という架空のキャラクターが「${prompt}」について聴衆にユーモラスに語りかける形式で解説する映像作品の台本を書いてください。

          フォーマット：
          下記に示すヘッダー付きのCSVの形式にしてください。
          "text","facialExpression","imagePrompt"
          
          注意事項：
					・シーンは全てで10個
          ・facialExpression は angry, embarrassed, fearful, joyful, normal, thinking のいずれか。空白にすることはできません。
					・ずんだもんの語尾は「〜なのだ」「〜のだ」で、一人称は「ぼく」。
					・各シーンのずんだ門の発言は100文字以内
          ・画像生成用プロンプトは DALL·E や Stable Diffusion で利用できるカンマ区切り英単語の羅列
          
          テーマ：${prompt}
          `,
        },
      ],
    });

    const csv = response.data.choices[0].message?.content;
    if (csv == null) {
      throw new Error("Failed to generate");
    }

    const scenes = await neatCsv(csv, {
      mapValues: ({ value }) => {
        return value.trim().replace(/^"/, "").replace(/"$/, "");
      },
    });
    this.logger.info("Created scenario", { prompt, scenes });

    const scenario = ScenarioExplanation.safeParse({
      title: prompt,
      scenes,
    });

    this.logger.info("Parsed scenario", { prompt, scenario });
    if (!scenario.success) {
      throw new Error("OpenAI returned malformed response");
    }

    return scenario.data;
  }
}
