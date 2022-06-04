import { useEffect, useState } from 'react'
import { elementFor, getScriptElements, urlFrom } from './helpers/html'
import { difference } from './helpers/array'

export interface ExternalScriptsState {
  [url: string]: 'loading' | 'idle' | 'ready' | 'error' | 'unknown'
}

export const useExternalScripts = (urls: string[]) => {
  const [state, setState] = useState(
    urls.reduce<ExternalScriptsState>(
      (s, url) => ({ ...s, [url]: 'loading'}),
      {},
    ),
  )

  const handleEvent = (e: Event) => {
    const element = e.target as HTMLScriptElement | HTMLLinkElement
    setState((prev) => ({
      ...prev,
      [urlFrom(element)]: e.type === 'load' ? 'ready' : 'error',
    }))
  }

  useEffect(() => {
    if (urls.length === 0) {
      setState(() => ({}))
      return
    }

    const existingScriptElements = getScriptElements(urls)
    const existingUrls = existingScriptElements.map(urlFrom)

    // for scripts that already exist, there is no straight-forward way of
    // checking if they are loaded successfully, so set the state as unknown.
    // To implement proper tracking we will need to setup a global script tracker
    const urlsToUpdate = Object.entries(state)
      .filter(
        ([url, s]) =>
          existingUrls.includes(url) && !['unknown', 'ready'].includes(s),
      )
      .map(([url]) => url)
    if (urlsToUpdate.length > 0) {
      setState((prev) =>
        urlsToUpdate.reduce((s, url) => ({ ...s, [url]: 'unknown' }), prev),
      )
    }

    for (const url of difference(urls, existingUrls)) {
      const element = elementFor(url)
      document.body.appendChild(element)
      element.addEventListener('load', handleEvent)
      element.addEventListener('error', handleEvent)
    }

    return () => {
      for (const element of getScriptElements(urls)) {
        element.removeEventListener('load', handleEvent)
        element.removeEventListener('error', handleEvent)
      }
    }
  }, [urls])

  return state
}
