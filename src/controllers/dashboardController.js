import { supabase } from "../config/supabaseClient.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { count: totalProjects } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: totalSubmissions } = await supabase
      .from("code_submissions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { data: lastActivity } = await supabase
      .from("user_activity")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    const { data: languageData } = await supabase
      .from("code_submissions")
      .select("language")
      .eq("user_id", userId);

    let mostUsedLanguage = null;

    if (languageData && languageData.length > 0) {
      const freq = {};
      languageData.forEach((row) => {
        freq[row.language] = (freq[row.language] || 0) + 1;
      });

      mostUsedLanguage = Object.keys(freq).reduce((a, b) =>
        freq[a] > freq[b] ? a : b
      );
    }

    res.json({
      totalProjects: totalProjects || 0,
      totalSubmissions: totalSubmissions || 0,
      mostUsedLanguage,
      lastActivity: lastActivity?.[0] || null
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
