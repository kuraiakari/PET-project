import React from 'react'
import { useMatches } from 'react-router-dom'

export default function Breadcrumds() {
  const matches = useMatches()
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => match.handle.crumb(match.data))

  const breadcrumbs = crumbs.map((crumb, ind) => {
    const notLast = ind < crumbs.length - 1
    if (notLast) {
      return (
        <div key={ind}>
          <span className='name'>{crumb}</span>
          <span className='arrow'>&gt;</span>
        </div>
      )
    } else {
      return (
        <span key={ind} className='name'>
          {crumb}
        </span>
      )
    }
  })

  return <div>{breadcrumbs}</div>
}
