import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    console.log("Starting image generation test...");
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "a cute puppy playing in a garden",
      n: 1,
      size: "1024x1024",
    });
    console.log("Image generated successfully");
    console.log(response.data[0].url);  // note: without response_format, API returns URL
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

test();
