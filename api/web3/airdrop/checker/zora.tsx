import type { VercelRequest, VercelResponse } from '@vercel/node';

const ZORA_API_URL = "https://api.zora.co/universal/graphql";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method is allowed." });
  }

  const { wallet } = req.body;

  if (!wallet || typeof wallet !== "string") {
    return res.status(400).json({ error: "Invalid wallet address." });
  }

  // Hati-hati: jangan pakai tanda kutip di enum!
  const query = `
    query {
      zoraTokenAllocation(
        identifierWalletAddresses: ["${wallet}"],
        zoraClaimContractEnv: PRODUCTION
      ) {
        totalTokensEarned {
          totalTokens
        }
      }
    }
  `;

  try {
    const response = await fetch(ZORA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Zora API fetch failed:", error);
    return res.status(500).json({ error: "Zora API request failed" });
  }
}
