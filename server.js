const {
  Client,
  GatewayIntentBits,
  Partials,
  REST,
  ApplicationCommandOptionType,
} = require("discord.js");
const { AiChatBot } = require("./components/AiChat");
const dotenv = require("dotenv");
const BotPing = require("./components/BotPing");
const { Weather } = require("./components/WeatherCommand");
const UserPing = require("./components/UserPingReacts");
const CustomMessageReplies = require("./components/CustomMessageReplies");
const { AssignUserRole, RemoveUserRole } = require("./components/AddRole");
const Media = require("./components/Media");
const { Ping, Echo } = require("./components/SlashCommands");
const {
  Kick,
  Ban,
  Unban,
  Timeout,
  UnTimeout,
} = require("./components/ModerationCommands");
const { RandomJoke } = require("./components/RandomJokeGenerator");
const CatImage = require("./components/CatImageApi");
const { UserAvatar, UserBanner } = require("./components/UserAvatarBanner");
const { Lewd, handleRefresh: handleLewdRefresh } = require("./components/Lewd");
const EightBall = require("./components/8Ball");
const {
  Sussy,
  handleRefresh: handleSussyRefresh,
} = require("./components/sussy");
dotenv.config();
const BOT_PREFIX = "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message],
});

client.setMaxListeners(25);

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "echo",
    description: "Replies with the message you want",
    options: [
      {
        name: "message",
        description: "The message you want to echo",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "kick",
    description: "Kicks a member",
    options: [
      {
        name: "member",
        description: "The member you wanna kick",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "ban",
    description: "Bans a member",
    options: [
      {
        name: "member",
        description: "The member you wanna ban",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "unban",
    description: "Unbans a member",
    options: [
      {
        name: "member",
        description: "The member you wanna unban",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "timeout",
    description: "Times out a member",
    options: [
      {
        name: "member",
        description: "The member you wanna timeout",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "reason",
        description: "The reason for the timeout",
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "cat",
    description: "silly car image",
  },
  {
    name: "untimeout",
    description: "Un-times out a member",
    options: [
      {
        name: "member",
        description: "The member you wanna untimeout",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "avatar",
    description: "Replies with the user's avatar",
    options: [
      {
        name: "user",
        description: "The user you want to get the avatar of",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "banner",
    description: "Replies with the user's banner",
    options: [
      {
        name: "user",
        description: "The user you want to get the banner of",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "joke",
    description: "Genrates a random joke haha funny",
  },
  {
    name: "weather",
    description: "Get the weather for a city",
    options: [
      {
        name: "city",
        description: "The city you want to get the weather for",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "media",
    description: "Get an SFW anime image",
    options: [
      {
        name: "category",
        description: "Choose a category for the image",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "Waifu", value: "waifu" },
          { name: "Neko", value: "neko" },
          { name: "Shinobu", value: "shinobu" },
          { name: "Megumin", value: "megumin" },
          { name: "Bully", value: "bully" },
          { name: "Cuddle", value: "cuddle" },
          { name: "Cry", value: "cry" },
          { name: "Hug", value: "hug" },
          { name: "Kiss", value: "kiss" },
          { name: "Lick", value: "lick" },
          { name: "Pat", value: "pat" },
          { name: "Smug", value: "smug" },
          { name: "Bonk", value: "bonk" },
          { name: "Yeet", value: "yeet" },
          { name: "Blush", value: "blush" },
          { name: "Smile", value: "smile" },
          { name: "Wave", value: "wave" },
          { name: "Highfive", value: "highfive" },
          { name: "Nom", value: "nom" },
          { name: "Bite", value: "bite" },
          { name: "Glomp", value: "glomp" },
          { name: "Slap", value: "slap" },
          { name: "Kill", value: "kill" },
          { name: "Kick", value: "kick" },
          { name: "Happy", value: "happy" },
        ],
      },
      {
        name: "user",
        description: "The user you want to mention with the image",
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  },
  {
    name: "lewd",
    description: "Get a lewd image",
    options: [
      {
        name: "tags",
        description: "The tags for the lewd image you want",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "8ball",
    description: "Ask the magic 8-ball a question",
    options: [
      {
        name: "question",
        description: "The question you want to ask",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "sussy",
    description: "Get a NSFW anime image",
    options: [
      {
        name: "category",
        description: "Choose a category for the image",
        type: ApplicationCommandOptionType.String,
        required: false,
        choices: [
          { name: "Waifu", value: "waifu" },
          { name: "Neko", value: "neko" },
          { name: "Trap", value: "trap" },
          { name: "Blowjob", value: "blowjob" },
        ],
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN_KEY);
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    console.log("Started refreshing application (/) commands.");

    const guild = client.guilds.cache.get("1275492506414481468");
    if (guild) {
      await guild.commands.set(commands);
    } else {
      await client.application.commands.set(commands);
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error refreshing application (/) commands:", error);
  }
});

client.on("interactionCreate", Ping);
client.on("interactionCreate", Echo);
client.on("interactionCreate", Kick);
client.on("interactionCreate", Ban);
client.on("interactionCreate", Unban);
client.on("interactionCreate", Timeout);
client.on("interactionCreate", UnTimeout);
client.on("interactionCreate", CatImage);
client.on("interactionCreate", UserAvatar);
client.on("interactionCreate", UserBanner);
client.on("interactionCreate", RandomJoke);
client.on("interactionCreate", Weather);
client.on("interactionCreate", EightBall);
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

client.login(process.env.BOT_TOKEN_KEY);
