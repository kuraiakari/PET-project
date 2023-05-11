import React from 'react'
import facebook from './iconFooter/facebook.svg'
import behance from './iconFooter/behance.svg'
import instagram from './iconFooter/instagram.svg'
import pinterest from './iconFooter/pinterest.svg'
import send from './iconFooter/send.svg'

import './Footer.css'
export default function Footer() {
  return (
    <div className='footer'>
      <div className='contentFooter'>
        <div className='col-xl-3'>
          <div>SUPPORT</div>
          <div>RETURNS & EXCHANGES</div>
          <div>PRIVACY POLICY</div>
          <div>TERMS & CONDITIONS</div>
          <div>SHIPPING FAQ</div>
        </div>
        <div className='col-xl-3'>
          <div>COMPANY</div>
          <div>ABOUT US</div>
          <div>INSPIRATION BLOG</div>
          <div>CONTACT US</div>
        </div>
        <div className='col-xl-6'>
          <div>WONDER DELIVERED TO YOUR INBOX.</div>
          <div className='emailFooter'>
            <div>EMAIL ADDRESS</div>
            <img src={send} alt='send' />
          </div>
        </div>
      </div>
      <div className='iconSocialNetwork'>
        <img src={facebook} alt='facebook' />
        <img src={instagram} alt='instagram' />
        <img src={pinterest} alt='pinterest' />
        <img src={behance} alt='behance' />
      </div>
    </div>
  )
}
