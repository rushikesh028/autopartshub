import { useState, useEffect } from 'react'

export default function AuthModal({
  isOpen,
  mode: initialMode = 'login',
  email: initialEmail = '',
  onClose,
  onLogin,
  onRegister,
  message,
  isError,
}) {
  const [mode, setMode] = useState(initialMode)
  const [loginEmail, setLoginEmail] = useState(initialEmail)
  const [loginPassword, setLoginPassword] = useState('')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState(initialEmail)
  const [regPassword, setRegPassword] = useState('')

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setLoginEmail(initialEmail)
      setRegEmail(initialEmail)
      setLoginPassword('')
      setRegName('')
      setRegPassword('')
    }
  }, [isOpen, initialMode, initialEmail])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isLogin = mode === 'login'

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    onLogin({ email: loginEmail.trim(), password: loginPassword })
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    onRegister({
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword,
    })
  }

  return (
    <div className="fixed inset-0 z-[60]" aria-hidden={!isOpen}>
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div className="relative flex min-h-full items-center justify-center px-5 py-8">
        <section className="w-full max-w-xl overflow-hidden rounded-[10px] border border-black/10 bg-paper shadow-soft">
          <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
            <div>
              <p className="text-[0.72rem] font-display font-600 uppercase tracking-[0.14em] text-accentdeep">
                Account access
              </p>
              <h2 className="mt-1 font-display text-2xl font-700 tracking-tight">
                {isLogin ? 'Sign in' : 'Create account'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-ink/60 hover:text-ink"
              aria-label="Close auth dialog"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <div className="px-6 pt-5">
            <div className="inline-flex rounded-[6px] border border-black/10 bg-white p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`rounded-[4px] px-4 py-2 text-sm font-semibold ${
                  isLogin ? 'bg-ink text-white' : 'text-ink/65'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`rounded-[4px] px-4 py-2 text-sm font-semibold ${
                  !isLogin ? 'bg-ink text-white' : 'text-ink/65'
                }`}
              >
                Create account
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="loginEmailModal" className="mb-2 block text-sm font-medium text-ink/75">
                    Email
                  </label>
                  <input
                    id="loginEmailModal"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-[6px] border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="loginPasswordModal" className="mb-2 block text-sm font-medium text-ink/75">
                    Password
                  </label>
                  <input
                    id="loginPasswordModal"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-[6px] border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[6px] bg-accentdeep px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accentdark"
                >
                  Sign in
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label htmlFor="registerNameModal" className="mb-2 block text-sm font-medium text-ink/75">
                    Name
                  </label>
                  <input
                    id="registerNameModal"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full rounded-[6px] border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="registerEmailModal" className="mb-2 block text-sm font-medium text-ink/75">
                    Email
                  </label>
                  <input
                    id="registerEmailModal"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full rounded-[6px] border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="registerPasswordModal" className="mb-2 block text-sm font-medium text-ink/75">
                    Password
                  </label>
                  <input
                    id="registerPasswordModal"
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full rounded-[6px] border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35"
                    placeholder="Create password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[6px] bg-accentdeep px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accentdark"
                >
                  Create account
                </button>
              </form>
            )}

            {message && (
              <div
                className={`mt-4 rounded-[6px] px-4 py-3 text-sm font-medium ${
                  isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
