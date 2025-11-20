"use client";

import { useState } from "react";
import NicheInput from "@/components/NicheInput";
import NicheList from "@/components/NicheList";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Home() {
  const [niches, setNiches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setNiches([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: term }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to generate niches");
      }
      if (data.niches) {
        setNiches(data.niches);
      }
    } catch (error) {
      console.error("Failed to fetch niches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/80 shadow-[0_20px_120px_rgba(16,185,129,0.12)] px-6 py-12 md:px-12 mb-12">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-50/90 via-white to-transparent" />
            <div className="absolute -top-24 right-8 w-64 h-64 bg-emerald-200/50 blur-3xl" />
            <div className="absolute -bottom-20 left-6 w-60 h-60 bg-white/70 blur-3xl" />
            <div className="relative z-10 space-y-8 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-100 bg-emerald-50/80 text-emerald-700 font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Instant niche radar</span>
              </div>
              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Launch with clarity, not guesswork.
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                  Surface validated opportunities, understand who actually buys, and get a ready-to-action USP in under a minute.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-emerald-700">
                {[
                  "Audience snapshot baked in",
                  "USP + starter move every time",
                  "Export-ready structured JSON",
                ].map((label) => (
                  <span
                    key={label}
                    className="px-4 py-2 rounded-full border border-emerald-100 bg-white/70 shadow-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <NicheInput onSearch={handleSearch} isLoading={isLoading} />

          {hasSearched && !isLoading && niches.length === 0 && (
            <div className="text-center mt-12 text-gray-500">
              No niches found. Try a different keyword.
            </div>
          )}

          <NicheList niches={niches} />
        </div>
      </main>

      <footer className="border-t border-emerald-100 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-semibold">
                Stay inspired
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Ship your next niche faster with confident, validated ideas.
              </h2>
              <p className="text-gray-600">
                Use the cards above to spot opportunities, share them with your team, and
                come back anytime for a fresh round of inspiration.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-500 transition"
              >
                Generate another idea
              </button>
              <a
                href="mailto:hello@nichefinder.ai"
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 font-semibold text-emerald-700 hover:border-emerald-400 hover:text-emerald-800 transition"
              >
                Request custom research
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-gray-500 gap-2">
            <span>
              © {currentYear} Niche Finder AI. Built with Next.js + Gemini, crafted by{" "}
              <a
                href="https://jaysonreales.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                json.dev
              </a>
              .
            </span>
            <span>Privacy-first: prompts aren&apos;t stored.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
