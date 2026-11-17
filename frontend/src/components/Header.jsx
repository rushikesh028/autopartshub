import { useState } from 'react'

export default function Header({
  currentUser,
  cartItemCount,
  onOpenCart,
  onOpenAuth,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      id="siteHeader"
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-paper/90 backdrop-blur-md transition-shadow"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-accentdeep" />
          <span className="font-display text-[1.05rem] font-700 tracking-tight sm:text-lg">
            AUTOPARTS<span className="text-accentdeep">HUB</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[0.93rem] font-medium text-ink/70 md:flex">
          <a href="#catalog" className="transition-colors hover:text-ink">
            Catalog
          </a>
          <a href="#workflow" className="transition-colors hover:text-ink">
            How it works
          </a>
          <a href="#contact" className="transition-colors hover:text-ink">
            Contact
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 rounded-[6px] border border-black/10 bg-white px-3 py-2 text-[0.93rem] font-semibold text-ink/80 transition-colors hover:text-ink"
          >
            <span>Cart</span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-ink px-2 py-0.5 text-[0.72rem] text-white">
              {cartItemCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="px-3 py-2 text-[0.93rem] font-semibold text-ink/80 transition-colors hover:text-ink"
          >
            {currentUser ? currentUser.name : 'Sign in'}
          </button>
          <a
            href="#catalog"
            className="rounded-[6px] bg-accentdeep px-4 py-2.5 text-[0.93rem] font-semibold text-white shadow-sm transition-colors hover:bg-accentdark"
          >
            Browse catalog
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="p-2 text-ink md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-paper px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1 text-[0.97rem] font-medium">
            <a href="#catalog" className="border-b border-black/5 py-2.5" onClick={closeMobile}>
              Catalog
            </a>
            <a href="#workflow" className="border-b border-black/5 py-2.5" onClick={closeMobile}>
              How it works
            </a>
            <a href="#contact" className="border-b border-black/5 py-2.5" onClick={closeMobile}>
              Contact
            </a>
            <button
              type="button"
              className="border-b border-black/5 py-2.5 text-left"
              onClick={() => {
                closeMobile()
                onOpenCart()
              }}
            >
              Cart ({cartItemCount})
            </button>
            <button
              type="button"
              className="py-2.5 text-left"
              onClick={() => {
                closeMobile()
                onOpenAuth('login')
              }}
            >
              {currentUser ? `Account: ${currentUser.name}` : 'Sign in'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
