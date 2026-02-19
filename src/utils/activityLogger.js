import { supabase } from "../config/supabaseClient.js";

export const logActivity = async (userId, action, metadata = {}) => {
  try {
    await supabase.from("user_activity").insert([
      {
        user_id: userId,
        action,
        metadata
      }
    ]);
  } catch (err) {
    console.log("Activity log failed:", err.message);
  }
};
