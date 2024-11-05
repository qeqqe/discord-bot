const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const axios = require("axios");
const { logCommandUsage } = require("./logger");

const censoredTags = [
  "loli",
  "child",
  "children",
  "shotta",
  "shota",
  "incest",
  "rape",
  "bestiality",
  "underage",
];

const Lewd = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "lewd") {
    const tags = interaction.options.getString("tags") || "No tags provided";
    logCommandUsage(
      interaction.user,
      `${interaction.commandName} with tags: ${tags}`
    );

    // Check for censored tags
    const foundCensoredTag = censoredTags.some((tag) => tags.includes(tag));
    if (foundCensoredTag) {
      return interaction.reply({
        content: "Sending report to Discord.",
        ephemeral: true,
      });
    }

    if (
      interaction.user.id !== "975440571302805608" &&
      interaction.user.id !== "872782615793524756"
    ) {
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

    await interaction.deferReply({ ephemeral: true });

    try {
      if (!tags) {
        return interaction.editReply("Please provide search tags.");
      }

      await fetchAndSendImage(interaction, tags);
    } catch (error) {
      console.error("Error in Lewd Command:", error);
      await interaction.editReply(
        "An error occurred while processing your command."
      );
    }
  }
};

const fetchAndSendImage = async (interaction, tags) => {
  try {
    const response = await axios.get(
      `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${encodeURIComponent(
        tags
      )}`
    );

    if (
      !response.data ||
      (Array.isArray(response.data) && response.data.length === 0)
    ) {
      return interaction.editReply({
        content: `No images found for tags: ${tags}. Try different tags or check your spelling.`,
        ephemeral: true,
      });
    }

    let posts = Array.isArray(response.data) ? response.data : [response.data];

    if (posts.length === 0) {
      return interaction.editReply({
        content: `No images found for tags: ${tags}. Try different tags or check your spelling.`,
        ephemeral: true,
      });
    }

    const randomIndex = Math.floor(Math.random() * posts.length);
    const imageUrl = posts[randomIndex].file_url;

    const embed = new EmbedBuilder()
      .setTitle(`Image for tags: ${tags}`)
      .setImage(imageUrl)
      .setColor("Random");

    const refreshButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`refresh_lewd_${tags}`)
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.editReply({
      embeds: [embed],
      components: [refreshButton],
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    await interaction.editReply({
      content: `Error fetching image for tags: ${tags}. Please try again later.`,
      ephemeral: true,
    });
  }
};

const handleRefresh = async (interaction) => {
  if (!interaction.isButton()) return;

  const [, command, ...tagsParts] = interaction.customId.split("_");
  if (command !== "lewd") return;

  const tags = tagsParts.join("_");

  if (!interaction.channel.nsfw) {
    return interaction.reply({
      content: "This button can only be used in NSFW channels!",
      ephemeral: true,
    });
  }

  await interaction.deferUpdate();

  try {
    const response = await axios.get(
      `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${encodeURIComponent(
        tags
      )}`
    );

    if (
      !response.data ||
      (Array.isArray(response.data) && response.data.length === 0)
    ) {
      return interaction.editReply({
        content: `No images found for tags: ${tags}. Try different tags or check your spelling.`,
        ephemeral: true,
      });
    }

    let posts = Array.isArray(response.data) ? response.data : [response.data];

    if (posts.length === 0) {
      return interaction.editReply({
        content: `No images found for tags: ${tags}. Try different tags or check your spelling.`,
        ephemeral: true,
      });
    }

    const randomIndex = Math.floor(Math.random() * posts.length);
    const imageUrl = posts[randomIndex].file_url;

    const embed = new EmbedBuilder()
      .setTitle(`Image for tags: ${tags} (Refreshed)`)
      .setImage(imageUrl)
      .setColor("Random");

    const refreshButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`refresh_lewd_${tags}`)
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.editReply({
      embeds: [embed],
      components: [refreshButton],
    });
  } catch (error) {
    console.error("Error in handleRefresh:", error);
    await interaction.editReply({
      content: `An error occurred while refreshing the image for tags: ${tags}. Please try again later.`,
      ephemeral: true,
    });
  }
};

module.exports = { Lewd, handleRefresh };
