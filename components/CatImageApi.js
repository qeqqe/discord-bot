const API = "https://api.thecatapi.com/v1/images/search";
const { EmbedBuilder } = require("discord.js");
const CatImage = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "cat") {
    const response = await fetch(API);
    const data = await response.json();
    await interaction.reply(data[0].url);
    const embed = new EmbedBuilder()
      .setTitle("Cat Image")
      .setImage(data[0].url)
      .setColor("Blue")
      .setFooter({
        text: `${interaction.user.username}`,
        iconURL: interaction.user.avatarURL(),
      });
    await interaction.reply({ embeds: [embed] });
  }
};

module.exports = CatImage;
