"use client";

import { useEffect } from "react";

export default function ConsoleFlag() {
  useEffect(() => {
    console.log(
      `%c
  ╔══════════════════════════════════════╗
  ║    You found a hidden flag!          ║
  ║                                      ║
  ║   FLAG{c0ns0l3_h4ck3r}               ║
  ║                                      ║
  ╚══════════════════════════════════════╝
`,
      "color: #a6e3a1; font-family: monospace; font-size: 13px;",
    );
  }, []);

  return null;
}
