const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const axios = require("axios");

const Lewd = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "lewd") {
    if (interaction.user.id !== "975440571302805608") {
      return interaction.reply({
        content: "You are not authorized to use this command.",
        ephemeral: true,
      });
    }

    if (!interaction.channel.nsfw) {
      return interaction.reply({
        content: "Use this command in a NSFW channel!",
        ephemeral: true,
      });
    }

    await interaction.deferReply();

    try {
      const category = interaction.options.getString("category");

      if (!category) {
        return interaction.editReply("Please choose a category.");
      }

      await fetchAndSendImage(interaction, category);
    } catch (error) {
      console.error("Error in Lewd Command:", error);
      await interaction.editReply(
        "An error occurred while processing your command."
      );
    }
  }
};

const fetchAndSendImage = async (interaction, category) => {
  try {
    const response = await axios.get(
      `https://api.waifu.im/search/?included_tags=${category}&is_nsfw=true`
    );

    if (!response.data.images || response.data.images.length === 0) {
      return interaction.editReply("No image found for this category.");
    }

    const imageUrl = response.data.images[0].url;

    const embed = new EmbedBuilder()
      .setTitle(`${category.toUpperCase()} Image`)
      .setImage(imageUrl)
      .setColor("Random");

    const refreshButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`refresh_${category}`)
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.editReply({
      embeds: [embed],
      components: [refreshButton],
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    await interaction.editReply(
      "Error fetching image. Please try again later."
    );
  }
};

const handleRefresh = async (interaction) => {
  if (!interaction.isButton()) return;

  const [action, category] = interaction.customId.split("_");
  if (action !== "refresh") return;

  if (!interaction.channel.nsfw) {
    return interaction.reply({
      content: "This button can only be used in NSFW channels!",
      ephemeral: true,
    });
  }

  await interaction.deferReply();

  try {
    const response = await axios.get(
      `https://api.waifu.im/search/?included_tags=${category}&is_nsfw=true`
    );

    if (!response.data.images || response.data.images.length === 0) {
      return interaction.editReply("No image found for this category.");
    }

    const imageUrl = response.data.images[0].url;

    const embed = new EmbedBuilder()
      .setTitle(`${category.toUpperCase()} Image (Refreshed)`)
      .setImage(imageUrl)
      .setColor("Random");

    const refreshButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`refresh_${category}`)
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.editReply({
      embeds: [embed],
      components: [refreshButton],
    });
  } catch (error) {
    console.error("Error in handleRefresh:", error);
    await interaction.editReply(
      "An error occurred while refreshing the image."
    );
  }
};

module.exports = { Lewd, handleRefresh };
