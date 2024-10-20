const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const Reminder = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "reminder") {
    const duration = interaction.options.getInteger("duration");
    const timeUnit = interaction.options.getString("time-unit");

    if (!duration || !timeUnit) {
      return await interaction.reply({
        content: "Please provide both duration and time unit.",
        ephemeral: true,
      });
    }

    let milliseconds;
    switch (timeUnit) {
      case "days":
        milliseconds = duration * 24 * 60 * 60 * 1000;
        break;
      case "hours":
        milliseconds = duration * 60 * 60 * 1000;
        break;
      case "minutes":
        milliseconds = duration * 60 * 1000;
        break;
      case "seconds":
        milliseconds = duration * 1000;
        break;
      default:
        return await interaction.reply({
          content: "Invalid time unit provided.",
          ephemeral: true,
        });
    }

    await interaction.reply({
      content: `Reminder set for ${duration} ${timeUnit} from now.`,
    });

    setTimeout(async () => {
      const reminderEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Reminder")
        .setDescription(`Your reminder is due!`)
        .setTimestamp();

      try {
        await interaction.user.send({ embeds: [reminderEmbed] });
      } catch (error) {
        console.error("Failed to send DM:", error);
      }

      try {
        await interaction.followUp({
          content: `<@${interaction.user.id}>, your reminder is due!`,
        });
      } catch (error) {
        console.error("Failed to send follow-up message:", error);
        try {
          await interaction.channel.send({
            content: `<@${interaction.user.id}>, your reminder is due!`,
            embeds: [reminderEmbed],
          });
        } catch (channelError) {
          console.error("Failed to send message in channel:", channelError);
        }
      }
    }, milliseconds);
  }
};

module.exports = { Reminder };
