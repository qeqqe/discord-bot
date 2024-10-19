const { PermissionsBitField } = require("discord.js");

const Kick = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (
    interaction.commandName === "kick" &&
    interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    const member = interaction.options.getMember("member");
    await member.kick();
    await interaction.reply(`${member} has been kicked`);
  }
};
const Ban = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (
    interaction.commandName === "ban" &&
    interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    const member = interaction.options.getMember("member");
    await member.ban();
    await interaction.reply(`${member} has been banned`);
  }
};

const Unban = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (
    interaction.commandName === "unban" &&
    interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    const member = interaction.options.getMember("member");
    await member.unban();
    await interaction.reply(`${member} has been unbanned`);
  }
};

const Timeout = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (
    interaction.commandName === "timeout" &&
    interaction.member.permissions.has(
      PermissionsBitField.Flags.Administrator ||
        PermissionsBitField.Flags.ManageRoles
    )
  ) {
    const member = interaction.options.getMember("member");
    const reason = interaction.options.getString("reason");
    await member.timeout(1000 * 60 * 60, reason);
    await interaction.reply(
      `<@${member.user.id}> has been timed out. Reason: ${reason}`
    );
  }
};

const UnTimeout = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (
    interaction.commandName === "untimeout" &&
    interaction.member.permissions.has(
      PermissionsBitField.Flags.Administrator ||
        PermissionsBitField.Flags.ManageRoles
    )
  ) {
    const member = interaction.options.getMember("member");
    try {
      await member.timeout(null);
      await interaction.reply(`<@${member.user.id}> has been un-timed out.`);
    } catch (error) {
      console.error("Error removing timeout:", error);
      await interaction.reply({
        content: "Failed to remove timeout.",
        ephemeral: true,
      });
    }
  }
};
module.exports = { Kick, Ban, Unban, Timeout, UnTimeout };
