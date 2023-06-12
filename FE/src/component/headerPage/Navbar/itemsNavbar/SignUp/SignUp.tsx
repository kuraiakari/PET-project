import { useCallback, memo } from 'react'
import { Nav } from 'react-bootstrap'

import person from '../../iconNavbar/person.svg'

import { typeModal } from '../../Navbar'
interface data {
  setModal: React.Dispatch<React.SetStateAction<typeModal>>
}

const SignUp = ({ setModal }: data) => {
  const handldeSignUp = useCallback(() => {
    setModal({
      stateModal: true,
      content: 'sign in'
    })
  }, [setModal])
  return (
    <div className='itemNav kumbhSans ms-2'>
      <Nav.Link style={{ color: '#000' }} onClick={handldeSignUp}>
        Sign in
      </Nav.Link>
      <img src={person} alt='person' />
    </div>
  )
}
export default memo(SignUp)
