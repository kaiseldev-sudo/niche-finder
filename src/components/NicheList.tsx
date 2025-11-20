"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Niche {
    title: string;
    description: string;
    potential: string;
    usp?: string;
    audience?: string;
    starterAction?: string;
}

interface NicheListProps {
    niches: Niche[];
}

export default function NicheList({ niches }: NicheListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(niches.length / itemsPerPage);

    const currentNiches = niches.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (niches.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {currentNiches.map((niche, index) => (
                    <NicheCard key={`${niche.title}-${index}`} niche={niche} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full hover:bg-emerald-50 text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="text-sm font-medium text-gray-500">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full hover:bg-emerald-50 text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </div>
    );
}

function NicheCard({ niche }: { niche: Niche }) {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const detailSections = [
        {
            key: "usp",
            label: "Unique Selling Point",
            value: niche.usp ?? "Unique angle pending.",
        },
        {
            key: "audience",
            label: "Ideal Audience",
            value: niche.audience ?? "Target buyer not specified.",
        },
        {
            key: "starterAction",
            label: "Starter Move",
            value: niche.starterAction ?? "Define a quick validation step.",
        },
    ];

    return (
        <div className="group h-full flex flex-col bg-white/95 backdrop-blur rounded-2xl p-6 border border-emerald-50 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
            <div className="flex flex-col gap-5 flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            {niche.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{niche.description}</p>
                    </div>
                    {/* <span className="absolute top-4 right-4 shrink-0 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full">
                        {niche.potential}
                    </span> */}
                </div>

                <div className="flex flex-col gap-3 text-sm text-gray-700">
                    {detailSections.map((section) => {
                        const isOpen = openSection === section.key;
                        return (
                            <div
                                key={section.key}
                                className="rounded-xl border border-emerald-100 bg-emerald-50/70"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenSection(isOpen ? null : section.key)
                                    }
                                    className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
                                >
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">
                                            {section.label}
                                        </p>
                                        {!isOpen && (
                                            <p className="text-gray-700 mt-1 text-leading-relaxed">
                                                {section.value}
                                            </p>
                                        )}
                                    </div>
                                    <ChevronDown
                                        className={`w-4 h-4 text-emerald-500 transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`px-4 overflow-hidden transition-all text-gray-700 ${isOpen ? "max-h-40 pb-4" : "max-h-0"
                                        }`}
                                >
                                    <p className="text-sm">{section.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
