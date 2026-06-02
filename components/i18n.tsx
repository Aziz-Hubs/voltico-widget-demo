"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Every language the OpenCX widget's built-in UI supports. EN/NL also have
// fully translated page + custom copy; the rest get localized widget chrome
// and fall back to English for the page/custom strings.
export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "da", label: "Dansk" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
  { code: "fi", label: "Suomi" },
  { code: "pl", label: "Polski" },
  { code: "ro", label: "Română" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

export type Dict = {
  nav: { product: string; how: string; useCases: string; calc: string; contact: string };
  hero: {
    badgeNew: string;
    badgeFunding: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    calcEarning: string;
    getDemo: string;
    trustedAcross: string;
  };
  why: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    runRate: string;
    yearly: string;
  };
  newsletter: { eyebrow: string; title: string; placeholder: string };
  products: { eyebrow: string; title: string; description: string; cta: string };
  automated: { title: string; description: string };
  cta: { title: string; description: string; talk: string };
  footer: { rights: string; privacy: string; terms: string; contact: string };
};

const EN: Dict = {
  nav: { product: "Product", how: "How it Works", useCases: "Use Cases", calc: "Earnings Calculator", contact: "Contact us" },
  hero: {
    badgeNew: "New",
    badgeFunding: "Voltico raised $1M funding",
    titleLead: "The Intelligent Way to ",
    titleAccent: "Monetize EV Charging",
    description:
      "Voltico automates the entire emission-credit process — turning EV charging data into verified monthly income with no manual admin, no complexity, and no upfront cost. You can earn up to €200 per MWh effortlessly.",
    calcEarning: "Calculate Earning",
    getDemo: "Get a Demo",
    trustedAcross: "Trusted across",
  },
  why: {
    eyebrow: "Why Voltico",
    titleLead: "Built to let others ",
    titleAccent: "grow",
    description:
      "Voltico built the smart infrastructure powering automated EV charging monetization. Our platform uses intelligent algorithms to turn EV charging data into recurring revenue, providing businesses with a simple and fully compliant way to unlock value from every kWh charged.",
    runRate: "Current run-rate",
    yearly: "Yearly across 3 markets",
  },
  newsletter: { eyebrow: "Newsletter", title: "Stay updated in the loop, once a week.", placeholder: "you@company.com" },
  products: {
    eyebrow: "Products",
    title: "Schedule a call with an expert.",
    description: "Talk with our team to get some clarity and guidance on how we can help your company earn more with your charging stations.",
    cta: "Book a call",
  },
  automated: { title: "Fully automated", description: "Zero manual admin. Voltico ingests charging data, claims the credits, and deposits the earnings." },
  cta: {
    title: "Earn with every charge.",
    description: "See how much your charging stations could generate. Our team pre-fills the calculator with conservative defaults — adjust to match your fleet.",
    talk: "Talk to us",
  },
  footer: { rights: "Voltico — Demo page. Branding for illustration only.", privacy: "Privacy", terms: "Terms", contact: "Contact" },
};

const NL: Dict = {
  nav: { product: "Product", how: "Hoe het werkt", useCases: "Toepassingen", calc: "Inkomstencalculator", contact: "Neem contact op" },
  hero: {
    badgeNew: "Nieuw",
    badgeFunding: "Voltico haalde $1M op",
    titleLead: "De slimme manier om ",
    titleAccent: "EV-laden te verzilveren",
    description:
      "Voltico automatiseert het volledige emissiekrediet-proces — en zet laaddata om in geverifieerd maandelijks inkomen, zonder handmatig beheer, zonder complexiteit en zonder kosten vooraf. Je verdient moeiteloos tot €200 per MWh.",
    calcEarning: "Bereken inkomsten",
    getDemo: "Vraag een demo",
    trustedAcross: "Vertrouwd in",
  },
  why: {
    eyebrow: "Waarom Voltico",
    titleLead: "Gebouwd om anderen te laten ",
    titleAccent: "groeien",
    description:
      "Voltico bouwde de slimme infrastructuur achter geautomatiseerde verzilvering van EV-laden. Ons platform gebruikt intelligente algoritmes om laaddata om te zetten in terugkerende inkomsten, en biedt bedrijven een eenvoudige en volledig conforme manier om waarde uit elke geladen kWh te halen.",
    runRate: "Huidig jaartempo",
    yearly: "Jaarlijks in 3 markten",
  },
  newsletter: { eyebrow: "Nieuwsbrief", title: "Blijf op de hoogte, één keer per week.", placeholder: "jij@bedrijf.nl" },
  products: {
    eyebrow: "Producten",
    title: "Plan een gesprek met een expert.",
    description: "Praat met ons team voor duidelijkheid en advies over hoe we je bedrijf meer kunnen laten verdienen met je laadpunten.",
    cta: "Plan een gesprek",
  },
  automated: { title: "Volledig geautomatiseerd", description: "Geen handmatig beheer. Voltico verwerkt laaddata, claimt de kredieten en stort de opbrengsten." },
  cta: {
    title: "Verdien met elke laadbeurt.",
    description: "Bekijk hoeveel je laadpunten kunnen opleveren. Ons team vult de calculator met behoudende standaardwaarden — pas ze aan op jouw situatie.",
    talk: "Neem contact op",
  },
  footer: { rights: "Voltico — Demopagina. Branding alleen ter illustratie.", privacy: "Privacy", terms: "Voorwaarden", contact: "Contact" },
};

// Only EN/NL have full page translations; other languages fall back to English
// copy (their widget chrome is still localized via the `language` field).
const DICTS: Partial<Record<Lang, Dict>> = { en: EN, nl: NL };

type I18nValue = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "voltico-lang";

function isLang(value: string): value is Lang {
  return LANGUAGES.some((l) => l.code === value);
}

function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && isLang(saved)) return saved;
  const code = (navigator.language || "en").slice(0, 2).toLowerCase();
  return isLang(code) ? code : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Resolve the real initial language on the client (avoids hydration mismatch).
  useEffect(() => {
    setLangState(initialLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: DICTS[lang] ?? EN }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={(e) => {
          const next = e.target.value;
          if (isLang(next)) setLang(next);
        }}
        className="appearance-none rounded-full border border-[color:var(--color-line)] bg-white pl-3.5 pr-8 py-1.5 text-[13px] font-medium text-[color:var(--color-space)] hover:border-[color:var(--color-space)]/20 focus:border-[color:var(--color-indigo-bright)] focus:outline-none focus:ring-4 focus:ring-[color:var(--color-indigo-bright)]/12 transition-colors cursor-pointer"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-space)]/50"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
