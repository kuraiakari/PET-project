//lưu ý: với memo các query search k khiến chúng rerender
import { memo, useCallback } from 'react'
import { Navbar } from 'react-bootstrap'

interface data {
  navigate: any
  valueSearch: any
}

const Brand = ({ navigate, valueSearch }: data) => {
  const backToHome = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      if (valueSearch.current?.value) valueSearch.current.value = ''
      navigate('/')
    },
    [navigate, valueSearch]
  )
  return (
    <Navbar.Brand className='logoPage italiana' onClick={backToHome}>
      LiLies
    </Navbar.Brand>
  )
}
export default memo(Brand)
