import React from 'react'
import { useSelector } from 'react-redux'

function Menu() {
  const idUser = useSelector((state:any) => state.user.idUser)
  console.log(idUser)
  return (
    <>
    </>
  )
}
export default Menu
