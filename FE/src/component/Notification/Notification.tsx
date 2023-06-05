import React, { useEffect, useMemo, useCallback } from 'react'
import { notification } from 'antd'

import avatarError from './avatar.webp'
import './notification.css'
interface data {
  avataClientBuy: any
  messageClientBuy: any
  dateBuy: Date
}
const Context = React.createContext({ name: 'Default' })
export function NotifierGenerator({ avataClientBuy, messageClientBuy, dateBuy = new Date() }: data) {
  const [api, contextHolder] = notification.useNotification()
  const openNotification = useCallback(
    (placement: 'bottomRight') => {
      const date = new Date(dateBuy)
      api.open({
        message: `Notification buy`,
        description: (
          <Context.Consumer>
            {() => (
              <div className='d-flex'>
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
                  <div className='messageUserBuy'>{messageClientBuy}</div>
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
    [api, messageClientBuy, avataClientBuy, dateBuy]
  )
  useEffect(() => {
    openNotification('bottomRight')
  }, [avataClientBuy, messageClientBuy, openNotification])

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), [])
  return <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
}
