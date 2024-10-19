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
const Media = require("./components/Lewd");
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
dotenv.config();
const BOT_PREFIX = "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
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
    name: "media",
    description: "Get an image",
    options: [
      {
        name: "type",
        description: "Choose type of the image: 'sfw' or 'nsfw'",
        required: true,
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "SFW",
            value: "sfw",
          },
          {
            name: "NSFW",
            value: "nsfw",
          },
        ],
      },
      {
        name: "search",
        description: "Search for any category related to the image",
        required: false,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "chat",
    description: "Chat with the AI bot",
    options: [
      {
        name: "message",
        description: "The message you want to chat with the AI bot",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
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
client.on("interactionCreate", AiChatBot);
client.on("interactionCreate", Media);

client.on("messageCreate", CustomMessageReplies);
client.on("messageCreate", BotPing);
client.on("messageCreate", UserPing);
client.on("messageCreate", AssignUserRole);
client.on("messageCreate", RemoveUserRole);

client.login(process.env.BOT_TOKEN_KEY);
