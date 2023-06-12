import { memo } from 'react'
import { NavDropdown } from 'react-bootstrap'

import avatarError from '../../avatar.webp'
import iconNotification from '../../iconNavbar/notification.png'

const Notification = ({
  notification,
  quantityBuyNotSeen,
  clickToggleNotification,
  handleReadAllNotification
}: any) => {
  return (
    <div className='itemNavIsPerson kumbhSans ms-2 notification' onClick={handleReadAllNotification} aria-hidden='true'>
      <NavDropdown
        onToggle={clickToggleNotification}
        title={
          <div className='d-flex'>
            <div className='px-2' style={{ color: '#000' }}>
              {quantityBuyNotSeen}
            </div>
            <img src={iconNotification} alt='notification' style={{ width: '23px', height: '25px' }} />
          </div>
        }
        id='offcanvasNavbarDropdown-expand-xxl'
      >
        {notification &&
          notification
            .slice()
            .reverse()
            .map((value: any, index: any) => {
              if (index <= 4) {
                return (
                  <NavDropdown.Item
                    key={index}
                    className='d-flex Itemnotification'
                    style={{ backgroundColor: `${value.wasSeen ? '#f8f3ed' : '#fff'}` }}
                  >
                    <img
                      src={'http://localhost:3000/' + value.messageNotification.avataClientBuy}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = avatarError
                      }}
                      alt='avatarUser'
                      className='avatarUser'
                    />
                    <div className='kumbhSans messageUserBuy'>{value.messageNotification.messageClientBuy}</div>
                  </NavDropdown.Item>
                )
              }
            })}
      </NavDropdown>
    </div>
  )
}
export default memo(Notification)
