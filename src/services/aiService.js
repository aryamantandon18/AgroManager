// src/services/aiService.js
const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/";
const MODEL_NAME = "facebook/blenderbot-400M-distill";

export const getAIResponse = async (prompt) => {
  try {
    const response = await fetch(`${HUGGING_FACE_API_URL}${MODEL_NAME}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error("AI response failed");
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
