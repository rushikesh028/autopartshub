import { useEffect } from 'react'
import { formatCurrency } from '../utils/helpers'

export default function CartDrawer({
  isOpen,
  onClose,
  currentUser,
  cart,
  notice,
  noticeIsError,
  onRemoveItem,
  onCheckout,
  onOpenAuth,
}) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const items = cart?.cartItems || []
  const total = items.reduce(
    (sum, item) => sum + (item.quantity || 0) * ((item.sparePart && item.sparePart.price) || 0),
    0
  )

  return (
    <div className="fixed inset-0 z-[70]" aria-hidden={!isOpen}>
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div className="relative ml-auto flex min-h-full w-full max-w-xl flex-col bg-paper shadow-soft">
        <div className="flex items-start justify-between border-b border-black/8 px-6 py-5">
          <div>
            <p className="text-[0.72rem] font-display font-600 uppercase tracking-[0.14em] text-accentdeep">
              Cart
            </p>
            <h2 className="mt-1 font-display text-2xl font-700 tracking-tight">Review the order</h2>
            <p className="mt-2 text-[0.9rem] text-ink/55">
              {currentUser
                ? `${currentUser.name} (${currentUser.email})`
                : 'Sign in to start adding parts.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-ink/60 hover:text-ink"
            aria-label="Close cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {notice && (
            <div
              className={`mb-4 rounded-[8px] px-4 py-3 text-sm font-medium ${
                noticeIsError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {notice}
            </div>
          )}

          {items.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-black/10 bg-white px-5 py-8 text-[0.95rem] text-ink/55">
              Your cart is empty. Open a part and add the quantity you want to order.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[10px] border border-black/8 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[1rem] font-600">
                        {item.sparePart?.partName}
                      </h3>
                      <p className="mt-1 text-[0.85rem] text-ink/55">
                        {item.sparePart?.brand || 'Verified brand'} | Qty {item.quantity}
                      </p>
                      <p className="mt-3 text-[0.92rem] font-semibold text-ink">
                        {formatCurrency((item.sparePart?.price || 0) * (item.quantity || 0))}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[0.82rem] font-semibold text-accentdeep hover:text-accent"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-black/8 px-6 py-5">
          <div className="mb-4 flex items-center justify-between text-[0.95rem]">
            <span className="text-ink/60">Estimated total</span>
            <span className="font-display text-2xl font-700">{formatCurrency(total)}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {!currentUser && (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="rounded-[8px] border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
              >
                Sign in to continue
              </button>
            )}
            <button
              type="button"
              onClick={onCheckout}
              className={`rounded-[8px] bg-accentdeep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accentdark ${
                !currentUser ? 'sm:col-span-1' : 'sm:col-span-2'
              }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
