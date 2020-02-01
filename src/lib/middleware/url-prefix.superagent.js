/**
 * Superagent url prefixing plugin.
 *
 * @param {string} url
 *
 * @returns {() => import('superagent').Request}
 */
const urlPrefix = (url) => (req) => {
  if (req.url[0] === '/') {
    // Remove leading slashes.
    const pfxUrl = url.replace(/\/+$/, '')
    // Remove trailing slashes.
    const reqUrl = req.url.replace(/^\/+/, '')
    // Replace the url.
    req.url = `${pfxUrl}/${reqUrl}`
  }
  return req
}

export default urlPrefix
