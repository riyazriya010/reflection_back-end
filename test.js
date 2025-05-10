
// import OpenAI from 'openai';



/* -------------- */
// // Initialize OpenAI with OpenRouter key and baseURL
// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY!,
//   baseURL: 'https://openrouter.ai/api/v1',
// });

// // Function to check if feedback is constructive
// async function isConstructiveFeedback(feedback: string): Promise<boolean> {
//   const response = await openai.chat.completions.create({
//     model: 'openai/gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: `You are a strict feedback classifier. If feedback is helpful, polite, or constructive, return only "true". If it's rude, vague, unhelpful, or inappropriate, return only "false". Never explain anything.`,
//       },
//       {
//         role: 'user',
//         content: `Feedback: "${feedback}"`,
//       },
//     ],
//   });

//   const content = response.choices[0].message.content?.trim().toLowerCase();
//   return content === 'true';
// }

// // 🔬 Testing the function directly
// (async () => {
//   const feedback1 = await isConstructiveFeedback("The project was completed on time, and I appreciate the thoroughness of your work. The attention to detail was impressive and contributed to the overall success.");
//   const feedback2 = await isConstructiveFeedback("The project was a failure. It could have been better.");
//   console.log("feedback1:", feedback1); // true
//   console.log("feedback2:", feedback2);   // false
// })();




















// const openai = new OpenAI({
//     apiKey: process.env.OPENROUTER_API_KEY!,
//     baseURL: 'https://openrouter.ai/api/v1',
//   });
  
//   // Function to summarize multiple feedbacks with bullet points for strengths and weaknesses
//   async function summarizeFeedback(feedbackList: string[]): Promise<string> {
//     // Join all the feedback into a single string, separated by newlines
//     const feedbackText = feedbackList.join('\n');
  
//     // Call OpenAI to summarize the feedbacks
//     const response = await openai.chat.completions.create({
//       model: 'openai/gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a professional feedback summarizer. Summarize the following feedback in a clear, concise manner, separating the strengths and areas for improvement into bullet points. If the feedback is entirely positive, only include strengths. If it is mixed, include both strengths and weaknesses. If it is entirely negative, focus on areas of improvement.',
//         },
//         {
//           role: 'user',
//           content: `Feedbacks:\n${feedbackText}`,
//         },
//       ],
//     });
  
//     const summary = response.choices[0].message.content?.trim();
//     return summary || 'No feedback to summarize.';
//   }
  
//   // 🔬 Testing the function with multiple feedbacks
//   (async () => {
//     // Scenario 1: All Positive Feedback
//     const positiveFeedbacks = [
//       "The project was completed on time, and I appreciate the thoroughness of your work. The attention to detail was impressive and contributed to the overall success.",
//       "Great effort overall, the communication was effective and the results were high quality.",
//       "Fantastic teamwork, the project was well-executed and exceeded expectations."
//     ];
  
//     const summarizedPositiveFeedback = await summarizeFeedback(positiveFeedbacks);
//     console.log("Summarized Positive Feedback:", summarizedPositiveFeedback);
  
//     // Scenario 2: Mixed Feedback
//     const mixedFeedbacks = [
//       "The project was completed on time, and I appreciate the thoroughness of your work. The attention to detail was impressive and contributed to the overall success.",
//       "Great effort overall, but the deadlines were not met.",
//       "Fantastic teamwork and communication, loved working with you!"
//     ];
  
//     const summarizedMixedFeedback = await summarizeFeedback(mixedFeedbacks);
//     console.log("Summarized Mixed Feedback:", summarizedMixedFeedback);
  
//     // Scenario 3: All Negative Feedback
//     const negativeFeedbacks = [
//       "The project was a failure. It could have been better.",
//       "There were constant delays, and the final product did not meet expectations.",
//       "Communication was poor, and the deadlines were missed repeatedly."
//     ];
  
//     const summarizedNegativeFeedback = await summarizeFeedback(negativeFeedbacks);
//     console.log("Summarized Negative Feedback:", summarizedNegativeFeedback);
//   })();

  
// console.log('API Key used:', process.env.OPENROUTER_API_KEY);

