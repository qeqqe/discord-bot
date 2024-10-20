const API = "https://api.thecatapi.com/v1/images/search";
const { EmbedBuilder } = require("discord.js");

const CatImage = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "cat") {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setTitle("Cat Image")
        .setImage(data[0].url)
        .setColor("Blue")
        .setFooter({
          text: `${interaction.user.username}`,
          iconURL: interaction.user.avatarURL(),
        });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching cat image:", error);
      await interaction.reply({
        content: "Sorry, I couldn't fetch a cat image at the moment.",
        ephemeral: true,
      });
    }
  }
};

module.exports = CatImage;
