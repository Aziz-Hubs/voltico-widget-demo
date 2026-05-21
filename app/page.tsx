import { VolticoMark, VolticoWordmark } from "@/components/voltico-mark";
import { VolticoWidget } from "@/components/voltico-widget";

export default function Page() {
  return (
    <>
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 voltico-glow" />
        <div className="absolute inset-0 -z-10 voltico-grid" />

        {/* Nav */}
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 pt-6 flex items-center justify-between">
          <VolticoWordmark />
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[color:var(--color-space)]/80">
            <a className="hover:text-[color:var(--color-carbon)] transition-colors" href="#product">Product</a>
            <a className="hover:text-[color:var(--color-carbon)] transition-colors" href="#how">How it Works</a>
            <a className="hover:text-[color:var(--color-carbon)] transition-colors" href="#use-cases">Use Cases</a>
            <a className="hover:text-[color:var(--color-carbon)] transition-colors" href="#calc">Earnings Calculator</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-[13px] font-medium text-[color:var(--color-space)]/70">
              EN <span className="text-xs">▾</span>
            </div>
            <a href="#contact" className="btn-carbon">Contact us</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-28 text-center relative">
          <div className="flex justify-center mb-8">
            <span className="voltico-badge">
              <span className="dot" />
              <span className="voltico-mark font-semibold">New</span>
              <span className="text-[color:var(--color-space)]/70">·</span>
              <span>Voltico raised $1M funding</span>
            </span>
          </div>

          <h1 className="font-display font-bold tracking-tight text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.02] text-[color:var(--color-carbon)] max-w-4xl mx-auto">
            The Intelligent Way to{" "}
            <span className="voltico-mark">Monetize EV Charging</span>
          </h1>

          <p className="mt-6 text-[17px] sm:text-[18px] leading-relaxed text-[color:var(--color-space)]/65 max-w-2xl mx-auto">
            Voltico automates the entire emission-credit process — turning EV
            charging data into verified monthly income with no manual admin, no
            complexity, and no upfront cost. You can earn up to €200 per MWh
            effortlessly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href="#calc" className="btn-primary">
              Calculate Earning
              <span className="arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7 H11 M11 7 L7 3 M11 7 L7 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href="#demo" className="btn-secondary">Get a Demo</a>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-[12px] font-medium tracking-wider uppercase text-[color:var(--color-space)]/40">
            <span>Trusted across</span>
            <span>Netherlands</span>
            <span className="w-1 h-1 rounded-full bg-[color:var(--color-space)]/20" />
            <span>Germany</span>
            <span className="w-1 h-1 rounded-full bg-[color:var(--color-space)]/20" />
            <span>Denmark</span>
            <span className="w-1 h-1 rounded-full bg-[color:var(--color-space)]/20" />
            <span>Belgium</span>
          </div>
        </section>

        {/* Feature cards */}
        <section id="product" className="max-w-6xl mx-auto px-6 lg:px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="voltico-card p-8 md:col-span-3 flex flex-col lg:flex-row gap-8 lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[12px] uppercase tracking-wider font-semibold text-[color:var(--color-space)]/50">Why Voltico</p>
              <h2 className="mt-3 font-display font-bold text-[32px] sm:text-[40px] leading-tight tracking-tight text-[color:var(--color-carbon)]">
                Built to let others <span className="voltico-mark">grow</span>.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-space)]/65">
                Voltico built the smart infrastructure powering automated EV
                charging monetization. Our platform uses intelligent algorithms
                to turn EV charging data into recurring revenue, providing
                businesses with a simple and fully compliant way to unlock value
                from every kWh charged.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end">
              <div className="text-[12px] font-medium uppercase tracking-wider text-[color:var(--color-space)]/40 mb-3">Current run-rate</div>
              <div className="flex items-end gap-3">
                <span className="font-display font-bold text-[44px] leading-none text-[color:var(--color-carbon)]">$312k</span>
                <span className="text-[13px] font-semibold text-emerald-600 mb-2">↑ 19.6%</span>
              </div>
              <div className="text-[12px] text-[color:var(--color-space)]/50 mt-1">Yearly across 3 markets</div>
            </div>
          </article>

          <article className="voltico-card-indigo p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 90% 10%, rgba(255,255,255,0.18), transparent 50%)" }} />
            <div className="relative">
              <p className="text-[12px] uppercase tracking-wider font-semibold text-white/70">Newsletter</p>
              <h3 className="mt-3 font-display font-bold text-[26px] leading-tight tracking-tight">Stay updated in the loop, once a week.</h3>
              <div className="mt-8 bg-white rounded-full p-1.5 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-3 text-[color:var(--color-space)]/40">
                  <path d="M4 6h16v12H4z M4 6l8 7 8-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <input type="email" placeholder="you@company.com" className="flex-1 bg-transparent text-[14px] text-[color:var(--color-carbon)] placeholder:text-[color:var(--color-space)]/40 outline-none" />
                <button className="bg-[color:var(--color-indigo-bright)] hover:bg-[color:var(--color-indigo-bright-hover)] text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7 H11 M11 7 L7 3 M11 7 L7 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </article>

          <article className="voltico-card-dark p-8 relative overflow-hidden">
            <p className="text-[12px] uppercase tracking-wider font-semibold text-white/60">Products</p>
            <h3 className="mt-3 font-display font-bold text-[26px] leading-tight tracking-tight">Schedule a call with an expert.</h3>
            <p className="mt-4 text-[14px] leading-relaxed text-white/65">
              Talk with our team to get some clarity and guidance on how we can
              help your company earn more with your charging stations.
            </p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-white/85 transition-colors">
              Book a call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7 H11 M11 7 L7 3 M11 7 L7 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>

          <article className="voltico-card p-8 relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, rgba(54,54,234,0.12), rgba(54,54,234,0.04))" }}>
              <VolticoMark size={22} />
            </div>
            <h3 className="font-display font-bold text-[20px] tracking-tight text-[color:var(--color-carbon)]">Fully automated</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--color-space)]/65">
              Zero manual admin. Voltico ingests charging data, claims the
              credits, and deposits the earnings.
            </p>
          </article>
        </section>

        {/* Big CTA */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24" id="demo">
          <div className="voltico-plate rounded-[32px] p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="relative">
              <h2 className="font-display font-bold text-white text-[32px] sm:text-[44px] leading-[1.05] tracking-tight max-w-2xl mx-auto">
                Earn with every charge.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/70 max-w-xl mx-auto">
                See how much your charging stations could generate. Our team
                pre-fills the calculator with conservative defaults — adjust to
                match your fleet.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="#calc" className="btn-primary">
                  Calculate Earning
                  <span className="arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7 H11 M11 7 L7 3 M11 7 L7 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-[15px] border border-white/15 hover:bg-white/15 transition-colors">
                  Talk to us
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[color:var(--color-line)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <VolticoWordmark />
            <p className="text-[13px] text-[color:var(--color-space)]/50">
              © {new Date().getFullYear()} Voltico — Demo page. Branding for illustration only.
            </p>
            <div className="flex items-center gap-5 text-[13px] text-[color:var(--color-space)]/60">
              <a href="#" className="hover:text-[color:var(--color-carbon)]">Privacy</a>
              <a href="#" className="hover:text-[color:var(--color-carbon)]">Terms</a>
              <a href="#" className="hover:text-[color:var(--color-carbon)]">Contact</a>
            </div>
          </div>
        </footer>
      </main>

      <VolticoWidget />
    </>
  );
}
