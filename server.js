const { Client, GatewayIntentBits, Partials } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message],
});

client.on("messageCreate", (msg) => {
  if (msg.content.toLowerCase() === "<@975440571302805608>") {
    msg.react("👋");
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "!ping") {
    message.reply("pong");
  }
});

client.on("messageCreate", (msg) => {
  if (msg.content.toLowerCase() === "hillo") {
    msg.channel.send("Hello");
  }
});
client.on("messageCreate", (msg) => {
  if (msg.content.toLowerCase() === "nigga") {
    msg.reply("hi");
  }
});

client.on("messageCreate", (msg) => {
  if (msg.content.toLocaleLowerCase() === "!nigga-role") {
    msg.member.roles.add("1296913383895072768");
  }
});

client.on("messageDelete", (msg) => {
  msg.channel.send("Dont delete the message nigga!");
});

client.login(process.env.BOT_TOKEN_KEY);
