"use client";

import { useState, FormEvent } from "react";
import { Envelope, CheckCircle } from "@phosphor-icons/react";

interface Props {
  source: "cta_banner" | "footer" | "drama_page";
  className?: string;
}

export default function EmailSubscribe({ source, className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("done");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`inline-flex items-center gap-2 text-accent-400 font-medium ${className}`}
      >
        <CheckCircle weight="fill" className="w-5 h-5" />
        {message}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
    >
      <div className="relative flex-1 max-w-sm">
        <Envelope
          weight="bold"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full bg-surface-800 border border-surface-700 focus:border-accent-500 rounded-full pl-11 pr-4 py-3 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent-500 hover:bg-accent-400 disabled:opacity-60 text-surface-950 font-semibold px-6 py-3 rounded-full text-sm transition-all active:scale-[0.98] whitespace-nowrap"
      >
        {status === "loading" ? "Subscribing..." : "Get Drama Updates"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-1 sm:hidden">{message}</p>
      )}
    </form>
  );
}
