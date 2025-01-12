const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "create financial education story on women on description for any age group,Educational story,and all images in Paper cut style:story of financial education for women,give me 5 chapters.With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"storyTitle\": \"The Blooming Budget: A Journey to Financial Freedom\",\n  \"cover\": {\n    \"imagePrompt\": \"Paper cut style illustration of a vibrant garden with diverse flowers representing different women. In the center, a woman with a watering can smiles, nurturing a money tree. The title 'The Blooming Budget: A Journey to Financial Freedom' is playfully integrated into the garden scene, with whimsical typography. The overall mood is cheerful and hopeful.\",\n    \"chapter\": \"Cover\",\n    \"text\": \"Cover illustration for the story 'The Blooming Budget: A Journey to Financial Freedom'. A vibrant, paper cut style garden with diverse flowers representing women is depicted. A central figure nurtures a money tree symbolizing financial growth. The title is playfully integrated into the garden scene with a cheerful and hopeful mood.\"\n  },\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"The Seed of Awareness\",\n      \"imagePrompt\": \"Paper cut style illustration of a young woman standing in front of a large, stylized piggy bank that's made of paper. Thought bubbles above her head show question marks and simple illustrations of coins. The background features a light pastel color and dotted patterns to give a playful yet thoughtful ambiance.\",\n      \"text\": \"Meet Anya, a student discovering the importance of money. She sees a large, paper-cut style piggy bank and wonders about saving and spending. The thought bubbles with question marks and coins illustrate her curiosity about finances.\"\n     },\n    {\n      \"chapterNumber\": 2,\n      \"chapterTitle\": \"Planting the Budget\",\n      \"imagePrompt\": \"Paper cut style illustration depicting three women of different ages sitting around a table, each with a paper-cut notebook in front of them. They are drawing simple charts and symbols representing income and expenses. One woman points at a chart, while the others are actively engaged. The background is a cozy, stylized living room with paper-cut furniture and potted plants.\",\n       \"text\": \"Anya joins a group of women learning how to create a budget. They sit around a table with paper-cut notebooks, drawing charts that represent income and expenses. The scene shows collaboration and a supportive environment for learning about budgeting.\"\n     },\n    {\n      \"chapterNumber\": 3,\n     \"chapterTitle\": \"Watering the Savings\",\n       \"imagePrompt\": \"Paper cut style illustration of a woman using a small, paper-cut watering can to water a money tree in a pot. On one branch of the tree are simple paper cut savings jars, and on the other, there are stylized versions of coins and notes. The background is a sunny garden scene with paper-cut flowers and a fence, representing growth and progress.\",\n       \"text\": \"The women learn about savings and how to make their money grow. The scene shows a woman watering a money tree with paper-cut savings jars and coins, illustrating how consistent effort leads to growth.\"\n     },\n    {\n      \"chapterNumber\": 4,\n      \"chapterTitle\": \"Protecting the Harvest\",\n      \"imagePrompt\": \"Paper cut style illustration of a group of women holding paper-cut shields and umbrellas, symbolizing protection against financial risks. Storm clouds with paper cut lightning bolts are seen behind them, but the women stand strong with their protective tools. The style is slightly dramatic to convey the importance of being prepared.\",\n        \"text\": \"The group discusses financial security and preparing for unexpected events. The scene depicts women holding paper-cut shields and umbrellas, protecting themselves from financial risks symbolized by storm clouds. This emphasizes the importance of preparedness.\"\n    },\n    {\n      \"chapterNumber\": 5,\n     \"chapterTitle\": \"The Blooming Future\",\n        \"imagePrompt\": \"Paper cut style illustration of all the women, now with smiles and confidence, standing in a lush paper-cut garden full of flowers and flourishing money trees. Some are holding paper cut diplomas and papers with the financial signs. The sun is shining brightly in a blue sky above, showcasing a sense of accomplishment and hope.\",\n         \"text\":\"Finally, the women are shown empowered, standing in a thriving garden of their financial dreams. They hold papers and diplomas, representing success, confidence, and a future built on solid financial understanding. The scene radiates positivity and accomplishment.\"\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });
