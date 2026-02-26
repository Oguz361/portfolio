export type Difficulty = "easy" | "medium" | "hard";

export interface CTFChallenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  hint: string;
  flagHash: string;
}

export const challenges: CTFChallenge[] = [
  {
    id: "view-source",
    title: "View Source",
    difficulty: "easy",
    category: "Source Code",
    hint: "Sometimes the answer is right in front of you — just read the source.",
    flagHash:
      "aec8808c59d3803c79bc9bc12e9bfd87998a6483f8806153c5b205420fd3c88c",
  },
  {
    id: "console-log",
    title: "Console.log",
    difficulty: "easy",
    category: "DevTools",
    hint: "Developers always check the console first.",
    flagHash:
      "bdccf5023180966932d1a716426d5da86febdf5be723c3e0a665d10e862d2ca2",
  },
  {
    id: "decode-me",
    title: "Decode Me",
    difficulty: "medium",
    category: "Encoding",
    hint: "Not everything is what it seems — some things need decoding.",
    flagHash:
      "0bb215a34c5afd3f9ffa659cf06568dcde3e77b68c220edd50823c123b1e246d",
  },
  {
    id: "method-switching",
    title: "Method Switching",
    difficulty: "hard",
    category: "API Exploitation",
    hint: "GET isn't the only way to ask.",
    flagHash:
      "49682209f375f4e1814d2cbf959a41b59940d8512dbaa23730351cb60ef6299a",
  },
];

/**
 * Hash a flag submission using SHA-256 (browser-compatible).
 * Used client-side to compare against stored hashes without
 * exposing the actual flag strings in network requests.
 */
export async function hashFlag(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}