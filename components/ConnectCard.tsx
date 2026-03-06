import { Mail } from "lucide-react";

export default function ConnectCard() {
  return (
    <div className="group flex flex-col items-start gap-4 rounded-xl border border-surface1 bg-base shadow-lg p-4 transition-all">
      <h3 className="w-full text-center text-lg font-semibold text-ctp-text transition-colors group-hover:text-accent">Let&apos;s Connect</h3>
      <p className="text-sm text-subtext0">
        Interested in working together or just want to say hi? Feel free to
        reach out.
      </p>
      <a
        href="mailto:[EMAIL]"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-base transition-opacity hover:opacity-90"
      >
        <Mail className="h-4 w-4" />
        Book a Chat
      </a>
    </div>
  );
}
