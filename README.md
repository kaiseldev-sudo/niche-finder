# Niche Finder AI

Modern Next.js application that turns vague hobbies, passions, or skills into validated micro‑niche business ideas. Powered by Google’s Gemini models, each result arrives with a description, potential score, USP, target audience, and starter action—presented inside responsive cards tailor-made for instant sharing.

## ✨ Features

- **Gemini 1.5 integration** – configurable model selection with graceful fallbacks and smarter error messaging.
- **Insight-rich cards** – every niche is rendered as a sleek three-column grid with accordions for USP, audience, and starter move.
- **Guided UX** – hero radar banner, paginated results, and a polished footer with quick actions.
- **Modern typography** – global Sora font pairing for a corporate, high-trust feel.
- **Zero-prompt persistence** – API route purposely avoids storing user prompts.

## 🛠️ Tech Stack

- Next.js 16 (App Router) & React 19
- Tailwind CSS v4 (next-gen design tokens)
- Google Generative AI SDK (`@google/generative-ai`)
- lucide-react icons & custom utility helpers

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (ships with Node)
- A Google Generative AI API key with access to Gemini 1.5 models

### Installation

```bash
npm install
cp .env.example .env.local # if you keep an example file, otherwise create manually
```

Create `.env.local` with:

```bash
GEMINI_API_KEY=your-key-here
# optional override (defaults to gemini-1.5-flash)
GEMINI_MODEL=gemini-1.5-flash
```

### Commands

| Script         | Description                                  |
| -------------- | -------------------------------------------- |
| `npm run dev`  | Start local dev server at `http://localhost:3000` |
| `npm run build`| Create production build                      |
| `npm run start`| Serve the production build                   |
| `npm run lint` | Run ESLint checks                            |

## 🧠 API Overview

`POST /api/generate`

```json
{
  "prompt": "graphic design"
}
```

Returns:

```json
{
  "niches": [
    {
      "title": "Inclusive Design Advocate",
      "description": "...",
      "potential": "Emerging",
      "usp": "...",
      "audience": "...",
      "starterAction": "..."
    }
  ]
}
```

Errors include human-friendly hints (e.g., when an unsupported Gemini model is configured).

## 🧱 Project Structure

- `src/app/page.tsx` – marketing hero, search flow, footer
- `src/app/api/generate/route.ts` – Gemini integration
- `src/components/NicheInput.tsx` – prompt form
- `src/components/NicheList.tsx` – paginated card grid with accordions

## 📦 Deployment

Deploy anywhere Next.js runs (Vercel, Netlify, Render, etc.). Ensure production env vars include `GEMINI_API_KEY` (and optional `GEMINI_MODEL`). The app has no server-side session storage, so it’s stateless by default.

## 🤝 Contributing

1. Fork & clone
2. Create a feature branch
3. Run `npm run lint` before submitting PRs

Questions or ideas? Ping the maintainer team (built with love by [json.dev](https://json.dev)). Happy niche hunting! 🎯
