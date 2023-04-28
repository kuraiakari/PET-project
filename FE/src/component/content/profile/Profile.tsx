import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import avatarError from './avatar.webp'
import './profile.css'

interface inforUser {
  avatar: string
  email: string
  firstName: string
  lastName: string
  phoneUser: string
  gender: string
}

const Profile = () => {
  const idUser = useSelector((state: any) => state.user.idUser)
  const imageAvatar = useRef<HTMLInputElement>(null)
  const [inforUser, setInforUser] = useState<inforUser>()
  const [firstNameUser, setFirstNameUSer] = useState()
  const [lastNameUser, setLastNameUSer] = useState()
  const [phoneUser, setPhoneUSer] = useState()
  const [genderUser, setGenderUSer] = useState()

  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  //handleGetInformationsUser
  useEffect(() => {
    fetch('http://localhost:3000/v1/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idUser}`,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setInforUser(data)
      })
  }, [idUser])
  //handleSaveInformations
  const handleSaveInformations = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inforUser?.firstName || !inforUser?.lastName || !inforUser?.phoneUser || !inforUser?.gender) {
      setValidated(true)
    }
    if (firstNameUser || lastNameUser || phoneUser || genderUser) {
      const data = {
        firstName: firstNameUser,
        lastName: lastNameUser,
        phoneUser,
        gender: genderUser
      }
      fetch('http://localhost:3000/v1/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idUser}`
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          navigate(0)
        })
    }
  }
  //handleSaveImg
  const handleSaveImage = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData()
    if (imageAvatar.current?.files) formData.append('avatar', imageAvatar.current.files[0])
    fetch('http://localhost:3000/v1/user/update', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${idUser}`
      },
      body: formData
    })
      .then((response) => response.json())
      .then(() => {
        navigate(0)
      })
  }
  return (
    <>
      <h1 className='d-flex justify-content-center align-items-center '>User Personal Information</h1>
      <div className='col-xl-3 d-flex flex-column justify-content-center align-items-center '>
        <div>
          <img
            src={'http://localhost:3000/' + inforUser?.avatar}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = avatarError
            }}
            alt='avatarUser'
            className='avatarUser'
          />
        </div>
        <input type='file' id='avatar' name='avatar' ref={imageAvatar} className='mt-3 mb-3'></input>
        <Button type='submit' onClick={handleSaveImage}>
          Save Image
        </Button>
      </div>
      <div className='col-xl-9'>
        <Form noValidate validated={validated} onSubmit={handleSaveInformations}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control required type='email' placeholder={inforUser?.email} disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder={inforUser?.firstName || 'First Name'}
              onChange={(e: any) => setFirstNameUSer(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder={inforUser?.lastName || 'Last name'}
              onChange={(e: any) => setLastNameUSer(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder={inforUser?.phoneUser || 'Phone user'}
              onChange={(e: any) => setPhoneUSer(e.target.value)}
            />
          </Form.Group>
          <FormGroup>
            <Form.Label>Gender</Form.Label>
            <Form.Select required onChange={(e: any) => setGenderUSer(e.target.value)}>
              <option value={inforUser?.gender || ''}>{inforUser?.gender || 'Choose gender'}</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </Form.Select>
          </FormGroup>
          <div className='d-flex justify-content-center mt-3'>
            <Button type='submit' disabled={!firstNameUser && !lastNameUser && !phoneUser && !genderUser}>
              Save Information
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
export default Profile
