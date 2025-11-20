import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export async function POST(req: Request) {
    console.log("API Route hit");
    try {
        const body = await req.json();
        console.log("Request body:", body);
        const { prompt } = body;

        if (!prompt) {
            console.log("No prompt provided");
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        console.log("API Key present:", !!apiKey);

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not defined in environment variables" },
                { status: 500 }
            );
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const modelId = resolveModel(process.env.GEMINI_MODEL);
            const model = genAI.getGenerativeModel({ model: modelId });

            const systemPrompt = `
            You are a Niche Market Research Expert specializing in identifying profitable micro-niches.

            Using the user’s input (a hobby, passion, interest, or skill), generate exactly 50 highly profitable, ultra-specific niche ideas.
            Your output must be ONLY a valid JSON array of objects—no explanations, no markdown, no extra text.

            For each of the 50 ideas, produce an object with these fields:
            "title": A catchy, sharply defined niche title (7–12 words max).
            "description": A clear 1–2 sentence explanation of the niche and the business opportunity, explicitly stating why it is profitable.
            "potential": One of "High", "Medium", or "Emerging", chosen realistically based on current market trends.
            "usp": A single-sentence unique selling point that differentiates this niche from competitors.
            "audience": Describe the ideal buyer using 6–12 words.
            "starterAction": A precise, immediately actionable step to validate or launch the niche (max 12 words).

            Rules:
            Use plain, concise language that is specific and practical.
            Do not repeat or overlap niche ideas.
            Ensure niches are clearly distinct and targeted at different needs, demographics, or outcomes.
            Return only the JSON array, with no commentary.
          
            User Input: ${prompt}
        `;

            const result = await model.generateContent(systemPrompt);
            const response = result.response;
            const text = response.text();

            const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
            const jsonPayload = extractJsonArray(cleaned);
            const niches = JSON.parse(jsonPayload);
            return NextResponse.json({ niches });

        } catch (error) {
            const normalizedError = normalizeGeminiError(error);
            console.error("AI Generation failed:", normalizedError);
            return NextResponse.json(
                {
                    error: "AI Generation failed",
                    details: normalizedError.message,
                    hint: normalizedError.hint,
                },
                { status: normalizedError.status }
            );
        }

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
    }
}

function extractJsonArray(raw: string) {
    try {
        const start = raw.indexOf("[");
        const end = raw.lastIndexOf("]");
        if (start === -1 || end === -1 || end <= start) {
            throw new Error("JSON array markers not found");
        }
        return raw.slice(start, end + 1);
    } catch (error) {
        console.error("Failed to isolate JSON:", raw);
        throw error;
    }
}

function resolveModel(configuredModel?: string | null) {
    const trimmed = configuredModel?.trim();
    if (!trimmed) {
        return DEFAULT_GEMINI_MODEL;
    }

    const deprecatedModels = new Set([
        "gemini-pro",
        "models/gemini-pro",
        "gemini-pro-vision",
    ]);

    if (deprecatedModels.has(trimmed)) {
        console.warn(
            `GEMINI_MODEL=${trimmed} is deprecated. Falling back to ${DEFAULT_GEMINI_MODEL}.`
        );
        return DEFAULT_GEMINI_MODEL;
    }

    return trimmed;
}

function normalizeGeminiError(error: unknown) {
    const message = String(
        (error as { message?: string })?.message ?? error ?? "Unknown error"
    );

    if (message.includes("models/gemini-pro")) {
        return {
            message,
            hint: "Model gemini-pro is deprecated. Remove GEMINI_MODEL or set it to a Gemini 1.5 model.",
            status: 400,
        };
    }

    return { message, hint: undefined, status: 500 };
}
