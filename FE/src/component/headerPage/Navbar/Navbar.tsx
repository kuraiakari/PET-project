import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import * as Icon from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import './Navbar.css'
import Modal from '../noAccount/noAccount'
import { addIdUser } from '../../../redux/user.reducer'
import { removeAllProduct } from '../../../redux/cart.reducer'

function NavbarPage() {
  const [isPerson, setIsPerson] = useState(false)
  const [modal, setModal] = useState(false)
  const [signIn, setsignIn] = useState(false) //false is signin, true is signup)

  const nameProduct = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  //get infor user
  // const handleGetData = () => {
  //   fetch('http://localhost:3000/v1/user/profile', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${idUser}`,
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  // }

  //back to home
  const backToHome = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (nameProduct.current?.value) nameProduct.current.value = ''
    navigate('/')
  }

  //search product
  const handleNameProduct = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (nameProduct.current?.value) {
      navigate(`/search?name=${nameProduct.current?.value}`)
    }
  }

  //get id user
  const idUser = useSelector((state: any) => state.user.idUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (idUser) setIsPerson(true)
    else setIsPerson(false)
  }, [idUser])
  
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
  //sign out
  const handleSignOut = () => {
    if (location.pathname === '/cart' || location.pathname === '/history' || location.pathname === '/profile') navigate('')
    const data = ''
    dispatch(addIdUser(data))
    dispatch(removeAllProduct())
  }
  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand} bg='white' expand={expand} fixed='top'>
          <Container fluid>
            <Navbar.Brand className='ms-2 logoPage' onClick={backToHome}>
              Kurai shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Body>
                <Form
                  className='d-flex align-items-center flex-grow-1 border rounded-2 border-dark search ms-5'
                  onSubmit={handleNameProduct}
                >
                  <Icon.Search size={25} className='me-2 ms-4' />
                  <Form.Control
                    ref={nameProduct}
                    type='search'
                    placeholder='Search'
                    className='me-2 border-0 shadow-none'
                    aria-label='Search'
                  />
                  <div className='lineSearch'></div>
                  <Button className='btnSearch border-0 btn-light' onClick={handleNameProduct}>
                    Search
                  </Button>
                </Form>
                <Nav className='justify-content-end pe-3 contentNav'>
                  <div className='itemNav'>
                    <Icon.House size={25} />
                    <Nav.Link onClick={backToHome}>Home</Nav.Link>
                  </div>
                  {!isPerson && (
                    <>
                      <div className='itemNav'>
                        <Icon.Person size={25} />
                        <Nav.Link onClick={handldeSignUp}>Sign up</Nav.Link>
                      </div>
                      <div className='itemNav'>
                        <Icon.Person size={25} />
                        <Nav.Link onClick={handldeSignIn}>Sign in</Nav.Link>
                      </div>
                    </>
                  )}
                  {isPerson && (
                    <>
                      <button className='itemNavIsPerson' onClick={moveCart}>
                        <Icon.Cart size={25} color='#212529'/>
                        <div>{products.length}</div>
                      </button>
                      <div className='itemNavIsPerson'>
                        <NavDropdown
                          title='Have Account'
                          id={`offcanvasNavbarDropdown-expand-${expand}`}
                        >
                          <NavDropdown.Item onClick={handleMoveProfile}>Personal</NavDropdown.Item>
                          <NavDropdown.Item onClick={handleMoveHistory}>History</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={handleSignOut}>Logout</NavDropdown.Item>
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
