import outdent from "outdent";

import { Scenario } from "./ranking";
import { OpenAIApi } from "openai";
import { IScenarioBuilder } from "./scenario-builder";

export class ScenarioBuilderOpenAI implements IScenarioBuilder {
  constructor(private readonly openai: OpenAIApi) {}

  async buildRanking(keyword: string): Promise<Scenario> {
    if (keyword.length >= 100) {
      throw new Error("Maximum length of keyword is 100");
    }

    console.log("keyword", keyword);
    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "user",
          content: outdent`
					これからいうテーマについて、ユーモア性のあるランキングを、短い説明文、長い説明文とともに列挙してください

					フォーマット：
					[{"rank": 1, "title": "短い説明文", "description": "長い説明文"}...]
					
					注意事項：
					・ランキングは10位から１位まで
					・文章はタメ口である。
					・短い説明は10字程度、長い説明は30字程度
					
					テーマ：${keyword}
					`,
        },
      ],
    });

    const json = response.data.choices[0].message?.content;
    console.log("json", json);
    if (json == null) {
      throw new Error("Failed to generate");
    }

    const scenario = Scenario.safeParse(JSON.parse(json));
    console.log("scenario.success", scenario.success);
    if (!scenario.success) {
      throw new Error("OpenAI returned malformed response");
    }

    return scenario.data;
  }
}
