const { EmbedBuilder } = require("discord.js");

const API = "https://official-joke-api.appspot.com/random_joke";

const RandomJoke = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "joke") {
    try {
      const response = await fetch(API);
      const joke = await response.json();
      const embed = new EmbedBuilder()
        .setTitle("Random Ass Jokes")
        .setDescription(`${joke.setup}\n\n${joke.punchline}`)
        .setColor("Random");
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching joke:", error);
      await interaction.reply({
        content: "Error found",
        ephemeral: true,
      });
    }
  }
};

module.exports = { RandomJoke };
