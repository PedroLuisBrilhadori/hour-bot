// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, GuildMember } from "discord.js";
import moment from "moment-timezone";
import * as dotenv from "dotenv";

dotenv.config();
const { TOKEN, GUILD, TIMEZONE } = process.env;

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
  const time = moment(new Date());
  const nickname = time.clone().tz(TIMEZONE).format("HH:mm");

  bot.setNickname(`Hora: ${nickname}`);
}

client.login(TOKEN);
