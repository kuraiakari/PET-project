import React, { useState, createRef } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import * as Icon from 'react-bootstrap-icons'

import './Navbar.css'
import SignIn from '../noAccount/noAccount'

function NavbarPage() {
  const [isPerson, setIsPerson] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [stateBox, setStateBox] = useState(false) //false is signin, true is signup)
  const activeAccount = createRef()
  const handldeSignIn = () => {
    setStateBox(false)
    setSignIn(!signIn)
  }
  const handldeSignUp = () => {
    setStateBox(true)
    setSignIn(!signIn)
  }
  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand} bg='light' expand={expand} className='mb-3'>
          <Container fluid>
            <Navbar.Brand href='/' className='ms-2'>
              Kurai shop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Body>
                <Form className='d-flex align-items-center flex-grow-1 border rounded-2 border-dark search'>
                  <Icon.Search size={25} className='me-2 ms-4' />
                  <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2 border-0 shadow-none'
                    aria-label='Search'
                  />
                  <div className='lineSearch'></div>
                  <Button className='btnSearch border-0 btn-light' aria-pressed='false'>
                    Search
                  </Button>
                </Form>
                <Nav className='justify-content-end pe-3 contentNav'>
                  <div className='itemNav'>
                    <Icon.House size={25} />
                    <Nav.Link href='/'>Home</Nav.Link>
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
                    <div className='itemNav'>
                      <Icon.Person size={25} />
                      <Nav.Link href='#action2'>Have Account</Nav.Link>
                    </div>
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
      {signIn && <SignIn turnOffSignIn={handldeSignIn} stateBox={stateBox} />}
    </>
  )
}

export default NavbarPage
