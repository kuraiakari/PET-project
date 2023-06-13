import { memo, useCallback } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import person from '../../iconNavbar/person.svg'
import down from '../../iconNavbar/down.svg'

const InformationUser = ({ navigate, handleSignOut }: any) => {
  const isAdmin = useSelector((state: any) => state.user.isAdmin)

  //move profile
  const handleMoveProfile = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/profile')
    },
    [navigate]
  )

  //move history
  const handleMoveHistory = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/history')
    },
    [navigate]
  )

  //move likeProduct
  const handleMoveLikes = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/likes')
    },
    [navigate]
  )

  //move myShop
  const handleMoveMyShop = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      navigate('/myshop')
    },
    [navigate]
  )

  return (
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
        id='offcanvasNavbarDropdown-expand-xxl'
      >
        <NavDropdown.Item className='d-flex justify-content-center itemInDropDown' onClick={handleMoveProfile}>
          Personal
        </NavDropdown.Item>
        <NavDropdown.Item className='d-flex justify-content-center itemInDropDown' onClick={handleMoveHistory}>
          History
        </NavDropdown.Item>
        <NavDropdown.Item className='d-flex justify-content-center itemInDropDown' onClick={handleMoveLikes}>
          Favorite
        </NavDropdown.Item>
        {isAdmin && (
          <NavDropdown.Item className='d-flex justify-content-center itemInDropDown' onClick={handleMoveMyShop}>
            My shop
          </NavDropdown.Item>
        )}
        <NavDropdown.Divider style={{ borderTopColor: '#000' }} />
        <NavDropdown.Item className='d-flex justify-content-center itemInDropDown' onClick={handleSignOut}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  )
}
export default memo(InformationUser)
