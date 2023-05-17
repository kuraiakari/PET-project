import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export default function AutoScrollToTop() {
  const { pathname } = useLocation()
  const [query] = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, query])

  return null
}
