const BotPing = (msg) => {
  const user = msg.author;
  if (msg.content.includes("<@1296908645740711986>")) {
    msg.channel.send(`Dont fucking ping me ${user}`);
  }
};

module.exports = BotPing;
