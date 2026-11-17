import { useEffect, useRef, useState } from 'react'
import { formatCurrency, resolveImageUrl, getStockTone } from '../utils/helpers'

export default function Catalog({
  parts,
  filteredParts,
  statusMessage,
  statusIsError,
  onSearchChange,
  onBrandChange,
  searchQuery,
  selectedBrand,
  brands,
  onOpenPart,
  onOpenCart,
}) {
  const sectionRef = useRef(null)
  const totalStock = filteredParts.reduce((sum, part) => sum + (part.stock || 0), 0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="catalog" ref={sectionRef} className="bg-white py-24 reveal sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-3 text-[0.78rem] font-display font-600 uppercase tracking-[0.14em] text-accentdeep">
              Stocked now
            </p>
            <h2 className="font-display text-3xl font-700 leading-[1.1] tracking-tight sm:text-[2.5rem]">
              A catalog that behaves like a store, not a mockup.
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 font-semibold text-accentdeep transition-colors hover:text-accent"
          >
            Open cart
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
            <label className="block">
              <span className="sr-only">Search parts</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by part name, brand, or vehicle"
                className="w-full rounded-[8px] border border-black/10 bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink/35"
              />
            </label>
            <label className="block">
              <span className="sr-only">Filter by brand</span>
              <select
                value={selectedBrand}
                onChange={(e) => onBrandChange(e.target.value)}
                className="w-full rounded-[8px] border border-black/10 bg-paper px-4 py-3 text-[0.95rem] text-ink"
              >
                <option value="all">All brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="rounded-[10px] border border-black/8 bg-paper px-4 py-3 text-[0.9rem] text-ink/60">
            {filteredParts.length} parts visible | {totalStock} units available
          </div>
        </div>

        {statusMessage && (
          <div
            className={`mb-6 rounded-[10px] border px-5 py-4 text-[0.95rem] ${
              statusIsError
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-black/8 bg-paper text-ink/60'
            }`}
          >
            {statusMessage}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredParts.map((part, index) => (
            <article
              key={part.sku || part.id || index}
              className="group rounded-[10px] border border-black/8 p-5 transition-all hover:border-accent/40 hover:shadow-soft"
            >
              <div className="mb-5 aspect-[4/3] overflow-hidden rounded-[7px] bg-ink2">
                <img
                  src={resolveImageUrl(part.imageUrl)}
                  alt={part.partName}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-[0.68rem] font-display tracking-wide text-ink/35">
                  {part.sku || `PART-${String(part.id || index + 1).padStart(4, '0')}`}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold ${getStockTone(
                    part.stock || 0
                  )}`}
                >
                  {part.stock || 0} in stock
                </span>
              </div>
              <h3 className="mb-1 font-display text-[1rem] font-600">{part.partName}</h3>
              <p className="mb-4 text-[0.85rem] text-ink/55">
                {part.brand || 'Verified brand'} | Fits {part.vehicleModel || 'multiple vehicles'}
              </p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-[1.15rem] font-700">
                  {formatCurrency(part.price)}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenPart(part)}
                  className="text-[0.85rem] font-semibold text-accentdeep transition-colors group-hover:text-accent"
                >
                  View part
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
