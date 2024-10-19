const Users = {
  "975440571302805608": "💘",
  "786843884134596640": "😘",
  "579034358028042264": "👨‍🦲",
};

const UserPing = (msg) => {
  for (const userId in Users) {
    if (
      msg.content.includes(`<@${userId}>`) &&
      msg.author.id !== "1296908645740711986"
    ) {
      msg.react(Users[userId]);
    }
  }
};

module.exports = UserPing;
