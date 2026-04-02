"use client"

import { useState, Fragment } from "react"
import { ShieldCheck } from "lucide-react"
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal"

const content = {
  en: {
    heading: "Privacy Policy",
    command: "$ cat privacy-policy.txt",
    updated: "Last updated: 2026",
    sections: [
      {
        title: "1. Controller",
        body: "Oguz Kaan Öztürk — ",
      },
      {
        title: "2. Data Collected",
        body: "This site does not use analytics, tracking pixels, or cookies. When you visit, the hosting provider (Vercel) may log standard server data such as IP address, browser type, and page URL for operational purposes. These logs are retained for a short period and are not accessible to the site owner.",
      },
      {
        title: "3. GitHub Integration",
        body: "This site fetches public commit data from the GitHub API on the server side. No personal data from visitors is sent to GitHub.",
      },
      {
        title: "4. Contact",
        body: "If you contact me by email, your message and email address will be used solely to respond to your inquiry and will not be shared with third parties.",
      },
      {
        title: "5. External Links",
        body: "This site contains links to external websites. We have no control over their content or privacy practices and are not responsible for them.",
      },
      {
        title: "6. Your Rights (GDPR)",
        body: "Under the GDPR you have the right to access, rectification, erasure, restriction, and portability of your personal data, as well as the right to object to processing. Contact the email above to exercise these rights.",
      },
    ],
    note: "As this portfolio collects no personal data directly, in practice there is no data to request or delete.",
  },
  de: {
    heading: "Datenschutzerklärung",
    command: "$ cat datenschutz.txt",
    updated: "Zuletzt aktualisiert: 2026",
    sections: [
      {
        title: "1. Verantwortlicher",
        body: "Oguz Kaan Öztürk — ",
      },
      {
        title: "2. Erhobene Daten",
        body: "Diese Website verwendet keine Analyse-Tools, Tracking-Pixel oder Cookies. Beim Besuch kann der Hosting-Anbieter (Vercel) standardmäßige Serverdaten wie IP-Adresse, Browsertyp und Seiten-URL zu Betriebszwecken protokollieren. Diese Protokolle werden kurzzeitig gespeichert und sind für den Seitenbetreiber nicht einsehbar.",
      },
      {
        title: "3. GitHub-Integration",
        body: "Diese Website ruft öffentliche Commit-Daten von der GitHub-API serverseitig ab. Es werden keine personenbezogenen Daten der Besucher an GitHub übermittelt.",
      },
      {
        title: "4. Kontakt",
        body: "Wenn Sie mich per E-Mail kontaktieren, werden Ihre Nachricht und E-Mail-Adresse ausschließlich zur Beantwortung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.",
      },
      {
        title: "5. Externe Links",
        body: "Diese Website enthält Links zu externen Websites. Wir haben keinen Einfluss auf deren Inhalte oder Datenschutzpraktiken und sind für diese nicht verantwortlich.",
      },
      {
        title: "6. Ihre Rechte (DSGVO)",
        body: "Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Übertragbarkeit Ihrer personenbezogenen Daten sowie das Recht, der Verarbeitung zu widersprechen. Wenden Sie sich an die oben genannte E-Mail-Adresse, um diese Rechte auszuüben.",
      },
    ],
    note: "Da dieses Portfolio direkt keine personenbezogenen Daten erfasst, gibt es in der Praxis keine Daten, die angefragt oder gelöscht werden können.",
  },
}

export default function PrivacyPolicyContent() {
  const [lang, setLang] = useState<"en" | "de">("en")
  const email = ["contact", "@", "oguzkaan.dev"].join("")
  const t = lang === "en"
    ? { ...content.en, sections: content.en.sections.map(s => s.title === "1. Controller" ? { ...s, body: `Oguz Kaan Öztürk — ${email}` } : s) }
    : { ...content.de, sections: content.de.sections.map(s => s.title === "1. Verantwortlicher" ? { ...s, body: `Oguz Kaan Öztürk — ${email}` } : s) }

  return (
    <section className="space-y-6 pt-20">
      <div className="flex flex-wrap items-center justify-between gap-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-accent" />
          <h2 className="text-2xl sm:text-3xl font-bold text-ctp-text">{t.heading}</h2>
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

        <AnimatedSpan className="mt-4 text-ctp-subtext0">
          ─────────────────────────────────
        </AnimatedSpan>

        <AnimatedSpan className="mt-3 text-ctp-subtext1 whitespace-normal break-words">
          {t.note}
        </AnimatedSpan>
      </Terminal>
    </section>
  )
}
