import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Workflow from './components/Workflow'
import Catalog from './components/Catalog'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import PartModal from './components/PartModal'
import CartDrawer from './components/CartDrawer'
import AuthModal from './components/AuthModal'
import { demoCatalog } from './data/demoCatalog'
import { apiRequest } from './utils/api'
import { dedupeParts, readStoredUser } from './utils/helpers'

export default function App() {
  const [parts, setParts] = useState([])
  const [filteredParts, setFilteredParts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [brands, setBrands] = useState([])
  const [statusMessage, setStatusMessage] = useState('Loading inventory...')
  const [statusIsError, setStatusIsError] = useState(false)

  const [currentUser, setCurrentUser] = useState(readStoredUser)
  const [cart, setCart] = useState({ cartItems: [] })

  const [selectedPart, setSelectedPart] = useState(null)
  const [partModalOpen, setPartModalOpen] = useState(false)
  const [partMessage, setPartMessage] = useState('')
  const [partMessageError, setPartMessageError] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)
  const [cartNotice, setCartNotice] = useState('')
  const [cartNoticeError, setCartNoticeError] = useState(false)

  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [authEmail, setAuthEmail] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [authMessageError, setAuthMessageError] = useState(false)

  // Body scroll lock when overlays are open
  useEffect(() => {
    const hasOverlay = partModalOpen || cartOpen || authOpen
    document.body.classList.toggle('overflow-hidden', hasOverlay)
  }, [partModalOpen, cartOpen, authOpen])

  // Header shadow on scroll
  useEffect(() => {
    const header = document.getElementById('siteHeader')
    if (!header) return
    const onScroll = () => {
      header.classList.toggle('shadow-sm', window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const applyFilters = useCallback(
    (allParts, query, brand) => {
      const q = query.trim().toLowerCase()
      return allParts.filter((part) => {
        const matchesQuery =
          !q ||
          part.partName.toLowerCase().includes(q) ||
          (part.vehicleModel || '').toLowerCase().includes(q) ||
          (part.brand || '').toLowerCase().includes(q)
        const matchesBrand = brand === 'all' || part.brand === brand
        return matchesQuery && matchesBrand
      })
    },
    []
  )

  const loadCatalog = useCallback(async () => {
    setStatusMessage('Loading inventory...')
    setStatusIsError(false)
    try {
      const data = await apiRequest('/api/parts')
      if (Array.isArray(data) && data.length) {
        const cleaned = dedupeParts(data).map((part, index) => ({
          ...part,
          sku: `PART-${String(part.id || index + 1).padStart(4, '0')}`,
        }))
        setParts(cleaned)
        setStatusMessage('')
      } else {
        setParts(demoCatalog)
        setStatusMessage('Showing demo inventory because no backend parts exist yet.')
      }
    } catch {
      setParts(demoCatalog)
      setStatusMessage('The API catalog is unavailable, so demo parts are shown for the storefront preview.')
      setStatusIsError(true)
    }
  }, [])

  const loadCart = useCallback(async () => {
    if (!currentUser) {
      setCart({ cartItems: [] })
      return
    }
    try {
      const data = await apiRequest(`/api/cart/${currentUser.id}`)
      setCart(data)
    } catch (error) {
      if (error.status === 404) {
        setCart({ cartItems: [] })
      } else {
        setCartNotice(error.message)
        setCartNoticeError(true)
      }
    }
  }, [currentUser])

  useEffect(() => {
    loadCatalog()
  }, [loadCatalog])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  useEffect(() => {
    const uniqueBrands = [...new Set(parts.map((p) => p.brand).filter(Boolean))].sort()
    setBrands(uniqueBrands)
  }, [parts])

  useEffect(() => {
    setFilteredParts(applyFilters(parts, searchQuery, selectedBrand))
  }, [parts, searchQuery, selectedBrand, applyFilters])

  const cartItemCount = (cart?.cartItems || []).reduce((sum, item) => sum + (item.quantity || 0), 0)

  const openAuth = (mode = 'login', email = '') => {
    setAuthMode(mode)
    setAuthEmail(email)
    setAuthMessage('')
    setAuthMessageError(false)
    setAuthOpen(true)
  }

  const closeAuth = () => {
    setAuthOpen(false)
    setAuthMessage('')
  }

  const openPart = (part) => {
    setSelectedPart(part)
    setPartMessage('')
    setPartMessageError(false)
    setPartModalOpen(true)
  }

  const closePart = () => {
    setPartModalOpen(false)
    setPartMessage('')
  }

  const openCart = () => {
    setCartNotice('')
    setCartOpen(true)
  }

  const closeCart = () => {
    setCartOpen(false)
  }

  const requireSignedIn = (actionLabel) => {
    if (currentUser) return true
    openAuth('login')
    setAuthMessage(`Sign in to ${actionLabel}.`)
    setAuthMessageError(true)
    return false
  }

  const handleAddToCart = async (quantity, openCartAfter = false) => {
    if (!selectedPart) return
    if (!requireSignedIn('add parts to the cart')) return
    if (!selectedPart.id) {
      setPartMessage('Demo parts cannot be checked out until they exist in backend inventory.')
      setPartMessageError(true)
      return
    }

    try {
      await apiRequest('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          userId: currentUser.id,
          sparePartId: selectedPart.id,
          quantity: Math.max(1, quantity),
        }),
      })
      setPartMessage(`${selectedPart.partName} added to cart.`)
      setPartMessageError(false)
      await loadCart()
      if (openCartAfter) {
        closePart()
        openCart()
      }
    } catch (error) {
      setPartMessage(error.message)
      setPartMessageError(true)
    }
  }

  const handleRemoveCartItem = async (cartItemId) => {
    try {
      await apiRequest(`/api/cart/remove/${cartItemId}`, { method: 'DELETE' })
      setCartNotice('Item removed from cart.')
      setCartNoticeError(false)
      await loadCart()
    } catch (error) {
      setCartNotice(error.message)
      setCartNoticeError(true)
    }
  }

  const handleCheckout = async () => {
    if (!requireSignedIn('checkout')) return
    const items = cart?.cartItems || []
    if (!items.length) {
      setCartNotice('Add at least one part before checkout.')
      setCartNoticeError(true)
      return
    }

    try {
      const order = await apiRequest(`/api/orders/checkout/${currentUser.id}`, { method: 'POST' })
      setCartNotice(`Order #${order.id} placed successfully.`)
      setCartNoticeError(false)
      await Promise.all([loadCart(), loadCatalog()])
    } catch (error) {
      setCartNotice(error.message)
      setCartNoticeError(true)
    }
  }

  const handleLogin = async ({ email, password }) => {
    setAuthMessage('')
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      if (response.token) {
        localStorage.setItem('autopartsHubToken', response.token)
      }
      if (response.user) {
        localStorage.setItem('autopartsHubUser', JSON.stringify(response.user))
        setCurrentUser(response.user)
      }
      setAuthMessage(response.message || 'Signed in successfully.')
      setAuthMessageError(false)
      setTimeout(closeAuth, 500)
    } catch (error) {
      setAuthMessage(error.message)
      setAuthMessageError(true)
    }
  }

  const handleRegister = async ({ name, email, password }) => {
    setAuthMessage('')
    try {
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      })
      if (response.token) {
        localStorage.setItem('autopartsHubToken', response.token)
      }
      if (response.user) {
        localStorage.setItem('autopartsHubUser', JSON.stringify(response.user))
        setCurrentUser(response.user)
      }
      setAuthMessage(response.message || 'Account created successfully.')
      setAuthMessageError(false)
      setTimeout(closeAuth, 500)
    } catch (error) {
      setAuthMessage(error.message)
      setAuthMessageError(true)
    }
  }

  return (
    <div className="bg-paper text-ink antialiased">
      <Header
        currentUser={currentUser}
        cartItemCount={cartItemCount}
        onOpenCart={openCart}
        onOpenAuth={openAuth}
      />

      <main id="top">
        <Hero onOpenAuth={openAuth} />
        <Workflow />
        <Catalog
          parts={parts}
          filteredParts={filteredParts}
          statusMessage={statusMessage}
          statusIsError={statusIsError}
          searchQuery={searchQuery}
          selectedBrand={selectedBrand}
          brands={brands}
          onSearchChange={setSearchQuery}
          onBrandChange={setSelectedBrand}
          onOpenPart={openPart}
          onOpenCart={openCart}
        />
        <CtaSection onOpenAuth={openAuth} />
      </main>

      <Footer onOpenCart={openCart} onOpenAuth={openAuth} />

      <PartModal
        part={selectedPart}
        isOpen={partModalOpen}
        onClose={closePart}
        onAddToCart={(qty) => handleAddToCart(qty, false)}
        onBuyNow={(qty) => handleAddToCart(qty, true)}
        message={partMessage}
        isError={partMessageError}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={closeCart}
        currentUser={currentUser}
        cart={cart}
        notice={cartNotice}
        noticeIsError={cartNoticeError}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        onOpenAuth={openAuth}
      />

      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        email={authEmail}
        onClose={closeAuth}
        onLogin={handleLogin}
        onRegister={handleRegister}
        message={authMessage}
        isError={authMessageError}
      />
    </div>
  )
}
