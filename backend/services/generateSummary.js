import { openai } from "../openaiClient.js";
import { mockGenerateProfile } from "../profileGenerator.js";

export async function generateSummary(name, email, keywords, wikipediaSummary) {
  let candidateProfileSummary = "";
  try {
    const gptPrompt = `Generate a short candidate profile summary based on the following information:\n\nName: ${name}\nEmail: ${email}\nKeywords: ${keywords}\nBio: ${wikipediaSummary}`;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional profile generator.",
        },
        { role: "user", content: gptPrompt },
      ],
    });

    candidateProfileSummary = gptResponse.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error processing candidate with OpenAI");
    try {
      console.log("Falling back to mock profile generator.");
      candidateProfileSummary = await mockGenerateProfile(
        name,
        email,
        keywords,
        wikipediaSummary
      );
    } catch (mockError) {
      console.error("Error in mock profile generation:", mockError);
      return res.status(500).send({ error: "Internal server error" });
    }
  }

  return candidateProfileSummary;
}
