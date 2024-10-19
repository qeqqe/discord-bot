const roles = {
  red: "1297046057728868414",
  blue: "1297046116529078352",
  green: "1297046151232622652",
  yellow: "1297046201006559292",
  black: "1297046236599418922",
  purple: "1297046389389529199",
};

const AssignUserRole = (msg) => {
  for (const role in roles) {
    if (msg.content.includes(`!role-${role}`)) {
      msg.member.roles.add(roles[role]);
      msg.channel.send(`${role} role added`);
    }
  }
};

const RemoveUserRole = (msg) => {
  for (const role in roles) {
    if (msg.content.includes(`!remove-${role}`)) {
      msg.member.roles.remove(roles[role]);
      msg.channel.send(`${role} role removed`);
    }
  }
};

module.exports = {
  AssignUserRole,
  RemoveUserRole,
};
