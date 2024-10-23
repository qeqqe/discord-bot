const API = "https://dog.ceo/api/breeds/image/random";
const { EmbedBuilder } = require("discord.js");

const DogImage = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "dog") {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const embed = new EmbedBuilder()
        .setTitle("Dog Image")
        .setImage(data.message)
        .setColor("Blue")
        .setFooter({
          text: `${interaction.user.username}`,
          iconURL: interaction.user.avatarURL(),
        });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching dog image:", error);
      await interaction.reply({
        content: "Sorry, I couldn't fetch a dog image at the moment.",
        ephemeral: true,
      });
    }
  }
};

module.exports = DogImage;
