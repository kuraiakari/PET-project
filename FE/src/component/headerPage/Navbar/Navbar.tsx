import React, { useState, useEffect, useRef } from 'react'
import { NavDropdown, Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import './Navbar.css'
import Modal from '../noAccount/noAccount'
import { addIdUser } from '../../../redux/user.reducer'
import { removeAllProduct } from '../../../redux/cart.reducer'
//image
// import logo from './iconNavbar/logo.svg'
import search from './iconNavbar/search.svg'
import home from './iconNavbar/home.svg'
import person from './iconNavbar/person.svg'
import cart from './iconNavbar/cart.svg'
import down from './iconNavbar/down.svg'
function NavbarPage() {
  //handle with Websocket
  const WS_URL = 'ws://localhost:8002'
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.')
    },
    onClose: () => {
      console.log('disconnection')
    }
  })

  useEffect(() => {
    if (lastMessage) console.log(lastMessage?.data)
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
  const idUser = useSelector((state: any) => state.user.idUser)
  const id = useSelector((state: any) => state.user.id)
  const isAdmin = useSelector((state: any) => state.user.isAdmin)
  const dispatch = useDispatch()
  useEffect(() => {
    if (idUser) setIsPerson(true)
    else setIsPerson(false)
  }, [idUser])
  useEffect(() => {
    if (id && id !== undefined && isAdmin && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        idUser: id,
        message: 'hello server'
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
    if (
      location.pathname === '/cart' ||
      location.pathname === '/history' ||
      location.pathname === '/profile' ||
      location.pathname === '/myshop' ||
      location.pathname === '/likes'
    )
      navigate('')
    const data = {
      idUser: '',
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
                          <NavDropdown.Item className='d-flex justify-content-center' onClick={handleMoveProfile}>
                            Personal
                          </NavDropdown.Item>
                          <NavDropdown.Item className='d-flex justify-content-center' onClick={handleMoveHistory}>
                            History
                          </NavDropdown.Item>
                          <NavDropdown.Item className='d-flex justify-content-center' onClick={handleMoveLikes}>
                            Favorite
                          </NavDropdown.Item>
                          {isAdmin && (
                            <NavDropdown.Item className='d-flex justify-content-center' onClick={handleMoveMyShop}>
                              My shop
                            </NavDropdown.Item>
                          )}
                          <NavDropdown.Divider style={{ borderTopColor: '#000' }} />
                          <NavDropdown.Item className='d-flex justify-content-center' onClick={handleSignOut}>
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
    </>
  )
}

export default NavbarPage
