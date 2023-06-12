import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector } from 'react-redux'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import './Navbar.css'

//Compontent other
import Modal from '../ModalAccount/ModalAccount'
import NotifierGenerator from '../../MainContent/Notification/Notification'
import { Brand, Cart, InformationUser, Notification, Search, SignIn, SignUp } from './itemsNavbar'
import { useNavigate } from 'react-router-dom'

//type
export interface typeModal {
  stateModal: boolean
  content: string
}
function NavbarPage() {
  const navigate = useNavigate()

  //variable Websocket
  const WS_URL = 'ws://localhost:8002'
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.')
    }
  })

  //valiable Notification
  const [idNotification, setIdNotification] = useState('')
  const [avataClientBuy, setAvataClientBuy] = useState('')
  const [messageClientBuy, setMessageClientBuy] = useState('')
  const [dateBuy, setDateBuy] = useState<Date>()
  const [quantityBuyNotSeen, setQuantityBuyNotSeen] = useState(0)

  //state modal account and content in modal
  const [modal, setModal] = useState<typeModal>({
    stateModal: false,
    content: ''
  })

  //value of box search input
  const valueSearch = useRef<HTMLInputElement>(null)

  //get information user
  const accessToken = useSelector((state: any) => state.user.accessToken)
  const idUser = useSelector((state: any) => state.user.id)
  const isAdmin = useSelector((state: any) => state.user.isAdmin)

  useEffect(() => {
    if (lastMessage) {
      const content = lastMessage.data.split('].[')
      setAvataClientBuy(content[0])
      setMessageClientBuy(content[1])
      setDateBuy(content[2])
      setQuantityBuyNotSeen(content[3])
      setIdNotification(content[4])
    }
  }, [lastMessage])

  useEffect(() => {
    if (idUser && idUser !== undefined && isAdmin && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: 'signin',
        content: {
          idUser: idUser
        }
      })
    }
  }, [idUser, sendJsonMessage, readyState, isAdmin])

  //handleNotifications
  const [notification, setNotification] = useState([])
  const [handleToggleNotification, setHandleToggleNotification] = useState(false)
  const clickToggleNotification = useCallback(() => {
    setHandleToggleNotification(!handleToggleNotification)
  }, [handleToggleNotification])
  useEffect(() => {
    if (accessToken && !handleToggleNotification) {
      const fetchData = async () => {
        const json = await fetch('http://localhost:3000/v1/user/getNotifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data = await json.json()
        setQuantityBuyNotSeen(data.quantityNotSeen)
        setNotification(data.listNotification)
      }
      fetchData().catch(console.error)
    }
  }, [accessToken, messageClientBuy, avataClientBuy, dateBuy, idNotification, handleToggleNotification])
  const handleReadAllNotification = async () => {
    setQuantityBuyNotSeen(0)
    await fetch('http://localhost:3000/v1/user/updateAllNotifications', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} fixed='top' className='navBar'>
          <Container fluid>
            <Brand valueSearch={valueSearch} navigate={navigate} />
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Body>
                <Search navigate={navigate} valueSearch={valueSearch} />
                <Nav className='justify-content-end contentNav'>
                  {!accessToken && (
                    <div className='d-flex'>
                      <SignUp setModal={setModal} />
                      <SignIn setModal={setModal} />
                    </div>
                  )}
                  {accessToken && (
                    <>
                      <Cart navigate={navigate} />
                      <Notification
                        notification={notification}
                        quantityBuyNotSeen={quantityBuyNotSeen}
                        clickToggleNotification={clickToggleNotification}
                        handleReadAllNotification={handleReadAllNotification}
                      />
                      <InformationUser navigate={navigate} readyState={readyState} sendJsonMessage={sendJsonMessage} />
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {modal.stateModal && <Modal modal={modal} setModal={setModal} />}
      {avataClientBuy && messageClientBuy && (
        <NotifierGenerator
          idNotification={idNotification}
          avataClientBuy={avataClientBuy}
          messageClientBuy={messageClientBuy}
          dateBuy={dateBuy}
          setAvataClientBuy={setAvataClientBuy}
          setMessageClientBuy={setMessageClientBuy}
          setQuantityBuyNotSeen={setQuantityBuyNotSeen}
        />
      )}
    </>
  )
}

export default NavbarPage
