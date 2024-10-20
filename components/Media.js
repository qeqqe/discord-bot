const { EmbedBuilder } = require("discord.js");
const axios = require("axios");

const Media = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "media") {
    await interaction.deferReply();

    try {
      const category = interaction.options.getString("category");
      const user = interaction.options.getUser("user");
      const response = await axios.get(
        `https://api.waifu.pics/sfw/${category || "waifu"}`
      );
      const imageUrl = response.data.url;

      const embed = new EmbedBuilder()
        .setTitle(
          `${
            category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "Waifu"
          } Image`
        )
        .setImage(imageUrl)
        .setColor("Random");

      if (user) {
        embed.setDescription(`${user}, check this out!`);
      }

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in MediaCommand:", error);
      await interaction.editReply(
        "Error while fetching the image. Please try again later."
      );
    }
  }
};

module.exports = Media;

// old
// const { EmbedBuilder } = require("discord.js");
// const axios = require("axios");

// const Media = async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "media") {
//     await interaction.deferReply();

//     try {
//       const type = interaction.options.getString("type");
//       const category = interaction.options.getString("category");

//       if (!type) {
//         return interaction.editReply("Choose a type (sfw or nsfw).");
//       }

//       let imageUrl;
//       if (type.toLowerCase() === "sfw") {
//         const response = await axios.get(
//           `https://api.waifu.pics/sfw/${category ? category : "hug"}`
//         );
//         imageUrl = response.data.url;
//       } else if (type.toLowerCase() === "nsfw") {
//         if (!interaction.channel.nsfw) {
//           return interaction.editReply(
//             "Use this command in a NSFW channel mf!"
//           );
//         }
//         const response = await axios.get(
//           `https://api.waifu.pics/nsfw/${category ? category : "waifu"}`
//         );
//         imageUrl = response.data.url;
//       } else {
//         return interaction.editReply(
//           "Invalid type. Please use 'sfw' or 'nsfw'."
//         );
//       }

//       const embed = new EmbedBuilder()
//         .setTitle(
//           `${category ? category.toUpperCase() : type.toUpperCase()} Image`
//         )
//         .setImage(imageUrl)
//         .setColor("Random");

//       await interaction.editReply({ embeds: [embed] });
//     } catch (error) {
//       console.error("Error in LewdCommand:", error);
//       await interaction.editReply("Error while fetching the image.");
//     }
//   }
// };

// module.exports = Media;
