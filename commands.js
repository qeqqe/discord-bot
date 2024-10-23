const { ApplicationCommandOptionType } = require("discord.js");

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
    name: "dog",
    description: "dog image",
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
    name: "reminder",
    description: "Set a reminder",
    options: [
      {
        name: "duration",
        description: "The duration of the reminder",
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
      {
        name: "time-unit",
        description: "The unit of time (seconds, minutes, hours, days)",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "Seconds", value: "seconds" },
          { name: "Minutes", value: "minutes" },
          { name: "Hours", value: "hours" },
          { name: "Days", value: "days" },
        ],
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
  {
    name: "roles",
    description: "Select your roles",
  },
  {
    name: "reaction-roles",
    description: "Select your roles",
    options: [
      {
        name: "set",
        description: "Choose the role set",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "Colors", value: "colors" },
          { name: "RGB", value: "rgb" },
          // Add more choices as needed
        ],
      },
    ],
  },
];

module.exports = commands;
