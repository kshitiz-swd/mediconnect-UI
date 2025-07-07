const OpenAI = require('openai')
const openai = new OpenAI({
  apiKey: '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',
  baseURL: "https://openrouter.ai/api/v1",
});

const handler = async(req, res)=> {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { symptoms } = req.body;

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant, Suggest 1–3 medical specializations based on the patient's symptoms",
        },
        {
          role: "user",
          content: `Symptoms : ${symptoms}`,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("failed to fetch the suggestions:", error);
    return res.status(500).json({ error: "Failed to fetch the suggestions" });
  }
}

export default handler