import dotenv from "dotenv";
import { createError } from "../error.js";
import Synexa from "synexa";

dotenv.config();

const synexa = new Synexa.default({
  auth: A8IRBww2N79MlOPFdN9nOrlnkPb2icOkoBHb26hF,
});

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    console.log("🔐 API Key Loaded:", process.env.SYNEXA_API_KEY ? "✅ Loaded" : "❌ Missing");
    console.log("📝 Received Prompt:", prompt);

    if (!prompt || prompt.trim() === "") {
      return next(createError(400, "Prompt is required and cannot be empty"));
    }

    const [output] = await synexa.run("black-forest-labs/flux-schnell", {
      input: { prompt }
    });

    console.log("📦 Synexa Output Raw:", output);

    const imageUrl = output?.url_ || output?.url?.();

    if (!imageUrl) {
      return next(createError(500, "Image URL not found in Synexa output"));
    }

    res.status(200).json({ photoUrl: imageUrl });
  } catch (error) {
    console.error("❌ Synexa API Error:", error);
    next(createError(500, error.message || "Unexpected Synexa API error"));
  }
};
