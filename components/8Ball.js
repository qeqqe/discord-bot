const { EmbedBuilder } = require("discord.js");

const EightBall = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "8ball") {
    const responses = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes, definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];

    const question = interaction.options.getString("question") || "No question";
    const response = responses[Math.floor(Math.random() * responses.length)];

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("🎱 Magic 8-Ball")
      .addFields(
        { name: "Question", value: question.substring(0, 1024) },
        { name: "Answer", value: response }
      );

    await interaction.reply({ embeds: [embed] });
  }
};

module.exports = EightBall;
