import { Mail } from "lucide-react";

export default function ConnectCard() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-surface1 bg-transparent p-5">
      <h3 className="text-lg font-semibold text-ctp-text">Let&apos;s Connect</h3>
      <p className="text-sm text-subtext0">
        Interested in working together or just want to say hi? Feel free to
        reach out.
      </p>
      <a
        href="mailto:hello@example.com"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-base transition-opacity hover:opacity-90"
      >
        <Mail className="h-4 w-4" />
        Book a Chat
      </a>
    </div>
  );
}
