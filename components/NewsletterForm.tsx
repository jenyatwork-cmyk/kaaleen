"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); }
  };

  if (submitted) {
    return <p className="text-cream-300 text-sm">You&apos;re on the list. Welcome to the collective.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 sm:w-64 bg-espresso-light border border-espresso-light rounded-full px-4 py-2.5 text-sm text-cream-100 placeholder:text-cream-400 focus:outline-none focus:border-cream-400"
      />
      <button type="submit" className="bg-cream-100 text-espresso px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white transition-colors flex-shrink-0">
        Subscribe
      </button>
    </form>
  );
}
