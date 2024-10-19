const messages = {
  hello: "hillo",
  hawk: "tuah",
  skibdi: "Shut the hell up",
  shiv: "oh do you mean the bald head lord <@579034358028042264>",
};

const CustomMessageReplies = (msg) => {
  const lowerCaseContent = msg.content.toLowerCase();
  for (const message in messages) {
    if (
      lowerCaseContent.includes(message.toLowerCase()) &&
      msg.author.id !== "1296908645740711986"
    ) {
      msg.reply(`${messages[message]}`);
    }
  }
};

module.exports = CustomMessageReplies;
