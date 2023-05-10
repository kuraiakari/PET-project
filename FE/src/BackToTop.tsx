import React, { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import './App.css'
const ScrollButton = () => {
  const [visible, setVisible] = useState(false)
  console.log(visible)
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
    <div className='btnBackToTop' style={{ display: visible ? 'flex' : 'none' }}>
      <Icon.ArrowUp size={25} onClick={scrollToTop} />
    </div>
  )
}

export default ScrollButton
