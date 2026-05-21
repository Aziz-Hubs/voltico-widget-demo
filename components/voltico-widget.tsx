"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const Widget = dynamic(
  () => import("@opencx/widget-react").then((m) => m.Widget),
  { ssr: false },
);

type WidgetOptions = ComponentProps<typeof Widget>["options"];

const TRIGGER_OPEN_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cg fill='%23ffffff'%3E%3Crect x='13' y='17' width='12' height='12' rx='1.5'/%3E%3Cpath d='M29 17 L46 17 L37 43 L20 43 Z'/%3E%3C/g%3E%3C/svg%3E";

const TRIGGER_CLOSE_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M7 7 L17 17 M17 7 L7 17'/%3E%3C/svg%3E";

const BOT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='b' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%235A5AF0'/%3E%3Cstop offset='55%25' stop-color='%233636EA'/%3E%3Cstop offset='100%25' stop-color='%232424C8'/%3E%3C/linearGradient%3E%3ClinearGradient id='s' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.28'/%3E%3Cstop offset='55%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3CradialGradient id='h' cx='30%25' cy='18%25' r='55%25'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.35'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='url(%23b)'/%3E%3Crect width='64' height='64' rx='16' fill='url(%23s)'/%3E%3Crect width='64' height='64' rx='16' fill='url(%23h)'/%3E%3Cg fill='%23ffffff'%3E%3Crect x='15' y='19' width='12' height='12' rx='1.5'/%3E%3Cpath d='M31 19 L48 19 L39 45 L22 45 Z'/%3E%3C/g%3E%3Crect x='0.5' y='0.5' width='63' height='63' rx='15.5' fill='none' stroke='%23ffffff' stroke-opacity='0.18'/%3E%3C/svg%3E";

const CSS_OVERRIDES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:host, * { font-family: 'Inter', system-ui, -apple-system, sans-serif; letter-spacing: -0.005em; }

:host {
  --voltico-indigo: #3636EA;
  --voltico-space: #1A1A43;
  --voltico-carbon: #202020;
  --voltico-ghost: #F5F6FC;
  --voltico-line: rgba(26, 26, 67, 0.08);
}

[data-component='chat_screen/container'],
[data-component='welcome_screen/container'],
[data-component='sessions_screen/container'] {
  background: var(--voltico-ghost);
}

[data-component='chat_screen/header'],
[data-component='sessions_screen/header'],
[data-component='welcome_screen/header'] {
  background: linear-gradient(180deg, #1A1A43 0%, #14143A 100%);
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}
[data-component='chat_screen/header'] *,
[data-component='sessions_screen/header'] *,
[data-component='welcome_screen/header'] * { color: #fff; }

[data-component='message/bot'] [data-component='message/bubble'],
[data-component='message/agent'] [data-component='message/bubble'] {
  background: #FFFFFF;
  color: var(--voltico-carbon);
  border: 1px solid var(--voltico-line);
  border-radius: 20px 20px 20px 4px;
  box-shadow: 0 1px 2px rgba(26,26,67,0.04);
  padding: 12px 14px;
}

[data-component='message/user'] [data-component='message/bubble'] {
  background: var(--voltico-indigo);
  color: #fff;
  border-radius: 20px 20px 4px 20px;
  box-shadow: 0 6px 16px -6px rgba(54,54,234,0.45);
  padding: 12px 14px;
}

[data-component='chat_screen/footer'],
[data-component='chat_screen/input_container'] {
  background: var(--voltico-ghost);
  padding: 12px 14px 14px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  border-top: 1px solid var(--voltico-line);
}

[data-component='chat_screen/input'] {
  background: #FFFFFF;
  border: 1px solid var(--voltico-line);
  border-radius: 24px;
  padding: 10px 12px 10px 16px;
  min-height: 48px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
  box-shadow: 0 1px 2px rgba(26,26,67,0.04);
}
[data-component='chat_screen/input']:focus-within {
  border-color: var(--voltico-indigo);
  box-shadow: 0 0 0 4px rgba(54,54,234,0.12), 0 1px 2px rgba(26,26,67,0.04);
  outline: none;
}
[data-component='chat_screen/input'] textarea,
[data-component='chat_screen/input'] input {
  background: transparent;
  border: 0;
  outline: 0;
  color: var(--voltico-carbon);
}
[data-component='chat_screen/input'] textarea::placeholder { color: rgba(26,26,67,0.45); }

[data-component='chat_screen/send_button'] {
  background: var(--voltico-indigo);
  color: #fff;
  border-radius: 9999px;
  width: 36px; height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 14px -6px rgba(54,54,234,0.55);
  transition: transform 160ms cubic-bezier(0.22,1,0.36,1), background 160ms ease;
}
[data-component='chat_screen/send_button']:hover { background: #2D2DDB; transform: translateY(-1px); }
[data-component='chat_screen/send_button']:disabled { background: rgba(26,26,67,0.18); box-shadow: none; cursor: not-allowed; }

[data-component='sessions_screen/new_conversation_button'],
button[data-variant='primary'] {
  background: var(--voltico-indigo);
  color: #fff;
  border-radius: 9999px;
  font-weight: 600;
  padding: 12px 18px;
  box-shadow: 0 8px 20px -10px rgba(54,54,234,0.55);
  transition: transform 160ms cubic-bezier(0.22,1,0.36,1), box-shadow 160ms ease, background 160ms ease;
}
[data-component='sessions_screen/new_conversation_button']:hover,
button[data-variant='primary']:hover {
  background: #2D2DDB;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -10px rgba(54,54,234,0.65);
}

[data-component='message/quick_reply'],
[data-component='welcome_screen/prefilled_message'] {
  background: #FFFFFF;
  border: 1px solid var(--voltico-line);
  color: var(--voltico-space);
  border-radius: 9999px;
  font-weight: 500;
  padding: 8px 14px;
  transition: border-color 160ms ease, color 160ms ease;
}
[data-component='message/quick_reply']:hover,
[data-component='welcome_screen/prefilled_message']:hover {
  border-color: var(--voltico-indigo);
  color: var(--voltico-indigo);
}

[data-component='message/timestamp'],
[data-component='message/meta'] {
  color: rgba(26,26,67,0.5);
  font-size: 11px;
}

[data-component='root/widget_trigger'] {
  background:
    radial-gradient(circle at 28% 20%, rgba(255,255,255,0.28), transparent 55%),
    linear-gradient(135deg, #5A5AF0 0%, #3636EA 50%, #2424C8 100%);
  border-radius: 22px;
  box-shadow:
    0 14px 32px -10px rgba(54,54,234,0.55),
    0 0 0 0 rgba(54,54,234,0.30),
    inset 0 1px 0 0 rgba(255,255,255,0.28),
    inset 0 -1px 0 0 rgba(0,0,0,0.18);
  transition:
    box-shadow 280ms cubic-bezier(0.22,1,0.36,1),
    transform 280ms cubic-bezier(0.22,1,0.36,1),
    filter 200ms ease;
}
[data-component='root/widget_trigger']:hover {
  transform: translateY(-2px) scale(1.03);
  filter: brightness(1.06) saturate(1.05);
  box-shadow:
    0 20px 44px -10px rgba(54,54,234,0.70),
    0 0 0 6px rgba(54,54,234,0.12),
    inset 0 1px 0 0 rgba(255,255,255,0.32),
    inset 0 -1px 0 0 rgba(0,0,0,0.18);
}
[data-component='root/widget_trigger']:active {
  transform: translateY(0) scale(0.97);
  transition-duration: 120ms;
}
[data-component='root/widget_trigger'] img,
[data-component='root/widget_trigger'] svg { transition: transform 280ms cubic-bezier(0.22,1,0.36,1); }
[data-component='root/widget_trigger']:hover img,
[data-component='root/widget_trigger']:hover svg { transform: scale(1.06); }

@keyframes voltico-ambient-pulse {
  0%, 100% { box-shadow:
    0 14px 32px -10px rgba(54,54,234,0.55),
    0 0 0 0 rgba(54,54,234,0.22),
    inset 0 1px 0 0 rgba(255,255,255,0.28),
    inset 0 -1px 0 0 rgba(0,0,0,0.18); }
  50% { box-shadow:
    0 14px 32px -10px rgba(54,54,234,0.55),
    0 0 0 12px rgba(54,54,234,0),
    inset 0 1px 0 0 rgba(255,255,255,0.28),
    inset 0 -1px 0 0 rgba(0,0,0,0.18); }
}
[data-component='root/widget_trigger']:not(:hover):not(:active) {
  animation: voltico-ambient-pulse 3.6s ease-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  [data-component='root/widget_trigger'],
  [data-component='root/widget_trigger']:not(:hover):not(:active) {
    animation: none !important;
    transition: box-shadow 200ms ease, background-color 200ms ease;
  }
  [data-component='root/widget_trigger']:hover { transform: none; }
}

[data-component='message/bot'] img,
[data-component='message/agent'] img {
  border-radius: 12px;
  box-shadow: 0 2px 8px -2px rgba(54,54,234,0.35), 0 0 0 1px rgba(26,26,67,0.06);
  background: transparent;
}

[data-component='welcome_screen/container'] {
  background:
    radial-gradient(circle at 90% -10%, rgba(54,54,234,0.10), transparent 55%),
    radial-gradient(circle at -10% 110%, rgba(54,54,234,0.08), transparent 50%),
    var(--voltico-ghost);
}
[data-component='welcome_screen/title'] {
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--voltico-carbon);
}
`;

export function VolticoWidget() {
  const options: WidgetOptions = {
    token: "b4959ed37d63c606433cea865866c3de",
    language: "en",
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
        title: "Hi, we're Voltico.",
        description:
          "Questions about earnings, charging data, or onboarding — ask away.",
      },
      chatScreen: { headerTitle: "Voltico Support" },
    },
    initialMessages: [
      "Hi — how can we help with your charging stations today?",
    ],
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
      externalId: `demo_${typeof window !== "undefined" ? (window.crypto?.randomUUID?.() ?? "anon") : "anon"}`,
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

  return <Widget options={options} />;
}
