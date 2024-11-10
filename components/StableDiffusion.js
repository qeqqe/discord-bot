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
      description: "The sampling method to use (default: DPM++ 2M Karras)",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "DPM++ 2M Karras", value: "DPM++ 2M Karras" },
        { name: "DPM++ 3M SDE Karras", value: "DPM++ 3M SDE Karras" },
      ],
    },
    {
      name: "width",
      description:
        "Width of the generated image (default: 1024, min: 64, max: 1024)",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      minValue: 64,
      maxValue: 1024,
    },
    {
      name: "height",
      description:
        "Height of the generated image (default: 1024, min: 64, max: 1024)",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      minValue: 64,
      maxValue: 1024,
    },
    {
      name: "guidance_scale",
      description: "Guidance scale (default: 8, min: 1, max: 20)",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 20,
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
      interaction.options.getString("sampling_method") || "DPM++ 2M Karras";
    const width = interaction.options.getInteger("width") || 512;
    const height = interaction.options.getInteger("height") || 512;
    const guidance_scale =
      interaction.options.getInteger("guidance_scale") || 8;

    const payload = {
      prompt: prompt,
      negative_prompt: negative_prompt,
      steps: steps,
      seed: seed,
      batch_size: 1,
      n_iter: 1,
      cfg_scale: guidance_scale,
      width: width,
      height: height,
      sampler_name: sampling_method,
      eta: 0,
    };

    const response = await axios.post(
      "http://127.0.0.1:7860/sdapi/v1/txt2img",
      payload
    );

    if (!response.data || !response.data.images || !response.data.images[0]) {
      throw new Error("No image data received from Stable Diffusion");
    }

    const actualSamplingMethod = response.data.info.sampling_method;

    const imageBuffer = Buffer.from(response.data.images[0], "base64");

    const attachment = new AttachmentBuilder(imageBuffer, {
      name: "generated-image.png",
    });

    await interaction.editReply({
      content: `Generated image for prompt: "${prompt}" using "${actualSamplingMethod}" sampling method.`,
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
