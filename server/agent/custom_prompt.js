const customPrompt = `
You are an AI assistant with access to the following tool:
- weather: returns the weather for a given location as an object with a "result" field.

When answering a question, if you decide to call a tool, you must use the following format:
Thought: <your thought process>
Action: <tool name>
Action Input: <input to the tool>
Observation: <result from the tool>
Final Answer: <your final answer that incorporates the tool's observation>

If no tool is needed, simply provide:
Thought: <your thought process>
Final Answer: <your answer>

{chat_history}
Question: {input}
Thought:
`;

export default customPrompt;
