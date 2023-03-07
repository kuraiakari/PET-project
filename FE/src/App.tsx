import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Headerpage from './component/headerPage/index'
import Portfolio from './component/subnav/Portfolio'
import ListProduct from './component/content/mainContent/listProduct/listProduct'
import DetailProduct from './component/content/detailProduct/DatailProduct'

import './App.css'
function App() {
  const Home = () => {
    return (
      <>
        <div className='fix-col-xl-3 col-xl-3'>
          <Portfolio />
        </div>
        <div className='fix-col-xl-9 col-xl-9'>
          <ListProduct />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='container'>
        <Headerpage />
        <div className='row'>
          <Routes>
            <Route path='' element={<Home />}>
              <Route path='/search' element={<ListProduct />} />
            </Route>
            <Route path='/product/:idProduct' element={<DetailProduct />} />
          </Routes>
        </div>
      </div>
    </>
  )
}
export default App
