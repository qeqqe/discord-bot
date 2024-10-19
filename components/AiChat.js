const { EmbedBuilder } = require("discord.js");
const dotenvConfig = require("dotenv");
dotenvConfig.config();
const API_KEY = process.env.AI_BOT_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

const AiChatBot = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "chat") {
    await interaction.deferReply();

    try {
      const userMessage = interaction.options.getString("message");
      const user = interaction.user.username;
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
      const embed = new EmbedBuilder()
        .setTitle("wiz dude")
        .setDescription(`${user}: ${userMessage}\n\n${aiResponse}`)
        .setColor("Blue");

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in AiChatBot:", error);

      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({
          content: "Sorry, there was an error processing your request.",
        });
      } else {
        await interaction.reply({
          content: "Sorry, there was an error processing your request.",
          ephemeral: true,
        });
      }
    }
  }
};

module.exports = { AiChatBot };
