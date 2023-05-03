import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as Icon from 'react-bootstrap-icons'

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
      }
      if (!passwordLogin.current?.value) {
        setMessErrorPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
      } else {
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
              // console.log(inforUser)
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
    }
    //handleSignUp
    if (stateBox) {
      if (!emailSignUp.current?.value) {
        setMessErrorEmail('Invalid email')
        e.preventDefault()
        e.stopPropagation()
      }
      if (!passwordSignUp.current?.value) {
        setMessErrorPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
      }
      if (!confirmPasswordSignUp.current?.value) {
        setMessErrorConfirmPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
      }
      if (confirmPasswordSignUp.current?.value !== passwordSignUp.current?.value) {
        setMessErrorConfirmPassword('Invalid password')
        e.preventDefault()
        e.stopPropagation()
      } else {
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
  }
  return (
    <div className='modalBox' onClick={handleSigin} role='presentation'>
      <Form className='boxLogin d-flex flex-column justify-content-center' onSubmit={handleSubmit}>
        <Icon.XLg className='iconBoxLogin' size={40} />
        {/* SignIn */}
        {!stateBox && (
          <div className='headerBox mb-5'>
            <h1>Login</h1>
          </div>
        )}
        {!stateBox && (
          <>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailLogin}
                type='email'
                placeholder='Enter email'
                isInvalid={!!messErrorEmail}
                onChange={() => {
                  setMessErrorEmail('')
                  setMessErrorServer('')
                }}
              />
              <Form.Control.Feedback type='invalid'>{messErrorEmail}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordLogin}
                type='password'
                placeholder='Password'
                isInvalid={!!messErrorPassword}
                onChange={() => {
                  setMessErrorPassword('')
                  setMessErrorServer('')
                }}
              />
              <Form.Control.Feedback type='invalid'>{messErrorPassword}</Form.Control.Feedback>
            </Form.Group>
            <div className='messError mb-5'>{messErrorServer && <div>{messErrorServer}</div>}</div>
            <Button type='submit'>Submit form</Button>
            <div className='d-flex justify-content-center align-items-center'>
              Don&apos;t have an account?
              <button
                type='button'
                className='btn btn-link ps-0'
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
          <div className='headerBox mb-5'>
            <h1>Register</h1>
          </div>
        )}
        {/* Signup */}
        {stateBox && !messSucces && (
          <>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailSignUp}
                type='email'
                placeholder='Enter email'
                isInvalid={!!messErrorEmail}
                onChange={() => {
                  setMessErrorEmail('')
                  setMessErrorServer('')
                }}
              />
              <Form.Control.Feedback type='invalid'>{messErrorEmail}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordSignUp}
                type='password'
                placeholder='Password'
                isInvalid={!!messErrorPassword}
                onChange={() => {
                  setMessErrorPassword('')
                  setMessErrorServer('')
                }}
              />
              <Form.Control.Feedback type='invalid'>{messErrorPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                ref={confirmPasswordSignUp}
                type='password'
                placeholder='Confirm password'
                isInvalid={!!messErrorConfirmPassword}
                onChange={() => {
                  setMessErrorConfirmPassword('')
                  setMessErrorServer('')
                }}
              />
              <Form.Control.Feedback type='invalid'>{messErrorConfirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <div className='messError mb-5'>
              {messErrorServer && <div>{messErrorServer}</div>}
              {messSucces && <div className='success'>{messSucces}</div>}
            </div>
            <Button type='submit'>Submit form</Button>
            <div className='d-flex justify-content-center align-items-center'>
              Already have an account?
              <button
                type='button'
                className='btn btn-link'
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
            <Button
              style={{ width: '100%' }}
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
        )}
      </Form>
    </div>
  )
}

export default Modal
