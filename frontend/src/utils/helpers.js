export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

export function resolveImageUrl(imageUrl) {
  if (!imageUrl) {
    return 'https://placehold.co/800x600/F2F3F5/0E1116?text=Part'
  }

  const normalized = String(imageUrl).trim()
  if (
    normalized.startsWith('http://') ||
    normalized.startsWith('https://') ||
    normalized.startsWith('/')
  ) {
    return normalized
  }

  return 'https://placehold.co/800x600/F2F3F5/0E1116?text=Part'
}

export function getStockTone(stock) {
  return stock <= 3 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
}

export function dedupeParts(parts) {
  const seen = new Set()
  return parts.filter((part) => {
    const key = [
      (part.partName || '').trim().toLowerCase(),
      (part.brand || '').trim().toLowerCase(),
      (part.vehicleModel || '').trim().toLowerCase(),
    ].join('|')

    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function readStoredUser() {
  try {
    const rawUser = localStorage.getItem('autopartsHubUser')
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}
