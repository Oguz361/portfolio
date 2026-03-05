import { ShieldCheck } from "lucide-react";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-6 pt-20">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-7 w-7 text-accent" />
        <h2 className="text-3xl font-bold text-ctp-text">Privacy Policy</h2>
      </div>

      <Terminal className="max-w-xl max-h-none overflow-hidden bg-mantle border-surface1">
        <TypingAnimation>$ cat privacy-policy.txt</TypingAnimation>

        <AnimatedSpan className="mt-2 text-ctp-subtext0">
          Last updated: 2025
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-accent">1. Controller</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          Oguz Kaan Öztürk — [your-email@example.com]
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-accent">2. Data Collected</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          This site does not use analytics, tracking pixels, or cookies.
          When you visit, the hosting provider (Vercel) may log standard
          server data such as IP address, browser type, and page URL for
          operational purposes. These logs are retained for a short period
          and are not accessible to the site owner.
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-accent">3. GitHub Integration</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          This site fetches public commit data from the GitHub API on the
          server side. No personal data from visitors is sent to GitHub.
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-accent">4. Contact</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          If you contact me by email, your message and email address will be
          used solely to respond to your inquiry and will not be shared with
          third parties.
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-accent">5. External Links</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          This site contains links to external websites. We have no control
          over their content or privacy practices and are not responsible for
          them.
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-accent">6. Your Rights (GDPR)</AnimatedSpan>
        <AnimatedSpan className="text-ctp-subtext1 whitespace-normal break-words">
          Under the GDPR you have the right to access, rectification,
          erasure, restriction, and portability of your personal data, as
          well as the right to object to processing. Contact the email above
          to exercise these rights.
        </AnimatedSpan>

        <AnimatedSpan className="mt-4 text-ctp-subtext0">
          ─────────────────────────────────
        </AnimatedSpan>

        <AnimatedSpan className="mt-3 text-ctp-subtext1 whitespace-normal break-words">
          As this portfolio collects no personal data directly, in practice
          there is no data to request or delete.
        </AnimatedSpan>
      </Terminal>
    </section>
  );
}
