const {
  PermissionFlagsBits,
  SlashCommandBuilder,
  AttachmentBuilder,
} = require("discord.js");
const sharp = require("sharp");

const Resize = {
  data: new SlashCommandBuilder()
    .setName("resize")
    .setDescription("Resize an image")
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("The image to resize")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("width")
        .setDescription("New width in pixels")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("height")
        .setDescription("New height in pixels")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const attachment = interaction.options.getAttachment("image");
    const width = interaction.options.getInteger("width");
    const height = interaction.options.getInteger("height");

    if (!attachment.contentType?.startsWith("image/")) {
      return interaction.editReply("Please provide a valid image file!");
    }

    try {
      const response = await fetch(attachment.url);
      const imageBuffer = await response.arrayBuffer();

      const resizedImage = await sharp(Buffer.from(imageBuffer))
        .resize(width, height, {
          fit: "fill",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .toBuffer();

      const newAttachment = new AttachmentBuilder(resizedImage, {
        name: `resized-${attachment.name}`,
      });

      await interaction.editReply({
        content: `Image resized to ${width}x${height}`,
        files: [newAttachment],
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply("There was an error processing your image!");
    }
  },
};

module.exports = Resize;
