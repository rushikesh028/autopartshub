export default function Footer({ onOpenCart, onOpenAuth }) {
  return (
    <footer id="contact" className="border-t border-black/8 bg-paper pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-accentdeep" />
              <span className="font-display text-[1.05rem] font-700 tracking-tight">
                AUTOPARTS<span className="text-accentdeep">HUB</span>
              </span>
            </div>
            <p className="max-w-xs text-[0.92rem] leading-relaxed text-ink/55">
              Genuine and aftermarket spare parts, catalogued and checked before order placement.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[0.88rem] text-ink/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              support@autopartshub.in
            </div>
            <div className="mt-2 flex items-center gap-2 text-[0.88rem] text-ink/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Mumbai, Maharashtra
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-[0.85rem] font-600 uppercase tracking-wide text-ink/40">
              Store
            </h4>
            <ul className="space-y-3 text-[0.92rem] text-ink/65">
              <li>
                <a href="#catalog" className="transition-colors hover:text-accentdeep">
                  Catalog
                </a>
              </li>
              <li>
                <a href="#workflow" className="transition-colors hover:text-accentdeep">
                  Buyer flow
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="transition-colors hover:text-accentdeep"
                >
                  Sign in
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-[0.85rem] font-600 uppercase tracking-wide text-ink/40">
              Ordering
            </h4>
            <ul className="space-y-3 text-[0.92rem] text-ink/65">
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="transition-colors hover:text-accentdeep"
                >
                  Open cart
                </button>
              </li>
              <li>
                <a href="#catalog" className="transition-colors hover:text-accentdeep">
                  Stocked parts
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-accentdeep">
                  Help center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-[0.85rem] font-600 uppercase tracking-wide text-ink/40">
              Support
            </h4>
            <ul className="space-y-3 text-[0.92rem] text-ink/65">
              <li>
                <a href="#contact" className="transition-colors hover:text-accentdeep">
                  Fitment guarantee
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-accentdeep">
                  Returns
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-accentdeep">
                  Dispatch support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-black/8 pt-7 sm:flex-row">
          <p className="text-[0.82rem] text-ink/45">
            (c) 2026 AutoPartsHub. Orders remain subject to fitment verification.
          </p>
          <div className="flex items-center gap-5 text-[0.82rem] text-ink/45">
            <a href="#" className="transition-colors hover:text-ink/70">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink/70">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
