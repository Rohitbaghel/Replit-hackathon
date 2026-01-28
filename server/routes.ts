import type { Express, Request, Response } from "express";
import { createServer, type Server } from "node:http";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Initialize OpenAI client lazily (only when needed)
  const getOpenAIClient = () => {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  };

  // POST /api/offers/fetch - Fetch offers for a card using AI
  app.post("/api/offers/fetch", async (req: Request, res: Response) => {
    try {
      const { bankName, cardType } = req.body;

      // Validate input
      if (!bankName || !cardType) {
        return res.status(400).json({
          error: "Missing required fields: bankName and cardType are required",
        });
      }

      // Get OpenAI client (will throw if API key is not set)
      let openai;
      try {
        openai = getOpenAIClient();
      } catch (error: any) {
        return res.status(500).json({
          error: "OpenAI API key is not configured",
          message: error.message,
        });
      }

      // Create prompt for OpenAI
      const prompt = `You are a financial services assistant. Generate a list of current, realistic offers available for a ${cardType} card from ${bankName} Bank in India. 

Return a JSON object with an "offers" key containing an array of offers. Each offer should have:
- id: unique identifier (string)
- title: short offer title (string)
- description: detailed description (string)
- merchant: merchant/partner name (string, optional)
- category: one of "cashback", "discount", "rewards", or "other" (string)
- discount: discount or benefit description like "10% off" or "₹500 cashback" (string, optional)
- validity: validity period like "Valid till 31 Dec 2024" (string, optional)
- terms: terms and conditions (string, optional)
- bankName: "${bankName}" (string)
- cardType: "${cardType}" (string)

Generate 8-12 diverse, realistic offers including:
- Cashback offers on popular merchants (Amazon, Flipkart, Swiggy, Zomato, etc.)
- Discount offers on dining, shopping, travel
- Reward points multipliers
- Special seasonal or limited-time offers

Make the offers realistic and relevant to Indian market. Return ONLY valid JSON object with format: {"offers": [...]}, no other text.`;

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that returns only valid JSON arrays. Never include markdown code blocks or explanations, only the JSON data.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      // Parse the response
      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        return res.status(500).json({
          error: "No response from OpenAI",
        });
      }

      // Parse JSON response
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseContent);
      } catch (parseError) {
        return res.status(500).json({
          error: "Failed to parse OpenAI response",
          details: responseContent.substring(0, 200),
        });
      }

      // Extract offers array
      const offers = parsedResponse.offers;

      if (!Array.isArray(offers)) {
        return res.status(500).json({
          error: "Invalid response format from OpenAI",
        });
      }

      // Return offers
      res.json(offers);
    } catch (error: any) {
      console.error("Error fetching offers:", error);
      res.status(500).json({
        error: "Failed to fetch offers",
        message: error.message || "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
