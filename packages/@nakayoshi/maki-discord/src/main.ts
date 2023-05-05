import { Client, Events, GatewayIntentBits } from "discord.js";
import { createApplicationCommands } from "./init";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  await createApplicationCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ranking") {
    await interaction.reply("ﾅﾆｿﾚｲﾐﾜｶﾝﾅｲ");
  }
});

client.login(process.env.DISCORD_TOKEN);
