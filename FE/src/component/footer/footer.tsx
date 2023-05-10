import React from 'react'
import * as Icon from 'react-bootstrap-icons'
export default function Footer() {
  return (
    <div className='footer w-100 pt-5 pb-5' style={{ backgroundColor: '#000' }}>
      <div className='container d-flex justify-content-between' style={{ color: '#fff' }}>
        <div className='col-xl-4 d-flex flex-column align-items-start'>
          <div className='mb-1'>About us</div>
          <div className='mb-1'>Programs</div>
          <div className='mb-1'>Events</div>
          <div className='mb-1'>Blog</div>
          <div className='mb-3'>Join Our Team</div>
          <div>
            <Icon.Facebook size={22} className='me-2' />
            <Icon.Instagram size={22} className='me-2' />
            <Icon.Twitter size={22} />
          </div>
        </div>
        <div className='col-xl-4 d-flex flex-column align-items-end'>
          <div className='mb-3 d-flex align-items-center'>
            Send Us A Message
            <Icon.ArrowRight className='ms-2' />
          </div>
          <div className='mb-4'>(963)-243-5510</div>
          <div className='mb-4'>Vyazemsky Ln, 5/7, St Petersburg, 197022</div>
          <div>
            <h3>Kurai shop</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
