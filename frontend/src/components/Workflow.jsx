import { useEffect, useRef } from 'react'

export default function Workflow() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.classList.add('is-visible')
      return
    }

    if (!('IntersectionObserver' in window)) {
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
    <section id="workflow" ref={sectionRef} className="grid-light py-20 reveal sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-[0.78rem] font-display font-600 uppercase tracking-[0.14em] text-accentdeep">
            Store workflow
          </p>
          <h2 className="font-display text-3xl font-700 leading-[1.1] tracking-tight sm:text-[2.4rem]">
            From browsing to order confirmation, all on one page.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-xl font-700 text-ink/15">01</span>
              <span className="rounded-full bg-accentlight/10 px-3 py-1 text-[0.74rem] font-semibold text-accentdeep">
                Catalog
              </span>
            </div>
            <h3 className="font-display text-[1.05rem] font-600">Choose the right part</h3>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-ink/60">
              The listing is no longer decorative. It is driven by inventory and reacts to the
              filters above it.
            </p>
          </article>
          <article className="bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-xl font-700 text-ink/15">02</span>
              <span className="rounded-full bg-accentlight/10 px-3 py-1 text-[0.74rem] font-semibold text-accentdeep">
                Detail
              </span>
            </div>
            <h3 className="font-display text-[1.05rem] font-600">Review fitment and quantity</h3>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-ink/60">
              View Part opens a real detail panel with quantity controls instead of a dead button.
            </p>
          </article>
          <article className="bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-display text-xl font-700 text-ink/15">03</span>
              <span className="rounded-full bg-accentlight/10 px-3 py-1 text-[0.74rem] font-semibold text-accentdeep">
                Checkout
              </span>
            </div>
            <h3 className="font-display text-[1.05rem] font-600">Place the order</h3>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-ink/60">
              The cart drawer totals the order and posts checkout to the backend, reducing stock
              after purchase.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
