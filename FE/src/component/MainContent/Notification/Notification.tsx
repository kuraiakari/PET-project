import React, { useEffect, useMemo, useCallback, useState, useRef, memo } from 'react'
import { notification } from 'antd'
import { useSelector } from 'react-redux'

import avatarError from './avatar.webp'
import './notification.css'
// import usePostData from '../../utils/hooks/usePostData'
interface data {
  idNotification: any
  avataClientBuy: any
  messageClientBuy: any
  dateBuy: Date | undefined
  setAvataClientBuy: any
  setMessageClientBuy: any
  setQuantityBuyNotSeen: any
}
const Context = React.createContext({ name: 'Default' })
// Lưu ý người dùng bấm vào thông báo để biểu đạt đã xem. rồi thực hiện 1 hành động khác nhanh chóng có thể hiến hành động postdata bị hủy bỏ
// làm biến wasseen không bị thay đổi. và đánh dấu là chưa xem.
// Fix : Khi người dùng click vào thông báo thực hiện luôn post không cần chờ 3s
const NotifierGenerator = ({
  idNotification,
  avataClientBuy,
  messageClientBuy,
  dateBuy = new Date(),
  setAvataClientBuy,
  setMessageClientBuy,
  setQuantityBuyNotSeen
}: data) => {
  const idUser = useSelector((state: any) => state.user.idUser)
  const [api, contextHolder] = notification.useNotification()
  const [wasSeen, setWasSeen] = useState(false)
  const wasSeenRef = useRef(wasSeen)
  wasSeenRef.current = wasSeen
  const openNotification = useCallback(
    (placement: 'bottomRight') => {
      const date = new Date(dateBuy)
      api.open({
        message: `Notification buy`,
        description: (
          <Context.Consumer>
            {() => (
              <div
                className='d-flex'
                onClick={() => {
                  setWasSeen(true)
                  //click will count as wasseen notification
                  setQuantityBuyNotSeen((prev: number) => prev - 1)
                }}
                aria-hidden='true'
              >
                <img
                  src={'http://localhost:3000/' + avataClientBuy}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = avatarError
                  }}
                  alt='avatarUser'
                  className='avatarUserBuy'
                />
                <div className='d-flex flex-column titleMessageUserBuy'>
                  <div className='messageUserBuy kumbhSans'>{messageClientBuy}</div>
                  <div>
                    {date.getHours() +
                      ':' +
                      date.getMinutes() +
                      ' ' +
                      date.getFullYear() +
                      '/' +
                      date.getMonth() +
                      '/' +
                      date.getDay()}
                  </div>
                </div>
              </div>
            )}
          </Context.Consumer>
        ),
        placement,
        duration: 5
      })
    },
    [api, messageClientBuy, avataClientBuy, dateBuy, setQuantityBuyNotSeen]
  )
  useEffect(() => {
    openNotification('bottomRight')
  }, [openNotification])
  useEffect(() => {
    setTimeout(() => {
      const dataNotification = {
        idNotification,
        wasSeen: wasSeenRef.current,
        messageNotification: {
          avataClientBuy,
          messageClientBuy,
          dateBuy
        }
      }
      fetch('http://localhost:3000/v1/user/updateNotification', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idUser}`
        },
        body: JSON.stringify(dataNotification)
      })
      setAvataClientBuy('')
      setMessageClientBuy('')
    }, 3000)
  }, [messageClientBuy, avataClientBuy, dateBuy, setAvataClientBuy, setMessageClientBuy, idUser, idNotification])
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), [])
  return <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
}
export default memo(NotifierGenerator)
