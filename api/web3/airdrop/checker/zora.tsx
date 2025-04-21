import type { VercelRequest, VercelResponse } from '@vercel/node';

const ZORA_API_URL = "https://api.zora.co/universal/graphql";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST method is allowed." });
    return;
  }

  try {
    const response = await fetch(ZORA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching from Zora API:", err);
    res.status(500).json({ error: "Failed to fetch data from Zora." });
  }
}
