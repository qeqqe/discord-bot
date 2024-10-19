const { EmbedBuilder } = require("discord.js");

const UserAvatar = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "avatar") {
    const user = interaction.options.getUser("user");
    const embed = new EmbedBuilder()
      .setTitle(`${user.username} pfp`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setColor("Random");
    await interaction.reply({ embeds: [embed] });
  }
};

const UserBanner = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "banner") {
    const member = interaction.options.getMember("user");
    const user = await member.user.fetch(true);

    if (user.banner) {
      const embed = new EmbedBuilder()
        .setTitle("User Banner")
        .setImage(user.bannerURL({ size: 4096 }));
      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply("This user doesn't have a banner.");
    }
  }
};

module.exports = { UserAvatar, UserBanner };
