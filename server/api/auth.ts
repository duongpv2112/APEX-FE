import { sendError } from 'h3'

export default defineEventHandler(async (event) => {
  // scaffold minimal auth endpoints: POST /api/auth/login, POST /api/auth/logout, GET /api/auth/session
  const { req, res } = event.node
  const url = event.node.req.url || ''

  if (event.node.req.method === 'POST' && url?.includes('/api/auth/login')) {
    const body = await useBody(event)
    // TODO: validate credentials against real user DB
    if (body.username === 'admin' && body.password === 'password') {
      // set cookie (HTTPOnly) - Nitro/h3 helper
      setCookie(event, 'auth_token', 'fake-jwt-token', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      return { success: true }
    }
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid credentials' }))
  }

  if (event.node.req.method === 'POST' && url?.includes('/api/auth/logout')) {
    // clear cookie
    setCookie(event, 'auth_token', '', { maxAge: 0, path: '/' })
    return { success: true }
  }

  if (event.node.req.method === 'GET' && url?.includes('/api/auth/session')) {
    const token = getCookie(event, 'auth_token')
    if (token) {
      return { authenticated: true }
    }
    return { authenticated: false }
  }

  return sendError(event, createError({ statusCode: 404 }))
})
