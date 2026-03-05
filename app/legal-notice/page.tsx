import { Scale } from "lucide-react";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";

export const metadata = {
  title: "Legal Notice",
};

export default function LegalNoticePage() {
  return (
    <section className="space-y-6 pt-20">
      <div className="flex items-center gap-2">
        <Scale className="h-7 w-7 text-accent" />
        <h2 className="text-3xl font-bold text-ctp-text">Legal Notice</h2>
      </div>

      <Terminal className="max-w-xl max-h-none overflow-hidden bg-mantle border-surface1">
        <TypingAnimation>$ cat legal-notice.txt</TypingAnimation>

        <AnimatedSpan className="mt-2 text-ctp-subtext0">
          Information pursuant to § 5 TMG
        </AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">Name</AnimatedSpan>
        <AnimatedSpan>Oguz Kaan Öztürk</AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">Address</AnimatedSpan>
        <AnimatedSpan>[Street + Number]</AnimatedSpan>
        <AnimatedSpan>[Postal Code] [City]</AnimatedSpan>
        <AnimatedSpan>Germany</AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">Email</AnimatedSpan>
        <AnimatedSpan>[your-email@example.com]</AnimatedSpan>

        <AnimatedSpan className="mt-4 text-ctp-subtext0">
          ─────────────────────────────────
        </AnimatedSpan>

        <AnimatedSpan className="mt-3 text-accent">Disclaimer</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          Despite careful content review, we assume no liability for the content
          of external links. The operators of linked pages are solely responsible
          for their content.
        </AnimatedSpan>
      </Terminal>
    </section>
  );
}
