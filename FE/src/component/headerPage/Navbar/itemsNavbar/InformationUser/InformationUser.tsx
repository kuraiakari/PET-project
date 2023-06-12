import { memo, useCallback } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { ReadyState } from 'react-use-websocket'

import { addIdUser } from '../../../../../redux/user.reducer'
import { removeAllProduct } from '../../../../../redux/cart.reducer'

import person from '../../iconNavbar/person.svg'
import down from '../../iconNavbar/down.svg'

const InformationUser = ({ navigate, readyState, sendJsonMessage }: any) => {
  const dispatch = useDispatch()
  const isAdmin = useSelector((state: any) => state.user.isAdmin)
  const idUser = useSelector((state: any) => state.user.id)

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

  //sign out
  const handleSignOut = useCallback(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: 'signout',
        content: {
          idUser: idUser
        }
      })
    }
    if (
      location.pathname === '/cart' ||
      location.pathname === '/history' ||
      location.pathname === '/profile' ||
      location.pathname === '/myshop' ||
      location.pathname === '/likes'
    )
      navigate('/')
    const data = {
      accessToken: '',
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
  }, [dispatch, idUser, navigate, readyState, sendJsonMessage])
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
