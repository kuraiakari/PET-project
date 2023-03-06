import React from 'react'
import Headerpage from './component/headerPage/index'
import Menu from './component/subnav'
import ListProduct from './component/content/mainContent/listProduct/listProduct'
import './App.css'
function App() {
  return (
    <>
      <div className='container'>
        <Headerpage />
        <div className='row'>
          <div className='fix-col-xl-3 col-xl-3'>
            <Menu />
          </div>
          <div className='fix-col-xl-9 col-xl-9'>
            <ListProduct />
          </div>
        </div>
      </div>
    </>
  )
}
export default App
