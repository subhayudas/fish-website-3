"use client";

import { useEffect } from "react";
import { readStoredLocale } from "@/lib/locale";

export default function RootPage() {
  useEffect(() => {
    const stored = readStoredLocale();
    window.location.replace(stored === "fr" ? "/fr" : "/en");
  }, []);

  return (
    <main style={{ minHeight: "100dvh", background: "#031923" }} aria-busy="true">
      <span className="visually-hidden">Loading…</span>
    </main>
  );
}
