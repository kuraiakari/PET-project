import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import './App.css'
const HandleScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  // console.log(visible)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <div
      className='btnBackToTop'
      style={{ display: visible ? 'flex' : 'none' }}
      onClick={scrollToTop}
      aria-hidden='true'
    >
      <Icon.ArrowUp size={25} />
    </div>
  )
}

export default HandleScrollToTop
