import { Client, Events, GatewayIntentBits } from "discord.js";
import { createApplicationCommands } from "./init";
import { VideoBuilderCameraman } from "./video-builder/video-builder-cameraman";
import { ScenarioBuilderOpenAI } from "./scenario-builder/scenario-builder-openai";
import { Configuration, OpenAIApi } from "openai";
import { outdent } from "outdent";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  await createApplicationCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ranking") {
    if (interaction.channel == null) {
      throw new Error("channel is null");
    }

    const keyword = interaction.options.getString("keyword");
    await interaction.reply(`${keyword}のランキングを作成中...`);

    try {
      const openai = new OpenAIApi(
        new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
          organization: process.env.OPENAI_ORGANIZATION,
        })
      );
      const scenarioBuilder = new ScenarioBuilderOpenAI(openai);
      const videoGenerator = new VideoBuilderCameraman(scenarioBuilder);
      if (keyword == null) {
        throw new Error("keyword is null");
      }
      const url = await videoGenerator.buildRanking(keyword);
      await interaction.channel?.send({ files: [url] });
    } catch (e) {
      console.error(e);
      await interaction.channel?.send(outdent`
      エラーが発生しました
      \`\`\`
      ${e}
      \`\`\`
      `);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
