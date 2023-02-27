import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as Icon from 'react-bootstrap-icons'

import './noAccount.css'
import { useDispatch } from 'react-redux'
import { addIdUser } from '../../../redux/user.reducer'

function SignIn({ turnOffSignIn, ...initstateBox }: any) {
  const [stateBox, setStateBox] = useState(initstateBox.stateBox)
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
            console.log(data.token)
            dispatch(addIdUser(data.token))
            turnOffSignIn()
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
    }
  }
  return (
    <div className='modalBox' onClick={handleSigin} role='presentation'>
      <Form className='boxLogin d-flex flex-column justify-content-center' onSubmit={handleSubmit}>
        <Icon.XLg className='iconBoxLogin' size={40} />
        {/* SignIn */}
        {!stateBox && (
          <>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailLogin}
                type='email'
                placeholder='Enter email'
                isInvalid={!!messErrorEmail}
                onChange={() => setMessErrorEmail('')}
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
                onChange={() => setMessErrorPassword('')}
              />
              <Form.Control.Feedback type='invalid'>{messErrorPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button type='submit'>Submit form</Button>
            <button
              type='button'
              className='btn btn-link'
              onClick={() => {
                setStateBox(true)
                setMessErrorEmail('')
                setMessErrorPassword('')
              }}
            >
              Dang ky
            </button>
          </>
        )}
        {/* Signup */}
        {stateBox && (
          <>
            <Form.Group className='mb-3'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailSignUp}
                type='email'
                placeholder='Enter email'
                isInvalid={!!messErrorEmail}
                onChange={() => setMessErrorEmail('')}
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
                onChange={() => setMessErrorPassword('')}
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
                onChange={() => setMessErrorConfirmPassword('')}
              />
              <Form.Control.Feedback type='invalid'>{messErrorConfirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button type='submit'>Submit form</Button>
            <button
              type='button'
              className='btn btn-link'
              onClick={() => {
                setStateBox(false)
                setMessErrorEmail('')
                setMessErrorPassword('')
                setMessErrorConfirmPassword('')
              }}
            >
              Dang nhap
            </button>
          </>
        )}
      </Form>
    </div>
  )
}

export default SignIn
