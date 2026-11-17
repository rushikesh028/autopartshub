import { useEffect, useRef, useState } from 'react'

export default function CtaSection({ onOpenAuth }) {
  const [email, setEmail] = useState('')
  const sectionRef = useRef(null)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onOpenAuth('register', email.trim())
  }

  return (
    <section ref={sectionRef} className="bg-accentdeep py-20 reveal sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl font-700 leading-[1.1] tracking-tight text-white sm:text-[2.6rem]">
          Sign in and finish the order from the same screen.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[1.02rem] text-white/75">
          Use the account modal to log in, then add parts and check out without leaving the
          storefront.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="ctaEmail" className="sr-only">
            Email address
          </label>
          <input
            id="ctaEmail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-[6px] border-0 bg-white px-4 py-3.5 text-ink placeholder:text-ink/40"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-[6px] bg-ink px-6 py-3.5 font-semibold text-white transition-colors hover:bg-ink2"
          >
            Get started
          </button>
        </form>
      </div>
    </section>
  )
}
