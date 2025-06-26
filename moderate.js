import express from "express";
import { moderateText } from "../services/moderationService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Texto ausente." });
  }

  try {
    const result = await moderateText(text);
    res.json(result);
  } catch (err) {
    console.error("Erro na moderação:", err);
    res.status(500).json({ error: "Erro ao processar moderação" });
  }
});

export default router;
