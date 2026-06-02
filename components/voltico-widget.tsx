"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import type { WidgetConfig } from "@opencx/widget-core";
import { useI18n, type Lang } from "@/components/i18n";

declare global {
  interface Window {
    initOpenScript?: (options: WidgetConfig) => void;
  }
}

const WIDGET_ROOT_ID = "opencx-root";

const TRIGGER_OPEN_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff'%3E%3Crect x='13' y='17' width='12' height='12' rx='1.5'/%3E%3Cpath d='M29 17 L46 17 L37 43 L20 43 Z'/%3E%3C/g%3E%3C/svg%3E";

const TRIGGER_CLOSE_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M7 7 L17 17 M17 7 L7 17'/%3E%3C/svg%3E";

const BOT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%235A5AF0'/%3E%3Cstop offset='55%25' stop-color='%233636EA'/%3E%3Cstop offset='100%25' stop-color='%232424C8'/%3E%3C/linearGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.28'/%3E%3Cstop offset='55%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='h' cx='30%25' cy='18%25' r='55%25'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.35'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='url(%23b)'/%3E%3Crect width='64' height='64' rx='16' fill='url(%23s)'/%3E%3Crect width='64' height='64' rx='16' fill='url(%23h)'/%3E%3Cg fill='%23ffffff'%3E%3Crect x='15' y='19' width='12' height='12' rx='1.5'/%3E%3Cpath d='M31 19 L48 19 L39 45 L22 45 Z'/%3E%3C/g%3E%3Crect x='0.5' y='0.5' width='63' height='63' rx='15.5' fill='none' stroke='%23ffffff' stroke-opacity='0.18'/%3E%3C/svg%3E";

const CSS_OVERRIDES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:host, * { font-family: 'Inter', system-ui, -apple-system, sans-serif; letter-spacing: -0.005em; }

/* Remove the "Powered by OpenCX" footer entirely — including its padding.
   It's an unlabeled padded div wrapping a link to open.cx; scoping with :has()
   to that link keeps this from matching any other element. No :host prefix —
   the widget renders in an iframe, where :host matches nothing. */
div:has(> a[href*='open.cx']),
.flex.items-center.justify-center.gap-2.p-2.pt-0:has(a[href*='open.cx']) {
  display: none !important;
}
a[href*='open.cx'] { display: none !important; }
`;

type LocalizedCopy = {
  welcomeTitle: string;
  welcomeDescription: string;
  chatHeader: string;
  initialMessage: string;
  questions: [string, string];
};

// Our custom strings (the widget's built-in chrome is translated by `language`,
// but these app-specific strings are not — so we localize the ones we ship).
// EN/NL are translated; other languages fall back to English here.
const COPY: Partial<Record<Lang, LocalizedCopy>> = {
  en: {
    welcomeTitle: "Hi, we're Voltico.",
    welcomeDescription:
      "Questions about earnings, charging data, or onboarding — ask away.",
    chatHeader: "Voltico Support",
    initialMessage:
      "Hi, welcome to Voltico! To point you to the right place, are you a consumer or a business?",
    questions: ["Consumer", "Business"],
  },
  nl: {
    welcomeTitle: "Hoi, wij zijn Voltico.",
    welcomeDescription:
      "Vragen over opbrengsten, laaddata of onboarding — stel ze gerust.",
    chatHeader: "Voltico Support",
    initialMessage:
      "Welkom bij Voltico! Om je naar de juiste plek te helpen: ben je een consument of een bedrijf?",
    questions: ["Consument", "Bedrijf"],
  },
};

function buildOptions(language: Lang): WidgetConfig {
  const copy = COPY[language] ?? COPY.en!;

  return {
    token: "9fa71101c87491cb89309a5fc12205c5",
    language,
    theme: {
      palette: "slate",
      primaryColor: "#3636EA",
      widgetTrigger: {
        size: { button: 60, icon: 28 },
        offset: { bottom: 24, right: 24 },
      },
      widgetContentContainer: {
        borderRadius: "28px",
        boxShadow:
          "0 24px 60px -12px rgba(26, 26, 67, 0.28), 0 8px 20px -8px rgba(54, 54, 234, 0.18)",
        outline: "1px solid",
        outlineColor: "rgba(26, 26, 67, 0.08)",
        transitionDuration: "260ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      screens: {
        welcome: { minHeight: "520px", width: "400px" },
        chat: { height: "640px", width: "400px" },
      },
    },
    textContent: {
      welcomeScreen: {
        title: copy.welcomeTitle,
        description: copy.welcomeDescription,
      },
      chatScreen: { headerTitle: copy.chatHeader },
    },
    initialMessages: [copy.initialMessage],
    initialQuestions: [...copy.questions],
    initialQuestionsPosition: "below-initial-messages",
    assets: {
      widgetTrigger: {
        openIcon: TRIGGER_OPEN_ICON,
        closeIcon: TRIGGER_CLOSE_ICON,
      },
    },
    bot: {
      name: "Volt",
      avatarUrl: BOT_AVATAR,
    },
    humanAgent: { name: "Voltico Team" },
    user: {
      externalId: `demo_${window.crypto?.randomUUID?.() ?? "anon"}`,
      data: {
        name: "Visitor",
        customData: {
          source: "voltico-widget-demo",
          org_name: "Voltico Widget",
        },
      },
    },
    cssOverrides: CSS_OVERRIDES,
  };
}

export function VolticoWidget() {
  const { lang } = useI18n();
  const [scriptReady, setScriptReady] = useState(false);

  // (Re)initialize the widget whenever the embed is ready or the language
  // changes. The embed renders into #opencx-root with no portals to the host
  // body, so removing that node fully tears the widget down before re-init.
  useEffect(() => {
    if (!scriptReady || !window.initOpenScript) return;
    document.getElementById(WIDGET_ROOT_ID)?.remove();
    window.initOpenScript(buildOptions(lang));
  }, [scriptReady, lang]);

  return (
    <Script
      src="https://unpkg.com/@opencx/widget@latest/dist-embed/script.js"
      strategy="afterInteractive"
      onLoad={() => setScriptReady(true)}
    />
  );
}
