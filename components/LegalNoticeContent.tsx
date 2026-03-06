"use client"

import { useState, Fragment } from "react"
import { Scale } from "lucide-react"
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal"

const content = {
  en: {
    heading: "Legal Notice",
    command: "$ cat legal-notice.txt",
    updated: "Information pursuant to § 5 TMG",
    sections: [
      {
        title: "1. Responsible Party",
        body: "Oguz Kaan Öztürk",
      },
      {
        title: "2. Address",
        body: "[Street + Number]\n[Postal Code] [City]\nGermany",
      },
      {
        title: "3. Contact",
        body: "[EMAIL]",
      },
      {
        title: "4. Disclaimer",
        body: "Despite careful content review, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.",
      },
    ],
  },
  de: {
    heading: "Impressum",
    command: "$ cat impressum.txt",
    updated: "Angaben gemäß § 5 TMG",
    sections: [
      {
        title: "1. Verantwortliche Person",
        body: "Oguz Kaan Öztürk",
      },
      {
        title: "2. Adresse",
        body: "[Straße + Hausnummer]\n[PLZ] [Stadt]\nDeutschland",
      },
      {
        title: "3. Kontakt",
        body: "[EMAIL]",
      },
      {
        title: "4. Haftungsausschluss",
        body: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
      },
    ],
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

        <AnimatedSpan className="mt-2 text-ctp-subtext0">{t.updated}</AnimatedSpan>

        {t.sections.map((section) => (
          <Fragment key={section.title}>
            <AnimatedSpan className="mt-4 text-accent">{section.title}</AnimatedSpan>
            <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
              {section.body}
            </AnimatedSpan>
          </Fragment>
        ))}
      </Terminal>
    </section>
  )
}
