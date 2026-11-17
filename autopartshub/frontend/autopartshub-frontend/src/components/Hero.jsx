export default function Hero({ onOpenAuth }) {
  return (
    <section className="grid-dark overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="text-white">
          <div className="mb-6 inline-flex items-center gap-2 text-[0.78rem] font-display font-600 uppercase tracking-[0.14em] text-accentlight">
            <span className="h-1.5 w-1.5 rounded-full bg-accentlight" />
            Verified fitment and real stock
          </div>

          <h1 className="font-display text-[2.5rem] font-700 leading-[1.06] tracking-tight sm:text-[3.4rem] lg:text-[3.75rem]">
            View the part.
            <br className="hidden sm:block" />
            Buy the part.
          </h1>

          <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-white/65">
            This storefront now behaves like a real buying flow: live inventory, part detail, cart
            review, and checkout from the same screen.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-[6px] bg-accentdeep px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent"
            >
              Browse stocked parts
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="inline-flex items-center gap-2 rounded-[6px] border border-white/20 px-6 py-3.5 font-semibold text-white transition-colors hover:border-white/40"
            >
              Create buyer account
            </button>
          </div>

          <div className="mt-12 grid max-w-[460px] grid-cols-3 border-t border-white/10 pt-7">
            <div className="pr-4">
              <div className="font-display text-2xl font-700 sm:text-[1.8rem]">Live</div>
              <div className="mt-1 text-[0.75rem] uppercase tracking-wide text-white/45">
                Inventory sync
              </div>
            </div>
            <div className="border-l border-white/10 px-4">
              <div className="font-display text-2xl font-700 sm:text-[1.8rem]">Cart</div>
              <div className="mt-1 text-[0.75rem] uppercase tracking-wide text-white/45">
                Add and review
              </div>
            </div>
            <div className="border-l border-white/10 pl-4">
              <div className="font-display text-2xl font-700 sm:text-[1.8rem]">Order</div>
              <div className="mt-1 text-[0.75rem] uppercase tracking-wide text-white/45">
                Checkout flow
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[10px] border border-white/10 bg-ink2/70 p-5 shadow-softdark sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[0.72rem] font-display font-600 uppercase tracking-[0.14em] text-accentlight">
                  Order surface
                </p>
                <h2 className="mt-1 font-display text-2xl font-700 text-white">
                  What the buyer can do now
                </h2>
              </div>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[0.78rem] font-semibold text-emerald-300">
                Ready
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[8px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">1. Search and filter the catalog</p>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-white/60">
                  Search by part name, brand, or vehicle model, then narrow the result set before
                  opening detail.
                </p>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">2. Open &quot;View part&quot;</p>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-white/60">
                  Each stocked item opens in a dedicated detail modal with fitment, price, stock,
                  and quantity controls.
                </p>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">3. Add to cart and checkout</p>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-white/60">
                  The cart drawer loads from the backend and the checkout button places an order
                  through the existing Spring endpoints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
