const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

const Media = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "media") {
    await interaction.deferReply();

    try {
      const type = interaction.options.getString("type");
      const search = interaction.options.getString("search");

      if (!type) {
        return interaction.editReply("Choose a type (sfw or nsfw).");
      }

      let imageUrl;
      if (type.toLowerCase() === "sfw") {
        const response = await axios.get(
          `https://api.waifu.pics/sfw/${search ? search : "hug"}`
        );
        imageUrl = response.data.url;
      } else if (type.toLowerCase() === "nsfw") {
        if (!interaction.channel.nsfw) {
          return interaction.editReply(
            "Use this command in a NSFW channel mf!"
          );
        }
        const response = await axios.get(
          `https://api.waifu.pics/nsfw/${search ? search : "waifu"}`
        );
        imageUrl = response.data.url;
      } else {
        return interaction.editReply(
          "Invalid type. Please use 'sfw' or 'nsfw'."
        );
      }

      const embed = new EmbedBuilder()
        .setTitle(`${search.toUpperCase()} Image`)
        .setImage(imageUrl)
        .setColor("Random");

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in LewdCommand:", error);
      await interaction.editReply("Error while fetching the image.");
    }
  }
};

module.exports = Media;
