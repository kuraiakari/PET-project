import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import * as Icon from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'

import './Navbar.css'
import Modal from '../noAccount/noAccount'
import { addIdUser } from '../../../redux/user.reducer'
import { addNameProduct } from '../../../redux/product.reducer'

function NavbarPage() {
  const [isPerson, setIsPerson] = useState(false)
  const [modal, setModal] = useState(false)
  const [signIn, setsignIn] = useState(false) //false is signin, true is signup)

  const nameProduct = useRef<HTMLInputElement>(null)
  const handleNameProduct = (e: any) => {
    dispatch(addNameProduct(nameProduct.current?.value as string))
    e.preventDefault()
    e.stopPropagation()
  }

  const idUser = useSelector((state: any) => state.user.idUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (idUser) setIsPerson(true)
    else setIsPerson(false)
  }, [idUser])

  const handldeSignIn = () => {
    setsignIn(false)
    setModal(!modal)
  }
  const handldeSignUp = () => {
    setsignIn(true)
    setModal(!modal)
  }
  const handleGetData = () => {
    fetch('http://localhost:3000/v1/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idUser}`,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }
  const handleSignOut = () => {
    const data = ''
    dispatch(addIdUser(data))
  }
  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} fixed='top'>
          <Container fluid>
            <Navbar.Brand href='/#' className='ms-2'>
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
                    <Nav.Link href='/#'>Home</Nav.Link>
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
                      <button className='itemNavIsPerson' onClick={handleGetData}>
                        <Icon.Person size={25} />
                        <Nav.Link href='#action2'>Have Account</Nav.Link>
                      </button>
                      <button className='itemNavIsPerson' onClick={handleSignOut}>
                        <Icon.Person size={25} />
                        <Nav.Link href='#action2'>Logout</Nav.Link>
                      </button>
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
