export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const rawBody = await response.text()
  let body = rawBody

  if (rawBody) {
    const looksLikeJson =
      contentType.includes('application/json') ||
      rawBody.trim().startsWith('{') ||
      rawBody.trim().startsWith('[')
    if (looksLikeJson) {
      try {
        body = JSON.parse(rawBody)
      } catch {
        body = rawBody
      }
    }
  }

  if (!response.ok) {
    const message = typeof body === 'string' ? body : body.message || 'Request failed'
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return body
}
