export const contentTypeFor = (url: string) =>
  url.endsWith('.css') ? 'text/css' : 'application/javascript'

export const linkElement = (url: string) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  return link
}

export const scriptElement = (url: string) => {
  const script = document.createElement('script')
  script.type = 'application/javascript'
  script.src = url
  script.async = true
  return script
}

export const elementFor = (url: string) =>
  contentTypeFor(url) === 'text/css' ? linkElement(url) : scriptElement(url)

export const elementSelector = (url: string) =>
  contentTypeFor(url) === 'text/css'
    ? `link[href="${url}"]`
    : `script[src="${url}"]`

export const urlFrom = (element: HTMLScriptElement | HTMLLinkElement) =>
  element instanceof HTMLLinkElement ? element.href : element.src

export const getScriptElements = (urls: string[]) =>
  Array.from(
    document.querySelectorAll<HTMLScriptElement | HTMLLinkElement>(
      urls.map(elementSelector).join(','),
    ),
  )
