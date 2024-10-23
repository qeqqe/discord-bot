const { EmbedBuilder, PermissionsBitField } = require("discord.js");

const ReactionRoles = async (interaction, client) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "reaction-roles") {
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return interaction.reply({
        content: "I don't have permission to manage roles!",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Color Reaction Roles")
      .setDescription(
        "React to get color roles!\n🔵 - Blue\n🔴 - Red\n🟢 - Green\n🟡 - Yellow\n⚫ - Black"
      );

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    const reactions = ["🔵", "🔴", "🟢", "🟡", "⚫"];
    for (const reaction of reactions) {
      await message.react(reaction);
    }

    const roleMap = {
      "🔵": "1297046116529078352",
      "🔴": "1297046057728868414",
      "🟢": "1297046151232622652",
      "🟡": "1297046201006559292",
      "⚫": "1297046236599418922",
    };

    const filter = (reaction, user) =>
      reactions.includes(reaction.emoji.name) && !user.bot;

    const collector = message.createReactionCollector({
      filter,
      dispose: true,
    });

    collector.on("collect", async (reaction, user) => {
      const member = await interaction.guild.members.fetch(user.id);
      const roleId = roleMap[reaction.emoji.name];
      const role = interaction.guild.roles.cache.get(roleId);

      if (role) {
        try {
          await member.roles.add(role);
          await user.send(`You have been given the ${role.name} role!`);
        } catch (error) {
          console.error(`Failed to add role to user: ${error}`);
          await user.send(
            `Failed to add the ${role.name} role. Please contact an administrator.`
          );
        }
      } else {
        await user.send(
          `The role doesn't exist. Please contact an administrator.`
        );
      }
    });

    collector.on("remove", async (reaction, user) => {
      const member = await interaction.guild.members.fetch(user.id);
      const roleId = roleMap[reaction.emoji.name];
      const role = interaction.guild.roles.cache.get(roleId);

      if (role) {
        try {
          await member.roles.remove(role);
          await user.send(`The ${role.name} role has been removed from you.`);
        } catch (error) {
          console.error(`Failed to remove role from user: ${error}`);
          await user.send(
            `Failed to remove the ${role.name} role. Please contact an administrator.`
          );
        }
      }
    });
  }
};

module.exports = ReactionRoles;
