import React from 'react'
import { useSelector } from 'react-redux'

function Menu() {
  const idUser = useSelector((state: any) => state.user.idUser)
  console.log(idUser)
  return (
    <>
      <h1>test</h1>
    </>
  )
}
export default Menu
