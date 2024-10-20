const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const axios = require("axios");

const Sussy = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "sussy") {
    if (interaction.user.id !== "975440571302805608") {
      return interaction.reply({
        content: "You are not authorized to use this command.",
        ephemeral: true,
      });
    }

    if (!interaction.channel.nsfw) {
      return interaction.reply({
        content: "This command can only be used in NSFW channels!",
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      const category = interaction.options.getString("category") || "waifu";
      const validCategories = ["waifu", "neko", "trap", "blowjob"];

      if (!validCategories.includes(category)) {
        return interaction.editReply({
          content: `Invalid category. Please choose from: ${validCategories.join(
            ", "
          )}`,
          ephemeral: true,
        });
      }

      await fetchAndSendImage(interaction, category);
    } catch (error) {
      console.error("Error in Sussy Command:", error);
      await interaction.editReply(
        "An error occurred while processing your command."
      );
    }
  }
};

const fetchAndSendImage = async (interaction, category) => {
  try {
    const response = await axios.get(`https://api.waifu.pics/nsfw/${category}`);

    if (response.status !== 200 || !response.data || !response.data.url) {
      throw new Error("Invalid response from API");
    }

    const imageUrl = response.data.url;

    const embed = new EmbedBuilder()
      .setTitle(
        `NSFW ${category.charAt(0).toUpperCase() + category.slice(1)} Image`
      )
      .setImage(imageUrl)
      .setColor("Random");

    const refreshButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`refresh_sussy_${category}`)
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.editReply({
      embeds: [embed],
      components: [refreshButton],
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    await interaction.editReply({
      content:
        "Error fetching image. Please try again later or choose a different category.",
      ephemeral: true,
    });
  }
};

const handleRefresh = async (interaction) => {
  if (!interaction.isButton()) return;

  const [action, command, category] = interaction.customId.split("_");
  if (action !== "refresh" || command !== "sussy") return;

  if (interaction.user.id !== "975440571302805608") {
    return interaction.reply({
      content: "You are not authorized to use this button.",
      ephemeral: true,
    });
  }

  if (!interaction.channel.nsfw) {
    return interaction.reply({
      content: "This button can only be used in NSFW channels!",
      ephemeral: true,
    });
  }

  await interaction.deferUpdate();

  try {
    await fetchAndSendImage(interaction, category);
  } catch (error) {
    console.error("Error in handleRefresh:", error);
    await interaction.editReply({
      content: "An error occurred while refreshing the image.",
      ephemeral: true,
    });
  }
};

module.exports = { Sussy, handleRefresh };
