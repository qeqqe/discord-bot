const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { AiChatBot } = require("./components/AiChat");
const dotenv = require("dotenv");
const BotPing = require("./components/BotPing");
const { Weather } = require("./components/WeatherCommand");
const UserPing = require("./components/UserPingReacts");
const CustomMessageReplies = require("./components/CustomMessageReplies");
const { AssignUserRole, RemoveUserRole } = require("./components/AddRole");
const Media = require("./components/Media");
const ReactionRoles = require("./components/ReactionRoles");
const { Ping, Echo } = require("./components/SlashCommands");
const { Purge } = require("./components/Purge");
const {
  Kick,
  Ban,
  Unban,
  Timeout,
  UnTimeout,
} = require("./components/ModerationCommands");
const { RandomJoke } = require("./components/RandomJokeGenerator");
const CatImage = require("./components/CatImageApi");
const DogImage = require("./components/DogImage");
const { UserAvatar, UserBanner } = require("./components/UserAvatarBanner");
const { Lewd, handleRefresh: handleLewdRefresh } = require("./components/Lewd");
const EightBall = require("./components/8Ball");
const { Reminder } = require("./components/Reminder");
const {
  Sussy,
  handleRefresh: handleSussyRefresh,
} = require("./components/sussy");
const { StableDiffusion } = require("./components/StableDiffusion");
const Resize = require("./components/Resize");
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
  ],
});

client.setMaxListeners(25);

const commands = require("./commands");

const handleReactionRoles = require("./components/ReactionRoles");

const guildIds = [
  "1275492506414481468",
  "1302155425587658762",
  "1208703376121139241",
];

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    console.log("Started refreshing application (/) commands.");

    for (const guildId of guildIds) {
      const guild = client.guilds.cache.get(guildId);
      if (guild) {
        await guild.commands.set(commands);
      } else {
        await client.application.commands.set(commands);
      }
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error refreshing application (/) commands:", error);
  }
});

client.on("interactionCreate", Ping);
client.on("interactionCreate", Echo);
client.on("interactionCreate", DogImage);
client.on("interactionCreate", Kick);
client.on("interactionCreate", Ban);
client.on("interactionCreate", Unban);
client.on("interactionCreate", Timeout);
client.on("interactionCreate", UnTimeout);
client.on("interactionCreate", CatImage);
client.on("interactionCreate", UserAvatar);
client.on("interactionCreate", Purge);
client.on("interactionCreate", UserBanner);
client.on("interactionCreate", RandomJoke);
client.on("interactionCreate", Weather);
client.on("interactionCreate", EightBall);
client.on("interactionCreate", Reminder);
client.on("interactionCreate", StableDiffusion);
client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isCommand()) {
      if (interaction.commandName === "lewd") {
        await Lewd(interaction);
      } else if (interaction.commandName === "sussy") {
        await Sussy(interaction);
      }
    } else if (interaction.isButton()) {
      if (interaction.customId.startsWith("refresh_")) {
        const [, command, ...rest] = interaction.customId.split("_");
        if (command === "lewd") {
          await handleLewdRefresh(interaction);
        } else if (command === "sussy") {
          await handleSussyRefresh(interaction);
        }
      }
    }
  } catch (error) {
    console.error("Error handling interaction:", error);
    try {
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        });
      } else {
        await interaction.followUp({
          content: "An error occurred while processing your request.",
          ephemeral: true,
        });
      }
    } catch (replyError) {
      console.error("Error sending error message:", replyError);
    }
  }
});

client.on("messageCreate", CustomMessageReplies);
client.on("messageCreate", BotPing);
client.on("messageCreate", UserPing);
client.on("messageCreate", AssignUserRole);
client.on("messageCreate", RemoveUserRole);
client.on("messageCreate", AiChatBot);

client.on("interactionCreate", Media);

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand() || interaction.isStringSelectMenu()) {
    await handleReactionRoles(interaction, client);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.commandName === "resize") {
    await Resize.execute(interaction);
  }
});

client.login(process.env.BOT_TOKEN_KEY);
