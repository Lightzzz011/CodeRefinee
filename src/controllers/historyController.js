import { supabase } from "../config/supabaseClient.js";
import { logActivity } from "../utils/activityLogger.js";

export const getHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("code_submissions")
      .select(`
        *,
        review_results(*),
        optimization_results(*)
      `)
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await logActivity(req.user.id, "view_history");

    res.json({ history: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
