import { supabase } from "../config/supabaseClient.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = data.user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Auth middleware error", error: err.message });
  }
};
