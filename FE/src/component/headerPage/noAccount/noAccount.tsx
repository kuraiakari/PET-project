import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import { ReadyState } from 'react-use-websocket'
// import * as Icon from 'react-bootstrap-icons'

import './noAccount.css'
import { useDispatch } from 'react-redux'
import { addIdUser } from '../../../redux/user.reducer'

function Modal({ turnOffSignIn, signIn }: any) {
  const [stateBox, setStateBox] = useState(signIn)
  const [messErrorServer, setMessErrorServer] = useState('')
  const [messSucces, setMessSucces] = useState('')
  const dispatch = useDispatch()

  //Signin
  const emailLogin = useRef<HTMLInputElement>(null)
  const [messErrorEmail, setMessErrorEmail] = useState('')
  const passwordLogin = useRef<HTMLInputElement>(null)
  const [messErrorPassword, setMessErrorPassword] = useState('')

  //Signup
  const emailSignUp = useRef<HTMLInputElement>(null)
  const passwordSignUp = useRef<HTMLInputElement>(null)
  const confirmPasswordSignUp = useRef<HTMLInputElement>(null)
  const [messErrorConfirmPassword, setMessErrorConfirmPassword] = useState('')

  const handleSigin = (e: any) => {
    if (e.target.closest('.iconBoxLogin')) {
      turnOffSignIn()
      return
    }
    if (!e.target.closest('.boxLogin')) turnOffSignIn()
  }
  const handleSubmit = (e: any) => {
    //handleSignIn
    if (!stateBox) {
      if (!emailLogin.current?.value) {
        setMessErrorEmail('Invalid email')
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (!passwordLogin.current?.value) {
        setMessErrorPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
        return
      }
      const dataUser = {
        email: emailLogin.current?.value,
        password: passwordLogin.current.value
      }
      fetch('http://localhost:3000/v1/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(dataUser)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            const inforUser = {
              idUser: data.token,
              id: data.id,
              isAdmin: data.isAdmin,
              myShop: data.myShop,
              listLikeProduct: data.listLikeProduct
            }
            // if (data.isAdmin && readyState === ReadyState.OPEN) {
            //   sendJsonMessage({
            //     idUser: data.id,
            //     message: 'hello server'
            //   })
            // }

            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            localStorage.setItem('isAdmin', data.isAdmin)
            localStorage.setItem('myShop', data.myShop)
            localStorage.setItem('listLikeProduct', data.listLikeProduct)
            dispatch(addIdUser(inforUser))
            setMessErrorServer('')
            turnOffSignIn()
          } else {
            setMessErrorServer(data.messageError || 'Cant connect server')
          }
        })
      e.preventDefault()
      e.stopPropagation()
    }
    //handleSignUp
    if (stateBox) {
      if (!emailSignUp.current?.value) {
        setMessErrorEmail('Invalid email')
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (!passwordSignUp.current?.value) {
        setMessErrorPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (!confirmPasswordSignUp.current?.value) {
        setMessErrorConfirmPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (confirmPasswordSignUp.current?.value !== passwordSignUp.current?.value) {
        setMessErrorConfirmPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
        return
      }
      const data = {
        email: emailSignUp.current?.value,
        password: passwordSignUp.current?.value
      }
      // console.log(data)
      fetch('http://localhost:3000/v1/user/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          if (data.messageError) {
            setMessErrorServer(data.messageError)
          } else setMessSucces('Sign Up Success')
        })
      e.preventDefault()
      e.stopPropagation()
    }
  }
  return (
    <div className='modalBox' onClick={handleSigin} role='presentation'>
      <Form className='boxLogin d-flex flex-column justify-content-center' onSubmit={handleSubmit}>
        {/* <Icon.XLg className='iconBoxLogin' size={40} /> */}
        {/* SignIn */}
        {!stateBox && (
          <div className='headerBox mb-119'>
            <div className='JejuMyeongjoRegular textHeaderBox'>Login</div>
          </div>
        )}
        {!stateBox && (
          <>
            <Form.Group className='mb-12'>
              <Form.Label className='kumbhSans mb-4' style={{ lineHeight: '25px' }}>
                Email address
              </Form.Label>
              <Form.Control
                className='borderInput kumbhSans mb-4'
                ref={emailLogin}
                type='email'
                placeholder='Enter email'
                isInvalid={!!messErrorEmail}
                onChange={() => {
                  setMessErrorEmail('')
                  setMessErrorServer('')
                }}
              />
            </Form.Group>
            <Form.Group className='mb-12'>
              <Form.Label className='kumbhSans mb-4' style={{ lineHeight: '25px' }}>
                Password
              </Form.Label>
              <Form.Control
                className='borderInput kumbhSans mb-4'
                ref={passwordLogin}
                type='password'
                placeholder='Password'
                isInvalid={!!messErrorPassword}
                onChange={() => {
                  setMessErrorPassword('')
                  setMessErrorServer('')
                }}
              />
            </Form.Group>
            <div className='messError mb-5 kumbhSans'>
              {(messErrorServer || messErrorEmail || messErrorPassword) && (
                <div>{messErrorServer || messErrorEmail || messErrorPassword}</div>
              )}
            </div>
            <div className='d-flex justify-content-center w-100'>
              <Button
                className='kumbhSans'
                style={{
                  marginTop: '30px',
                  fontWeight: 700,
                  backgroundColor: '#000',
                  borderRadius: 0,
                  border: 'none',
                  width: '140px',
                  height: '42px',
                  marginBottom: '25px'
                }}
                type='submit'
              >
                Submit
              </Button>
            </div>
            <div
              className='d-flex justify-content-center align-items-center kumbhSans'
              style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px' }}
            >
              <div className='d-flex justify-content-center' style={{ width: '192px' }}>
                Don&apos;t have an account?
              </div>
              <button
                type='button'
                className='btn btn-link ps-0 kumbhSans'
                style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px', color: '#D26B18' }}
                onClick={() => {
                  setStateBox(true)
                  setMessErrorEmail('')
                  setMessErrorPassword('')
                  setMessErrorServer('')
                  setMessSucces('')
                }}
              >
                Register
              </button>
            </div>
          </>
        )}
        {stateBox && (
          <div className='headerBox mb-68'>
            <div className='JejuMyeongjoRegular textHeaderBox'>Register</div>
          </div>
        )}
        {/* Signup */}
        {stateBox && !messSucces && (
          <>
            <Form.Group className='mb-3'>
              <Form.Label className='kumbhSans mb-4' style={{ lineHeight: '25px' }}>
                Email address
              </Form.Label>
              <Form.Control
                className='borderInput kumbhSans mb-4'
                ref={emailSignUp}
                type='email'
                placeholder='Enter email'
                isInvalid={!!messErrorEmail}
                onChange={() => {
                  setMessErrorEmail('')
                  setMessErrorServer('')
                }}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label className='kumbhSans mb-4' style={{ lineHeight: '25px' }}>
                Password
              </Form.Label>
              <Form.Control
                className='borderInput kumbhSans mb-4'
                ref={passwordSignUp}
                type='password'
                placeholder='Password'
                isInvalid={!!messErrorPassword}
                onChange={() => {
                  setMessErrorPassword('')
                  setMessErrorServer('')
                }}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label className='kumbhSans mb-4' style={{ lineHeight: '25px' }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                className='borderInput kumbhSans mb-4'
                ref={confirmPasswordSignUp}
                type='password'
                placeholder='Confirm password'
                isInvalid={!!messErrorConfirmPassword}
                onChange={() => {
                  setMessErrorConfirmPassword('')
                  setMessErrorServer('')
                }}
              />
            </Form.Group>
            <div className='messError'>
              {(messErrorServer || messErrorEmail || messErrorPassword || messErrorConfirmPassword) && (
                <div>{messErrorServer || messErrorEmail || messErrorPassword || messErrorConfirmPassword}</div>
              )}
              {messSucces && <div className='success'>{messSucces}</div>}
            </div>
            <div className='d-flex justify-content-center w-100'>
              <Button
                className='kumbhSans'
                style={{
                  marginTop: '21px',
                  fontWeight: 700,
                  backgroundColor: '#000',
                  borderRadius: 0,
                  border: 'none',
                  width: '140px',
                  height: '42px',
                  marginBottom: '25px'
                }}
                type='submit'
              >
                Submit
              </Button>
            </div>
            <div
              className='d-flex justify-content-center align-items-center kumbhSans'
              style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px' }}
            >
              <div className='d-flex justify-content-center' style={{ width: '192px' }}>
                Already have an account?
              </div>
              <button
                type='button'
                className='btn btn-link ps-0 kumbhSans'
                style={{ fontWeight: '300', fontSize: '15px', lineHeight: '19px', color: '#D26B18' }}
                onClick={() => {
                  setStateBox(false)
                  setMessErrorEmail('')
                  setMessErrorPassword('')
                  setMessErrorConfirmPassword('')
                  setMessErrorServer('')
                }}
              >
                Login
              </button>
            </div>
          </>
        )}
        {stateBox && messSucces && (
          <div>
            <div className='success mb-5'>
              <span>Your registration has been successfully completed. Press Continue to sign in</span>
            </div>
            <div className='d-flex justify-content-center w-100'>
              <Button
                className='kumbhSans'
                style={{
                  marginTop: '21px',
                  fontWeight: 700,
                  backgroundColor: '#000',
                  borderRadius: 0,
                  border: 'none',
                  width: '140px',
                  height: '42px',
                  marginBottom: '25px'
                }}
                onClick={() => {
                  setStateBox(false)
                  setMessErrorEmail('')
                  setMessErrorPassword('')
                  setMessErrorConfirmPassword('')
                  setMessErrorServer('')
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}

export default Modal
