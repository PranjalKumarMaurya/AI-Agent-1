import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import dotenv from 'dotenv';

import weatherTool from "./Tools/weatherTool.js";
import customPrompt from "./custom_prompt.js";

dotenv.config();


const checkPointSaver = new MemorySaver();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",  // or another available Gemini model ID
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createReactAgent({
  llm: model,
  tools: [weatherTool],
  prompt: customPrompt, // Pass the updated prompt template
  checkPointSaver,
});

const result = await agent.invoke({
  messages: [
    {
      role: 'user',
      content: 'What is the weather in Delhi?',
    },
  ]
},
{
    configurable: { thread_id: 42 },
});

const followUp = await agent.invoke({
  messages: [
    {
      role: 'user',
      content: 'What city was that for?',
    },
  ]
},
{
    configurable: { thread_id: 42 },
});

console.log(result.messages.at(-1)?.content);
console.log(followUp.messages.at(-1)?.content);
