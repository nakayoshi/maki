import outdent from "outdent";

import { OpenAIApi } from "openai";
import {
  IScenarioService,
  ScenarioRanking,
} from "../../app/_external/scenario-service";
import { ILogger } from "../../domain/service/logger";

export class ScenarioServiceOpenAI implements IScenarioService {
  constructor(
    private readonly logger: ILogger,
    private readonly openai: OpenAIApi,
    private readonly model: string = "gpt-3.5-turbo-0301"
  ) {}

  async createScenario(
    _type: "ranking",
    prompt: string
  ): Promise<ScenarioRanking> {
    if (prompt.length >= 100) {
      throw new Error("Maximum length of prompt is 100");
    }
    this.logger.info("Creating scenario", { prompt });

    const response = await this.openai.createChatCompletion({
      model: this.model,
      messages: [
        {
          role: "system",
          content: outdent`
          これからユーザーが言うテーマについて、ユーモア性のあるランキングを、短い説明文、長い説明文、画像生成用プロンプトとともに列挙してください

          フォーマット：
          [{"rank": 1, "title": "短い説明文", "description": "長い説明文", "imagePrompt": "画像生成用プロンプト"}...]

          注意事項：
          ・ランキングは10位から始まり、1位で終わる
          ・文章はタメ口である
          ・短い説明は10字程度、長い説明は30字程度
          ・画像生成用プロンプトは、 DALL·E や Stable Diffusion などの画像生成AIで利用できるカンマ区切りの英文
					`,
        },
        {
          role: "user",
          content: `テーマ：${prompt}`,
        },
      ],
    });

    const json = response.data.choices[0].message?.content;
    this.logger.info("Created scenario", { prompt, json });
    if (json == null) {
      throw new Error("Failed to generate");
    }

    const scenario = ScenarioRanking.safeParse({
      title: prompt,
      items: JSON.parse(json),
    });
    this.logger.info("Parsed scenario", { prompt, scenario });
    if (!scenario.success) {
      throw new Error("OpenAI returned malformed response");
    }

    return scenario.data;
  }
}
