const {
  PermissionsBitField,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

const roleSets = {
  colors: {
    Blue: "1297046116529078352",
    Red: "1297046057728868414",
    Green: "1297046151232622652",
    Yellow: "1297046201006559292",
    Black: "1297046236599418922",
  },
  rgb: {
    Red: "1297046057728868414",
    Green: "1297046151232622652",
    Blue: "1297046116529078352",
  },
  // Add more role sets as needed
};

const ReactionRoles = async (interaction, client) => {
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === "reaction-roles"
  ) {
    const roleSet = interaction.options.getString("set");

    if (!roleSets[roleSet]) {
      return interaction.reply({
        content: "Invalid role set. Please choose a valid option.",
        ephemeral: true,
      });
    }

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

    const roleMap = roleSets[roleSet];

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(`select-roles-${roleSet}`)
      .setPlaceholder("Select your roles")
      .setMinValues(0)
      .setMaxValues(Object.keys(roleMap).length)
      .addOptions(
        Object.keys(roleMap).map((roleName) => ({
          label: roleName,
          value: roleMap[roleName],
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: `Select your ${roleSet} roles:`,
      components: [row],
      ephemeral: true,
    });
  } else if (
    interaction.isStringSelectMenu() &&
    interaction.customId.startsWith("select-roles-")
  ) {
    const roleSet = interaction.customId.split("-")[2];
    const roleMap = roleSets[roleSet];
    const selectedRoles = interaction.values;
    const member = interaction.member;
    const addedRoles = [];
    const removedRoles = [];

    for (const [roleName, roleId] of Object.entries(roleMap)) {
      const role = interaction.guild.roles.cache.get(roleId);
      if (role) {
        if (selectedRoles.includes(roleId)) {
          if (!member.roles.cache.has(roleId)) {
            await member.roles.add(role);
            addedRoles.push(roleName);
          }
        } else {
          if (member.roles.cache.has(roleId)) {
            await member.roles.remove(role);
            removedRoles.push(roleName);
          }
        }
      }
    }

    let responseMessage = "";
    if (addedRoles.length > 0) {
      responseMessage += `Added roles: ${addedRoles.join(", ")}\n`;
    }
    if (removedRoles.length > 0) {
      responseMessage += `Removed roles: ${removedRoles.join(", ")}`;
    }
    if (responseMessage === "") {
      responseMessage = "No changes were made to your roles.";
    }

    await interaction.update({
      content: responseMessage,
      components: [],
      ephemeral: true,
    });
  }
};

module.exports = ReactionRoles;
