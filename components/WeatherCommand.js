const { EmbedBuilder } = require("discord.js");
const configDotenv = require("dotenv");
configDotenv.config();
const API_KEY = process.env.WEATHER_API_KEY;

const Weather = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "weather") {
    const city = interaction.options.getString("city");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    const embed = new EmbedBuilder()
      .setTitle(`Weather in ${city}`)
      .setDescription(
        `The weather in ${city} is ${data.weather[0].description}`
      )
      .setColor("Blue")
      .addFields(
        { name: "Temperature", value: `${data.main.temp}°F`, inline: true },
        { name: "Humidity", value: `${data.main.humidity}%`, inline: true },
        { name: "Wind Speed", value: `${data.wind.speed} m/s`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  }
};

module.exports = {
  Weather,
};
