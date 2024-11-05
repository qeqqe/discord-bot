const axios = require("axios");
const { AttachmentBuilder } = require("discord.js");
const { ApplicationCommandOptionType } = require("discord.js");

const stableDiffusionCommand = {
  name: "generate",
  description: "Generate an image using Stable Diffusion",
  options: [
    {
      name: "prompt",
      description: "The prompt to generate the image from",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "negative_prompt",
      description: "Things to avoid in the image (optional)",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "steps",
      description: "Number of sampling steps (default: 20, min: 1, max: 32)",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 32,
    },
    {
      name: "seed",
      description: "Seed for reproducible results (optional)",
      required: false,
      type: ApplicationCommandOptionType.Integer,
    },
    {
      name: "sampling_method",
      description: "The sampling method to use (default: DPM++ 2M)",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "DPM++ 2M", value: "dpm_pp" },
        // add more
      ],
    },
  ],
};

async function StableDiffusion(interaction) {
  if (!interaction.isCommand() || interaction.commandName !== "generate")
    return;

  await interaction.deferReply();

  try {
    const prompt = interaction.options.getString("prompt");
    const negative_prompt =
      interaction.options.getString("negative_prompt") || "";
    const steps = interaction.options.getInteger("steps") || 20;
    const seed = interaction.options.getInteger("seed") || -1;
    const sampling_method =
      interaction.options.getString("sampling_method") || "dpm_pp";

    const payload = {
      prompt: prompt,
      negative_prompt: negative_prompt,
      steps: steps,
      seed: seed,
      batch_size: 1,
      n_iter: 1,
      cfg_scale: 7,
      width: 1024,
      height: 1024,
      sampler_name: sampling_method,
      eta: 0,
    };

    // send req
    const response = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      payload
    );

    if (!response.data || !response.data.images || !response.data.images[0]) {
      throw new Error("No image data received from Stable Diffusion");
    }

    // base64 to buffer
    const imageBuffer = Buffer.from(response.data.images[0], "base64");

    // dc attachment
    const attachment = new AttachmentBuilder(imageBuffer, {
      name: "generated-image.png",
    });

    // send res
    await interaction.editReply({
      content: `Generated image for prompt: "${prompt}"`,
      files: [attachment],
    });
  } catch (error) {
    console.error("Error generating image:", error);

    const errorMessage =
      error.response?.status === 404
        ? "Cannot connect to Stable Diffusion WebUI. Make sure it's running with --api flag."
        : "An error occurred while generating the image.";

    await interaction.editReply({
      content: errorMessage,
      ephemeral: true,
    });
  }
}

module.exports = { StableDiffusion, stableDiffusionCommand };
