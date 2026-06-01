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

[data-component='chat/root'],
[data-component='sessions/root'],
[data-component='chat/main/root'] {
  background: var(--voltico-ghost);
}

[data-component='chat/header'],
[data-component='sessions/header'] {
  background: linear-gradient(180deg, #1A1A43 0%, #14143A 100%);
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
[data-component='chat/header'] *,
[data-component='sessions/header'] * { color: #fff; }

[data-component='chat/agent_msg/msg'] {
  background: #FFFFFF;
  color: var(--voltico-carbon);
  border: 1px solid var(--voltico-line);
  border-radius: 20px 20px 20px 4px;
  box-shadow: 0 1px 2px rgba(26,26,67,0.04);
  padding: 12px 14px;
}

[data-component='chat/user_msg/msg'] {
  background: var(--voltico-indigo);
  color: #fff;
  border-radius: 20px 20px 4px 20px;
  box-shadow: 0 6px 16px -6px rgba(54,54,234,0.45);
  padding: 12px 14px;
}

[data-component='chat/input_box/root'] {
  background: var(--voltico-ghost);
  padding: 12px 14px 14px;
  border-top: 1px solid var(--voltico-line);
}

[data-component='chat/input_box/inner_root'] {
  background: #FFFFFF;
  border: 1px solid var(--voltico-line);
  border-radius: 24px;
  padding: 6px 6px 6px 16px;
  min-height: 48px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
  box-shadow: 0 1px 2px rgba(26,26,67,0.04);
}
[data-component='chat/input_box/inner_root']:focus-within {
  border-color: var(--voltico-indigo);
  box-shadow: 0 0 0 4px rgba(54,54,234,0.12), 0 1px 2px rgba(26,26,67,0.04);
  outline: none;
}
[data-component='chat/input_box/textarea'] {
  background: transparent;
  border: 0;
  outline: 0;
  color: var(--voltico-carbon);
}
[data-component='chat/input_box/textarea']::placeholder { color: rgba(26,26,67,0.45); }

[data-component='sessions/new_conversation_btn'],
[data-component='ui_lib/btn'] {
  background: var(--voltico-indigo);
  color: #fff;
  border-radius: 9999px;
  font-weight: 600;
  box-shadow: 0 8px 20px -10px rgba(54,54,234,0.55);
  transition: transform 160ms cubic-bezier(0.22,1,0.36,1), box-shadow 160ms ease, background 160ms ease;
}
[data-component='sessions/new_conversation_btn']:hover,
[data-component='ui_lib/btn']:hover {
  background: #2D2DDB;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -10px rgba(54,54,234,0.65);
}

[data-component='chat/suggested_reply_btn'] {
  background: #FFFFFF;
  border: 1px solid var(--voltico-line);
  color: var(--voltico-space);
  border-radius: 9999px;
  font-weight: 500;
  padding: 8px 14px;
  transition: border-color 160ms ease, color 160ms ease;
}
[data-component='chat/suggested_reply_btn']:hover {
  border-color: var(--voltico-indigo);
  color: var(--voltico-indigo);
}

[data-component='chat/agent_msg_group/avatar_and_msgs/avatar'],
[data-component='chat/agent_msg_group/root/avatar'] {
  border-radius: 12px;
  box-shadow: 0 2px 8px -2px rgba(54,54,234,0.35), 0 0 0 1px rgba(26,26,67,0.06);
  background: transparent;
}

/* === Trigger button: glass orb effect, fully contained inside the 60px button
   The widget wraps the trigger in a 64x64 iframe with border-radius:100%, so we
   can't render anything outside the button bounds. All "halo" / "outer color
   bleed" effects are pushed INWARD via radial gradients and inset shadows. === */
[data-component='trigger/btn'] {
  border-radius: 50% !important;  /* match the circular iframe clip */
  background:
    /* Edge halo (the "outer colors blending into the edge" — drawn INSIDE the button) */
    radial-gradient(circle at 50% 50%,
      transparent 0%,
      transparent 72%,
      rgba(245,246,252,0.55) 88%,
      rgba(245,246,252,0.25) 96%,
      rgba(54,54,234,0.10) 100%),
    /* Primary glare (top-left, large, bright) */
    radial-gradient(ellipse 75% 60% at 22% 16%,
      rgba(255,255,255,0.78) 0%,
      rgba(255,255,255,0.20) 24%,
      rgba(255,255,255,0) 52%),
    /* Secondary glare (bottom-right, small, soft) */
    radial-gradient(ellipse 38% 32% at 78% 84%,
      rgba(255,255,255,0.32) 0%,
      rgba(255,255,255,0) 60%),
    /* Glossy top band — iOS wet-sheen */
    linear-gradient(180deg,
      rgba(255,255,255,0.20) 0%,
      rgba(255,255,255,0) 40%),
    /* Edge vignette so center reads richer */
    radial-gradient(circle at 50% 50%,
      rgba(36,36,200,0) 55%,
      rgba(20,20,150,0.32) 100%),
    /* Indigo base */
    linear-gradient(135deg, #5A5AF0 0%, #3636EA 52%, #2424C8 100%);
  /* All inset — outer shadows would be clipped by the iframe */
  box-shadow:
    inset 0 2.5px 1px -0.5px rgba(255,255,255,0.60),   /* top highlight rim */
    inset 2px 0 1.5px -1px rgba(255,255,255,0.22),     /* left rim */
    inset -2px 0 1.5px -1px rgba(255,255,255,0.22),    /* right rim */
    inset 0 -3px 1.5px -0.5px rgba(0,0,0,0.25),        /* bottom inner shadow */
    inset 0 0 0 0.5px rgba(255,255,255,0.18) !important; /* hairline glass edge */
  transition:
    box-shadow 320ms cubic-bezier(0.22,1,0.36,1),
    transform 320ms cubic-bezier(0.22,1,0.36,1),
    filter 220ms ease,
    background-size 800ms cubic-bezier(0.22,1,0.36,1);
}

[data-component='trigger/btn']:hover {
  transform: scale(1.05);
  filter: brightness(1.08) saturate(1.06);
  /* Hover: glares shift toward upper-left, halo intensifies */
  background:
    radial-gradient(circle at 50% 50%,
      transparent 0%,
      transparent 68%,
      rgba(245,246,252,0.70) 86%,
      rgba(245,246,252,0.30) 96%,
      rgba(54,54,234,0.14) 100%),
    radial-gradient(ellipse 80% 65% at 18% 12%,
      rgba(255,255,255,0.88) 0%,
      rgba(255,255,255,0.24) 26%,
      rgba(255,255,255,0) 54%),
    radial-gradient(ellipse 42% 36% at 82% 86%,
      rgba(255,255,255,0.38) 0%,
      rgba(255,255,255,0) 60%),
    linear-gradient(180deg,
      rgba(255,255,255,0.24) 0%,
      rgba(255,255,255,0) 42%),
    radial-gradient(circle at 50% 50%,
      rgba(36,36,200,0) 55%,
      rgba(20,20,150,0.32) 100%),
    linear-gradient(135deg, #5A5AF0 0%, #3636EA 52%, #2424C8 100%);
  box-shadow:
    inset 0 3px 1px -0.5px rgba(255,255,255,0.72),
    inset 2px 0 1.5px -1px rgba(255,255,255,0.28),
    inset -2px 0 1.5px -1px rgba(255,255,255,0.28),
    inset 0 -3px 1.5px -0.5px rgba(0,0,0,0.25),
    inset 0 0 0 0.5px rgba(255,255,255,0.24) !important;
}

[data-component='trigger/btn']:active {
  transform: scale(0.96);
  transition-duration: 140ms;
  box-shadow:
    inset 0 1.5px 1px -0.5px rgba(255,255,255,0.30),
    inset 0 -3px 6px 0 rgba(0,0,0,0.28),
    inset 0 0 0 0.5px rgba(255,255,255,0.12) !important;
}

[data-component='trigger/btn'] img,
[data-component='trigger/btn'] svg {
  position: relative;
  z-index: 1;
  transition: transform 320ms cubic-bezier(0.22,1,0.36,1), filter 320ms ease;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.30)) drop-shadow(0 0 6px rgba(255,255,255,0.18));
}
[data-component='trigger/btn']:hover img,
[data-component='trigger/btn']:hover svg {
  transform: scale(1.04);
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.30)) drop-shadow(0 0 10px rgba(255,255,255,0.28));
}

/* Ambient pulse — animates the edge halo radius, all inside the button */
@keyframes voltico-ambient-pulse {
  0%, 100% {
    background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
  }
  50% {
    background-size: 110% 110%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
  }
}
[data-component='trigger/btn']:not(:hover):not(:active) {
  background-position: center;
  animation: voltico-ambient-pulse 3.8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  [data-component='trigger/btn'],
  [data-component='trigger/btn']:not(:hover):not(:active) {
    animation: none !important;
    transition: box-shadow 200ms ease, background 200ms ease;
  }
  [data-component='trigger/btn']:hover { transform: none; }
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
      "Hi, welcome to Voltico! To point you to the right place, are you a consumer or a business?",
    ],
    initialQuestions: ["Consumer", "Business"],
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
