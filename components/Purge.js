const { PermissionFlagsBits } = require("discord.js");

const Purge = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "purge") return;

  if (interaction.user.id !== "975440571302805608") {
    return await interaction.reply({
      content: "You don't have permission to use this command.",
      ephemeral: true,
    });
  }

  try {
    const amount = interaction.options.getInteger("amount");

    await interaction.deferReply({ ephemeral: true });

    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    await interaction.channel.bulkDelete(messages, true).catch((error) => {
      if (error.code === 50034) {
        throw new Error("Can't delete messages older than 14 days");
      }
      throw error;
    });

    await interaction.editReply({
      content: `Successfully deleted ${messages.size} messages.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error("Error executing purge command:", error);

    const errorMessage =
      error.message === "Can't delete messages older than 14 days"
        ? "Unable to delete messages older than 14 days."
        : "There was an error trying to delete messages.";

    if (interaction.deferred) {
      await interaction.editReply({
        content: errorMessage,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
    }
  }
};

module.exports = { Purge };
