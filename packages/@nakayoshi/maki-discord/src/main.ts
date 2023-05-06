import { Client, Events, GatewayIntentBits } from "discord.js";
import axios from "axios";
import { createApplicationCommands } from "./init";
import aspida from "@aspida/axios";
import { outdent } from "outdent";
import api from "./generated/$api";

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

    const prompt = interaction.options.getString("prompt");
    const model = interaction.options.getString("model") ?? undefined;
    await interaction.reply(`「${prompt}」のランキングを作成中...`);

    try {
      if (prompt == null) {
        throw new Error("prompt is null");
      }

      const client = api(
        aspida(axios, {
          baseURL: "https://api.maki.nakayoshi.dance",
          timeout: 1000 * 60 * 10,
        })
      );

      const video = await client.rest.v1.videos.$post({
        body: {
          type: "RANKING",
          prompt,
          model,
        },
      });

      await interaction.channel?.send(outdent`
      「${prompt}」のランキング動画を作成しました
      ${video.url}
      `);
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
