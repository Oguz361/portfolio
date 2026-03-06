"use client"

import { useState } from "react"
import { Scale } from "lucide-react"
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal"

const content = {
  en: {
    heading: "Legal Notice",
    command: "$ cat legal-notice.txt",
    intro: "Information pursuant to § 5 TMG",
    nameLabel: "Name",
    addressLabel: "Address",
    addressLine1: "[Street + Number]",
    addressLine2: "[Postal Code] [City]",
    country: "Germany",
    emailLabel: "Email",
    email: "[your-email@example.com]",
    disclaimerLabel: "Disclaimer",
    disclaimer:
      "Despite careful content review, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.",
  },
  de: {
    heading: "Impressum",
    command: "$ cat impressum.txt",
    intro: "Angaben gemäß § 5 TMG",
    nameLabel: "Name",
    addressLabel: "Adresse",
    addressLine1: "[Straße + Hausnummer]",
    addressLine2: "[PLZ] [Stadt]",
    country: "Deutschland",
    emailLabel: "E-Mail",
    email: "[ihre-email@example.com]",
    disclaimerLabel: "Haftungsausschluss",
    disclaimer:
      "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
  },
}

export default function LegalNoticeContent() {
  const [lang, setLang] = useState<"en" | "de">("en")
  const t = content[lang]

  return (
    <section className="space-y-6 pt-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="h-7 w-7 text-accent" />
          <h2 className="text-3xl font-bold text-ctp-text">{t.heading}</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setLang("en")}
            className={`cursor-pointer transition-colors ${lang === "en" ? "text-accent font-semibold" : "text-subtext0 hover:text-ctp-text"}`}
          >
            EN
          </button>
          <span className="text-surface1">·</span>
          <button
            onClick={() => setLang("de")}
            className={`cursor-pointer transition-colors ${lang === "de" ? "text-accent font-semibold" : "text-subtext0 hover:text-ctp-text"}`}
          >
            DE
          </button>
        </div>
      </div>

      <Terminal key={lang} className="max-w-xl max-h-none overflow-hidden bg-mantle border-surface1">
        <TypingAnimation>{t.command}</TypingAnimation>

        <AnimatedSpan className="mt-2 text-ctp-subtext0">{t.intro}</AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">{t.nameLabel}</AnimatedSpan>
        <AnimatedSpan>Oguz Kaan Öztürk</AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">{t.addressLabel}</AnimatedSpan>
        <AnimatedSpan>{t.addressLine1}</AnimatedSpan>
        <AnimatedSpan>{t.addressLine2}</AnimatedSpan>
        <AnimatedSpan>{t.country}</AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">{t.emailLabel}</AnimatedSpan>
        <AnimatedSpan>{t.email}</AnimatedSpan>

        <AnimatedSpan className="mt-4 text-ctp-subtext0">
          ─────────────────────────────────
        </AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">{t.disclaimerLabel}</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          {t.disclaimer}
        </AnimatedSpan>
      </Terminal>
    </section>
  )
}
