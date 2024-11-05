const { logCommandUsage } = require("./logger");

const Ping = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    logCommandUsage(interaction.user, interaction.commandName);
    await interaction.reply("Pong!");
  }
};

const Echo = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "echo") {
    logCommandUsage(interaction.user, interaction.commandName);
    await interaction.reply(interaction.options.getString("message"));
  }
};

module.exports = { Ping, Echo };
