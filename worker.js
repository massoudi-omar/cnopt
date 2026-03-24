export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Try to serve static file first
    let response = await env.ASSETS.fetch(request)

    // If not found → fallback to index.html
    if (response.status === 404) {
      return env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request))
    }

    return response
  }
}