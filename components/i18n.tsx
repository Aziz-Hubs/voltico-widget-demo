"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "en" | "nl";

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

const DICTS: Record<Lang, Dict> = { en: EN, nl: NL };

type I18nValue = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "voltico-lang";

function initialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "nl") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("nl") ? "nl" : "en";
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

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: DICTS[lang] }), [lang, setLang]);

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
    <div
      className="inline-flex items-center rounded-full border border-[color:var(--color-line)] bg-white p-0.5 text-[12px] font-semibold"
      role="group"
      aria-label="Language"
    >
      {(["en", "nl"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={
            "px-3 py-1 rounded-full transition-colors " +
            (lang === l
              ? "bg-[color:var(--color-indigo-bright)] text-white"
              : "text-[color:var(--color-space)]/70 hover:text-[color:var(--color-carbon)]")
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
