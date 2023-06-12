import React, { useState, useEffect, useRef } from 'react'
import { NavDropdown, Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import './Navbar.css'
import Modal from '../ModalAccount/ModalAccount'
import { addIdUser } from '../../../redux/user.reducer'
import { removeAllProduct } from '../../../redux/cart.reducer'
import NotifierGenerator from '../../MainContent/Notification/Notification'

import avatarError from './avatar.webp'
import search from './iconNavbar/search.svg'
import home from './iconNavbar/home.svg'
import person from './iconNavbar/person.svg'
import cart from './iconNavbar/cart.svg'
import down from './iconNavbar/down.svg'
import iconnotification from './iconNavbar/notification.png'
function NavbarPage() {
  //handle with Websocket
  const WS_URL = 'ws://localhost:8002'
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.')
    }
  })
  const [idNotification, setIdNotification] = useState('')
  const [avataClientBuy, setAvataClientBuy] = useState('')
  const [messageClientBuy, setMessageClientBuy] = useState('')
  const [dateBuy, setDateBuy] = useState<Date>()
  const [quantityBuyNotSeen, setQuantityBuyNotSeen] = useState(0)
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

  const [isPerson, setIsPerson] = useState(false)
  const [modal, setModal] = useState(false)
  const [signIn, setsignIn] = useState(false) //false is signin, true is signup)

  const valueSearch = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  //back to home
  const backToHome = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (valueSearch.current?.value) valueSearch.current.value = ''
    navigate('/')
  }

  //search product
  const handleValueSearch = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (valueSearch.current?.value) {
      navigate(`/products?search=${valueSearch.current?.value}`)
    }
  }

  //get id user
  const accessToken = useSelector((state: any) => state.user.accessToken)
  const id = useSelector((state: any) => state.user.id)
  const isAdmin = useSelector((state: any) => state.user.isAdmin)
  const dispatch = useDispatch()
  useEffect(() => {
    if (accessToken) setIsPerson(true)
    else setIsPerson(false)
  }, [accessToken])
  useEffect(() => {
    if (id && id !== undefined && isAdmin && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: 'signin',
        content: {
          idUser: id
        }
      })
    }
  }, [id, sendJsonMessage, readyState, isAdmin])
  //sign in
  const handldeSignIn = () => {
    setsignIn(false)
    setModal(!modal)
  }
  const handldeSignUp = () => {
    setsignIn(true)
    setModal(!modal)
  }
  //move and handle cart
  const products = useSelector((state: any) => state.order.orderlist)
  const moveCart = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/cart')
  }
  //move profile
  const handleMoveProfile = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/profile')
  }
  //move history
  const handleMoveHistory = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/history')
  }
  const handleMoveLikes = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/likes')
  }
  //move myShop
  const handleMoveMyShop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/myshop')
  }
  //sign out
  const handleSignOut = () => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: 'signout',
        content: {
          idUser: id
        }
      })
    }
    if (
      location.pathname === '/cart' ||
      location.pathname === '/history' ||
      location.pathname === '/profile' ||
      location.pathname === '/myshop' ||
      location.pathname === '/likes'
    )
      navigate('')
    const data = {
      accessToken: '',
      id: '',
      isAdmin: false,
      myShop: '',
      listLikeProduct: []
    }
    // animation kem
    dispatch(addIdUser(data))
    dispatch(removeAllProduct())
    navigate(0)
    localStorage.clear()
  }
  // console.log(isAdmin)
  //handleForcusInput
  const handleFocusInput = () => {
    valueSearch.current?.focus()
  }

  //handleNotifications
  const [notification, setNotification] = useState([])
  const [handleToggleNotification, setHandleToggleNotification] = useState(false)
  // const [firstTime, setFirstTime] = useState(0)
  const clickToggleNotification = () => {
    setHandleToggleNotification(!handleToggleNotification)
  }
  useEffect(() => {
    // console.log(idUser, handleToggleNotification)
    if (accessToken && !handleToggleNotification) {
      // console.log(1)
      const fetchData = async () => {
        const json = await fetch('http://localhost:3000/v1/user/getNotifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data = await json.json()
        // console.log(data)
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
            <Navbar.Brand className='logoPage italiana' onClick={backToHome}>
              LiLies
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Body>
                <Form className='d-flex align-items-center border border-dark search' onSubmit={handleValueSearch}>
                  <div
                    className='d-flex align-items-center flex-grow-1 h-100 mx-16'
                    onClick={handleFocusInput}
                    aria-hidden='true'
                  >
                    <img src={search} alt='search' />
                    <Form.Control
                      ref={valueSearch}
                      type='search'
                      placeholder='Search'
                      className='border-0 shadow-none textSearch kumbhSans'
                      aria-label='Search'
                    />
                  </div>
                  <div className='lineSearch'></div>
                  <Button className='btnSearch border-0 btn-light px-32 kumbhSans' onClick={handleValueSearch}>
                    Search
                  </Button>
                </Form>
                <Nav className='justify-content-end contentNav'>
                  <div className='itemNav kumbhSans'>
                    <Nav.Link style={{ color: '#000' }} onClick={backToHome}>
                      Home
                    </Nav.Link>
                    <img src={home} alt='home' />
                  </div>
                  {!isPerson && (
                    <div className='d-flex'>
                      <div className='itemNav kumbhSans ms-2'>
                        <Nav.Link style={{ color: '#000' }} onClick={handldeSignUp}>
                          Sign up
                        </Nav.Link>
                        <img src={person} alt='person' />
                      </div>
                      <div className='itemNav kumbhSans ms-2'>
                        <Nav.Link style={{ color: '#000' }} onClick={handldeSignIn}>
                          Sign in
                        </Nav.Link>
                        <img src={person} alt='person' />
                      </div>
                    </div>
                  )}
                  {isPerson && (
                    <>
                      <button className='itemNavIsPerson kumbhSans ms-2' onClick={moveCart}>
                        <div className='px-2' style={{ color: '#000' }}>
                          {products.length}
                        </div>
                        <img src={cart} alt='cart' />
                      </button>
                      <div
                        className='itemNavIsPerson kumbhSans ms-2 notification'
                        onClick={handleReadAllNotification}
                        aria-hidden='true'
                      >
                        <NavDropdown
                          onToggle={clickToggleNotification}
                          title={
                            <div className='d-flex'>
                              <div className='px-2' style={{ color: '#000' }}>
                                {quantityBuyNotSeen}
                              </div>
                              <img
                                src={iconnotification}
                                alt='notification'
                                style={{ width: '23px', height: '25px' }}
                              />
                            </div>
                          }
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
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
                                      <div className='kumbhSans messageUserBuy'>
                                        {value.messageNotification.messageClientBuy}
                                      </div>
                                    </NavDropdown.Item>
                                  )
                                }
                              })}
                        </NavDropdown>
                      </div>
                      <div className='itemNavIsPerson kumbhSans ms-2'>
                        <NavDropdown
                          title={
                            <>
                              <img src={down} alt='down' style={{ width: '10px', height: '16px' }} />
                              <span className='kumbhSans px-2' style={{ color: '#000' }}>
                                Account
                              </span>
                              <img src={person} alt='person' />
                            </>
                          }
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                          <NavDropdown.Item
                            className='d-flex justify-content-center itemInDropDown'
                            onClick={handleMoveProfile}
                          >
                            Personal
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            className='d-flex justify-content-center itemInDropDown'
                            onClick={handleMoveHistory}
                          >
                            History
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            className='d-flex justify-content-center itemInDropDown'
                            onClick={handleMoveLikes}
                          >
                            Favorite
                          </NavDropdown.Item>
                          {isAdmin && (
                            <NavDropdown.Item
                              className='d-flex justify-content-center itemInDropDown'
                              onClick={handleMoveMyShop}
                            >
                              My shop
                            </NavDropdown.Item>
                          )}
                          <NavDropdown.Divider style={{ borderTopColor: '#000' }} />
                          <NavDropdown.Item
                            className='d-flex justify-content-center itemInDropDown'
                            onClick={handleSignOut}
                          >
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </>
                  )}
                  {/* <NavDropdown title='Dropdown' id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                    <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {modal && <Modal turnOffSignIn={handldeSignIn} signIn={signIn} />}
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
