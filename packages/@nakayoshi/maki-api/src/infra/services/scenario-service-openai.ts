import outdent from "outdent";
import neatCsv from "neat-csv";

import { OpenAIApi } from "openai";
import {
  IScenarioService,
  ScenarioRanking,
} from "../../app/_external/scenario-service";
import { ILogger } from "../../domain/service/logger";

export class ScenarioServiceOpenAI implements IScenarioService {
  constructor(
    private readonly logger: ILogger,
    private readonly openai: OpenAIApi
  ) {}

  async createScenario(
    _type: "ranking",
    prompt: string,
    model = "gpt-3.5-turbo-0301"
  ): Promise<ScenarioRanking> {
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
          これから言うテーマについて、ユーモア性のあるランキングを、名前、説明文、画像生成用プロンプトとともにで列挙してください。

          フォーマット：
          下記に示すCSVの形式にしてください。
          "rank","name","description","imagePrompt"
          
          注意事項：
          ・ランキングは10位から始まり、1位で終わる
          ・文章はタメ口である
          ・名前は10字程度、説明文は30字程度
          ・画像生成用プロンプトは DALL·E や Stable Diffusion で利用できるカンマ区切り英単語の羅列
          
          テーマ：${prompt}
          `,
        },
      ],
    });

    const csv = response.data.choices[0].message?.content;
    this.logger.info("Created scenario", { prompt, csv });
    if (csv == null) {
      throw new Error("Failed to generate");
    }

    const items = await neatCsv(csv, {
      mapValues: ({ header, value }) => {
        if (header === "rank") return Number(value);
        return value;
      },
    });

    const scenario = ScenarioRanking.safeParse({
      title: prompt,
      items,
    });

    this.logger.info("Parsed scenario", { prompt, scenario });
    if (!scenario.success) {
      throw new Error("OpenAI returned malformed response");
    }

    return scenario.data;
  }
}
