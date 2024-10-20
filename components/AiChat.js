const { EmbedBuilder } = require("discord.js");
const dotenvConfig = require("dotenv");
dotenvConfig.config();
const API_KEY = process.env.AI_BOT_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

const AiChatBot = async (message) => {
  if (!message.mentions.has(message.client.user) || message.author.bot) return;

  try {
    const userMessage = message.content.replace(/<@!?\d+>/g, "").trim();
    const user = message.author.username;

    await message.channel.sendTyping();

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;

    const splitMessage = (str, maxLength = 2000) => {
      const chunks = [];
      let i = 0;
      while (i < str.length) {
        chunks.push(str.slice(i, i + maxLength));
        i += maxLength;
      }
      return chunks;
    };

    const fullResponse = `${aiResponse}`;
    const messageChunks = splitMessage(fullResponse);

    for (const chunk of messageChunks) {
      await message.reply(chunk);
    }
  } catch (error) {
    console.error("Error in AiChatBot:", error);
    await message.reply("Sorry, there was an error processing your request.");
  }
};

module.exports = { AiChatBot };

// with slash command
// const { EmbedBuilder } = require("discord.js");
// const dotenvConfig = require("dotenv");
// dotenvConfig.config();
// const API_KEY = process.env.AI_BOT_API_KEY;
// const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

// const AiChatBot = async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "chat") {
//     await interaction.deferReply();

//     try {
//       const userMessage = interaction.options.getString("message");
//       const user = interaction.user.username;
//       const response = await fetch(URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: userMessage,
//                 },
//               ],
//             },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       const aiResponse = data.candidates[0].content.parts[0].text;
//       const embed = new EmbedBuilder()
//         .setTitle("wiz dude")
//         .setDescription(`${user}: ${userMessage}\n\n${aiResponse}`)
//         .setColor("Blue");

//       await interaction.editReply({ embeds: [embed] });
//     } catch (error) {
//       console.error("Error in AiChatBot:", error);

//       if (interaction.replied || interaction.deferred) {
//         await interaction.editReply({
//           content: "Sorry, there was an error processing your request.",
//         });
//       } else {
//         await interaction.reply({
//           content: "Sorry, there was an error processing your request.",
//           ephemeral: true,
//         });
//       }
//     }
//   }
// };

// module.exports = { AiChatBot };
