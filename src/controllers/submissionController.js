import { supabase } from "../config/supabaseClient.js";

export const createSubmission = async (req, res) => {
  try {
    const { project_id, language, code_input, submission_type } = req.body;

    if (!language || !code_input || !submission_type) {
      return res.status(400).json({
        message: "language, code_input and submission_type are required"
      });
    }

    const { data, error } = await supabase
      .from("code_submissions")
      .insert([
        {
          user_id: req.user.id,
          project_id: project_id || null,
          language,
          code_input,
          submission_type
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: "Code submission stored successfully",
      submission: data[0]
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllSubmissions = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("code_submissions")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({ submissions: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: submission, error } = await supabase
      .from("code_submissions")
      .select("*")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const { data: review } = await supabase
      .from("review_results")
      .select("*")
      .eq("submission_id", id)
      .single();

    const { data: optimization } = await supabase
      .from("optimization_results")
      .select("*")
      .eq("submission_id", id)
      .single();

    res.json({
      submission,
      review: review || null,
      optimization: optimization || null
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
