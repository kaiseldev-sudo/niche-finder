"use client";

import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-100 bg-white/80 text-emerald-700 font-semibold shadow-sm">
          <Compass className="w-4 h-4" />
          <span>Off-map territory</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            404 — Niche not spotted
          </h1>
          <p className="text-lg text-gray-600">
            The page you&apos;re tracking doesn&apos;t exist, might be private, or never shipped.
            Let&apos;s get you back to the opportunity radar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 text-sm text-left">
          {[
            {
              label: "What happened?",
              body: "Broken link, expired experiment, or a typo in the URL.",
            },
            {
              label: "What stays intact?",
              body: "Your prompts, runs, and saved niches remain untouched.",
            },
            {
              label: "Next move",
              body: "Head home and spin up a fresh batch of niche intel.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-500 font-semibold">
                {item.label}
              </p>
              <p className="mt-2 text-gray-700">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-500 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to radar
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 font-semibold text-emerald-700 hover:border-emerald-400 hover:text-emerald-800 transition"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Try previous spot
          </button>
        </div>
      </div>
    </div>
  );
}

