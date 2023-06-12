import { memo, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'

import iconSearch from '../../iconNavbar/search.svg'

interface data {
  navigate: any
  valueSearch: any
}

const Search = ({ navigate, valueSearch }: data) => {
  const handleFocusInput = useCallback(() => {
    valueSearch.current?.focus()
  }, [valueSearch])
  const handleValueSearch = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      if (valueSearch.current?.value) {
        navigate(`?search=${valueSearch.current?.value}`)
      }
    },
    [navigate, valueSearch]
  )
  return (
    <Form className='d-flex align-items-center border border-dark search' onSubmit={handleValueSearch}>
      <div className='d-flex align-items-center flex-grow-1 h-100 mx-16' onClick={handleFocusInput} aria-hidden='true'>
        <img src={iconSearch} alt='search' />
        <Form.Control
          ref={valueSearch}
          type='search'
          placeholder='Search'
          className='border-0 shadow-none textSearch kumbhSans'
          aria-label='Search'
        />
      </div>
      <div className='lineSearch'></div>
      <Button className='btnSearch border-0 btn-light px-32 kumbhSans' onClick={handleValueSearch}>
        Search
      </Button>
    </Form>
  )
}
export default memo(Search)
