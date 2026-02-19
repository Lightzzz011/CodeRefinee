import { supabase } from "../config/supabaseClient.js";

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          user_id: req.user.id,
          title,
          description
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: "Project created successfully", project: data[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({ projects: data });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
