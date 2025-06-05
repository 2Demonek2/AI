import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Wstaw tutaj swój klucz API Gemini lub inny (na razie przykładowy)
const API_KEY = "TU_WSTAW_SWÓJ_API_KEY";

app.use(cors());
app.use(express.json());

app.post('/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).json({ error: 'Brak promptu' });
    }

    // Tutaj wywołujesz Gemini API (przykład, dostosuj do API Gemini)
    const response = await fetch('https://api.gemini.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gemini-1", // lub właściwa nazwa modelu
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error: `Błąd API: ${error}` });
    }

    const data = await response.json();
    // Dostosuj według struktury odpowiedzi Gemini
    const output = data.choices?.[0]?.message?.content || "Brak odpowiedzi";

    res.json({ output });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy działa na porcie ${PORT}`);
});
