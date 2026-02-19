import { supabase } from "../config/supabaseClient.js";
import { logActivity } from "../utils/activityLogger.js";
import { model } from "../config/geminiClient.js";
import { cleanJsonResponse } from "../utils/jsonCleaner.js";


export const analyzeSubmission = async (req, res) => {
  try {
    const { submission_id } = req.body;

    if (!submission_id) {
      return res.status(400).json({ message: "submission_id is required" });
    }

    // fetch submission
    const { data: submission, error: submissionError } = await supabase
      .from("code_submissions")
      .select("*")
      .eq("id", submission_id)
      .eq("user_id", req.user.id)
      .single();

    if (submissionError || !submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
const { data: existingReview } = await supabase
  .from("review_results")
  .select("id")
  .eq("submission_id", submission_id)
  .maybeSingle();

const { data: existingOptimization } = await supabase
  .from("optimization_results")
  .select("id")
  .eq("submission_id", submission_id)
  .maybeSingle();

if (existingReview || existingOptimization) {
  return res.status(400).json({
    message: "AI analysis already generated for this submission"
  });
}

    const prompt = `
You are CodeRefine AI.

Analyze the following ${submission.language} code.

Tasks:
1. Detect bugs and bad practices
2. Suggest improvements
3. Give time and space complexity
4. Rewrite optimized version of code
5. Provide short explanation

Return output strictly in JSON format like:
{
  "issues_found": [],
  "suggestions": [],
  "complexity_analysis": { "time": "", "space": "" },
  "optimized_code": "",
  "improvements_summary": "",
  "confidence_score": 0.0
}
IMPORTANT:
Return ONLY JSON.
Do not add markdown.
Do not add explanation outside JSON.

Code:
${submission.code_input}
`;

    const result = await model.generateContent(prompt);
    const responseText = cleanJsonResponse(result.response.text());

    let aiOutput;

    try {
      aiOutput = JSON.parse(responseText);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON format",
        raw_output: responseText
      });
    }

    // Insert review results
    const { data: reviewData, error: reviewError } = await supabase
      .from("review_results")
      .insert([
        {
          submission_id,
          issues_found: aiOutput.issues_found,
          suggestions: aiOutput.suggestions,
          complexity_analysis: aiOutput.complexity_analysis,
          score: aiOutput.confidence_score
        }
      ])
      .select();

    if (reviewError) {
      return res.status(400).json({ message: reviewError.message });
    }

    // Insert optimization results
    const { data: optimizationData, error: optimizationError } = await supabase
      .from("optimization_results")
      .insert([
        {
          submission_id,
          optimized_code: aiOutput.optimized_code,
          improvements_summary: aiOutput.improvements_summary,
          performance_gain: aiOutput.complexity_analysis
        }
      ])
      .select();

    if (optimizationError) {
      return res.status(400).json({ message: optimizationError.message });
    }

    // Insert AI logs
    const { data: logData, error: logError } = await supabase
      .from("ai_review_logs")
      .insert([
        {
          submission_id,
          model_name: "gemini-1.5-flash",
          prompt_version: "v1",
          raw_output: aiOutput,
          confidence_score: aiOutput.confidence_score
        }
      ])
      .select();

    if (logError) {
      return res.status(400).json({ message: logError.message });
    }

    await logActivity(req.user.id, "ai_analyze_submission", {
      submission_id,
      language: submission.language
    });

    res.json({
      message: "AI analysis generated successfully",
      submission,
      review: reviewData[0],
      optimization: optimizationData[0],
      ai_log: logData[0]
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
