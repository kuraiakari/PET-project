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
  const accessToken = useSelector((state: any) => state.user.accessToken)
  const imageAvatar = useRef<HTMLInputElement>(null)
  const [avatarTest, setAvatarTest] = useState<File>()
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
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setInforUser(data)
        }, 1000)
      })
  }, [accessToken])
  const handleSaveInformations = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (!inforUser?.firstName || !inforUser?.lastName || !inforUser?.phoneUser || !inforUser?.gender) {
      if (!firstNameUser || !lastNameUser || !phoneUser || !genderUser) {
        setValidated(true)
        return
      }
    }
    const formData = new FormData()
    if (avatarTest) formData.append('avatar', avatarTest)
    if (firstNameUser) formData.append('firstName', firstNameUser)
    if (lastNameUser) formData.append('lastName', lastNameUser)
    if (phoneUser) formData.append('phoneUser', phoneUser)
    if (genderUser) formData.append('gender', genderUser)

    fetch('http://localhost:3000/v1/user/update', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    })
      .then((response) => response.json())
      .then(() => {
        navigate(0)
      })
  }
  return (
    <div className='d-flex flex-column align-items-center mt-46'>
      <div className='JejuMyeongjoRegular' style={{ paddingBottom: '53px' }}>
        User Personal Information
      </div>
      {!inforUser && (
        <div className='loader-wrapper pt-5'>
          <div className='loader'></div>
        </div>
      )}
      {inforUser && (
        <div className='d-flex justify-content-center w-100'>
          <div className='col-xl-3 d-flex flex-column align-items-center '>
            <div style={{ border: '3px solid #000', borderRadius: '50%', marginTop: '35px' }}>
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
            <label className='custom-file-upload kumbhSans' style={{ fontWeight: 700 }}>
              Choose file
              <input
                type='file'
                id='avatar'
                name='avatar'
                onChange={() => {
                  if (imageAvatar.current?.files) setAvatarTest(imageAvatar.current?.files[0])
                }}
                ref={imageAvatar}
                className='mt-3 mb-3 avatarPerson'
              ></input>
            </label>
            {!avatarTest && (
              <div className='kumbhSans' style={{ fontSize: '15px', fontWeight: 300, marginTop: '19px' }}>
                No files selected
              </div>
            )}
          </div>
          <div className='col-information'>
            <Form noValidate validated={validated} onSubmit={handleSaveInformations}>
              <Form.Group className='mb-22'>
                <Form.Label className='kumbhSans'>Email</Form.Label>
                <Form.Control
                  className='borderInput kumbhSans'
                  required
                  type='email'
                  placeholder={inforUser?.email}
                  disabled
                />
              </Form.Group>
              <Form.Group className='mb-22'>
                <Form.Label className='kumbhSans'>First name</Form.Label>
                <Form.Control
                  className='borderInput kumbhSans'
                  required
                  type='text'
                  placeholder={inforUser?.firstName || 'First Name'}
                  onChange={(e: any) => setFirstNameUSer(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-22'>
                <Form.Label className='kumbhSans'>Last name</Form.Label>
                <Form.Control
                  className='borderInput kumbhSans'
                  required
                  type='text'
                  placeholder={inforUser?.lastName || 'Last name'}
                  onChange={(e: any) => setLastNameUSer(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-22'>
                <Form.Label className='kumbhSans'>Phone</Form.Label>
                <Form.Control
                  className='borderInput kumbhSans'
                  required
                  type='text'
                  placeholder={inforUser?.phoneUser || 'Phone user'}
                  onChange={(e: any) => setPhoneUSer(e.target.value)}
                />
              </Form.Group>
              <FormGroup>
                <Form.Label className='kumbhSans'>Gender</Form.Label>
                <Form.Select
                  className='borderInput kumbhSans'
                  style={{ color: genderUser ? '#000' : '#6c757d' }}
                  required
                  onChange={(e: any) => setGenderUSer(e.target.value)}
                >
                  <option value={inforUser?.gender || ''}>{inforUser?.gender || 'Choose gender'}</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </Form.Select>
              </FormGroup>
              {(firstNameUser || lastNameUser || phoneUser || genderUser || avatarTest) && (
                <div className='d-flex justify-content-center'>
                  <Button
                    type='submit'
                    className='kumbhSans'
                    style={{
                      fontWeight: 700,
                      marginTop: '60px',
                      backgroundColor: '#000',
                      borderRadius: 0,
                      border: 'none',
                      width: '140px',
                      height: '42px',
                      marginBottom: '200px'
                    }}
                  >
                    Save
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </div>
      )}
    </div>
  )
}
export default Profile
