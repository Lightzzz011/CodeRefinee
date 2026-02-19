import { supabase } from "../config/supabaseClient.js";
import { logActivity } from "../utils/activityLogger.js";

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

    // ----------------------------
    // LLM INTEGRATION PLACEHOLDER
    // ----------------------------

    const dummyReview = {
      issues_found: [
        { type: "warning", message: "Use meaningful variable names." },
        { type: "suggestion", message: "Avoid nested loops if possible." }
      ],
      suggestions: [
        "Use const/let properly.",
        "Reduce repeated computations."
      ],
      complexity_analysis: {
        time: "O(n^2)",
        space: "O(1)"
      },
      score: 0.75
    };

    const dummyOptimization = {
      optimized_code:
        "// Optimized version placeholder\n" +
        submission.code_input +
        "\n// TODO: Replace with actual AI optimized output",
      improvements_summary: "Refactored code structure and improved readability.",
      performance_gain: {
        before: "O(n^2)",
        after: "O(n log n)"
      }
    };

    const dummyRawOutput = {
      review: dummyReview,
      optimization: dummyOptimization,
      notes: "This is a dummy AI output. Replace with real LLM integration."
    };

    // Insert review results
    const { data: reviewData, error: reviewError } = await supabase
      .from("review_results")
      .insert([
        {
          submission_id: submission_id,
          issues_found: dummyReview.issues_found,
          suggestions: dummyReview.suggestions,
          complexity_analysis: dummyReview.complexity_analysis,
          score: dummyReview.score
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
          submission_id: submission_id,
          optimized_code: dummyOptimization.optimized_code,
          improvements_summary: dummyOptimization.improvements_summary,
          performance_gain: dummyOptimization.performance_gain
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
          submission_id: submission_id,
          model_name: "dummy-model-v1",
          prompt_version: "v1",
          raw_output: dummyRawOutput,
          confidence_score: 0.80
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
      message: "AI analysis generated successfully (dummy output)",
      submission,
      review: reviewData[0],
      optimization: optimizationData[0],
      ai_log: logData[0]
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
