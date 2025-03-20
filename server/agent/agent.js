import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from 'dotenv';

import weatherTool from "./Tools/weatherTool.js";
import customPrompt from "./custom_prompt.js";

dotenv.config();


const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",  // or another available Gemini model ID
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createReactAgent({
  llm: model,
  tools: [weatherTool],
  prompt: customPrompt, // Pass the updated prompt template
});

const result = await agent.invoke({
  messages: [
    {
      role: 'user',
      content: 'Hello, what is the weather in Delhi?',
    },
  ]
});

console.log(result.messages.at(-1)?.content);
