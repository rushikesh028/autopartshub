import { useState, useEffect } from 'react'
import { formatCurrency, resolveImageUrl } from '../utils/helpers'

export default function PartModal({
  part,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  message,
  isError,
}) {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (isOpen) {
      setQuantity(1)
    }
  }, [isOpen, part])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen || !part) return null

  const maxStock = part.stock || 99

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1))
  const handleIncrement = () => setQuantity((q) => Math.min(maxStock, q + 1))
  const handleQuantityChange = (e) => {
    const val = Math.max(1, Math.min(maxStock, Number(e.target.value) || 1))
    setQuantity(val)
  }

  return (
    <div className="fixed inset-0 z-[65]" aria-hidden={!isOpen}>
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div className="relative flex min-h-full items-center justify-center px-5 py-8">
        <section
          className="w-full max-w-4xl overflow-hidden rounded-[10px] border border-black/10 bg-paper shadow-soft"
          role="dialog"
          aria-modal="true"
          aria-labelledby="partModalTitle"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-ink2">
              <img
                src={resolveImageUrl(part.imageUrl)}
                alt={part.partName}
                className="h-full min-h-[280px] w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-display font-600 uppercase tracking-[0.14em] text-accentdeep">
                    {part.sku || `PART-${part.id || 'DEMO'}`}
                  </p>
                  <h2 id="partModalTitle" className="mt-2 font-display text-2xl font-700 tracking-tight">
                    {part.partName}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-ink/60 hover:text-ink"
                  aria-label="Close part detail"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[0.8rem] text-ink/60">
                <span className="rounded-full bg-white px-3 py-1">{part.brand || 'Verified brand'}</span>
                <span className="rounded-full bg-white px-3 py-1">
                  {part.vehicleModel || 'Vehicle fitment on request'}
                </span>
                <span className="rounded-full bg-white px-3 py-1">
                  {part.category?.name || 'General'}
                </span>
              </div>

              <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/65">
                {part.description || 'Fitment-checked spare part ready for dispatch.'}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-[10px] border border-black/8 bg-white p-4">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-wide text-ink/40">Price</p>
                  <p className="mt-1 font-display text-2xl font-700">{formatCurrency(part.price)}</p>
                </div>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-wide text-ink/40">Availability</p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-emerald-700">
                    {part.stock || 0} in stock
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-[0.9rem] font-medium text-ink/70">Quantity</span>
                <div className="inline-flex items-center overflow-hidden rounded-[8px] border border-black/10 bg-white">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="px-3 py-2 text-lg leading-none text-ink/70 hover:bg-paper"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={maxStock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 border-x border-black/10 bg-white px-2 py-2 text-center text-[0.95rem] font-semibold text-ink"
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="px-3 py-2 text-lg leading-none text-ink/70 hover:bg-paper"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(quantity)}
                  className="rounded-[8px] bg-accentdeep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accentdark"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => onBuyNow(quantity)}
                  className="rounded-[8px] border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
                >
                  Buy now
                </button>
              </div>

              {message && (
                <div
                  className={`mt-4 rounded-[8px] px-4 py-3 text-sm font-medium ${
                    isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
