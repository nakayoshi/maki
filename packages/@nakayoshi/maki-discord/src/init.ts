import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ranking",
    description: "ランキング動画を生成",
  },
];

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

export const createApplicationCommands = async () => {
  if (DISCORD_TOKEN == null) {
    throw new Error("DISCORD_TOKEN is not set");
  }

  if (DISCORD_CLIENT_ID == null) {
    throw new Error("DISCORD_CLIENT_ID is not set");
  }

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
