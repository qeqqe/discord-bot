const Ping = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
};

const Echo = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "echo") {
    await interaction.reply(interaction.options.getString("message"));
  }
};

module.exports = { Ping, Echo };
