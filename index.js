require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (data && data.choices && data.choices[0]?.message?.content) {
      const reply = data.choices[0].message.content;
      console.log("💬 Resposta:", reply);
      res.json({ reply });
    } else {
      res.json({ reply: "Sem resposta da IA" });
    }
  } catch (error) {
    console.error("❌ Erro:", error);
    res.status(500).json({ error: "Erro ao processar a mensagem." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
