import { REST, Routes } from "discord.js";

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
    await rest.delete(Routes.applicationCommands(DISCORD_CLIENT_ID));
  } catch (error) {
    console.error(error);
  }
};
