// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, GuildMember } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();
const { TOKEN, GUILD } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.guilds.client.once(Events.ClientReady, async (c) => {
  console.log(`Bot start!`);
  const guild = await client.guilds.fetch(GUILD);
  const bot = await guild.members.fetch(c.user.id);

  setHour(bot);

  setInterval(async () => {
    setHour(bot);
  }, 45000);
});

function setHour(bot: GuildMember) {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const nickname = `${hours}:${minutes}`;

  bot.setNickname(`Hora: ${nickname}`);
}

client.login(TOKEN);
