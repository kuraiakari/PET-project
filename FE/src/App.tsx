import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Headerpage from './component/headerPage/index'
import Portfolio from './component/subnav/Portfolio'
import ListProduct from './component/content/mainContent/listProduct/listProduct'
import DetailProduct from './component/content/detailProduct/DetailProduct'
import Cart from './component/content/cart/Cart'
import History from './component/content/history/history'
import Profile from './component/content/profile/Profile'
import MyShop from './component/content/myShop/MyShop'
import ScrollButton from './BackToTop'

import './App.css'
import LikeProducts from './component/content/likeProducts/likeProducts'
import Footer from './component/footer/Footer'
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
      <div className='fullweb'>
        <div className='container'>
          <Headerpage />
          <div className='row contentPage min-vh-100 mb-2'>
            <Routes>
              <Route path='/' element={<Home />}>
                {/* nên để đường dẫn cha có kí tự không để rỗng*/}
                <Route path='search' element={<ListProduct />}>
                  
                </Route>
              </Route>
              <Route path='/product/:idProduct' element={<DetailProduct />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/history' element={<History />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/likes' element={<LikeProducts />} />
              <Route path='/myshop' element={<MyShop />} />
            </Routes>
          </div>
        </div>
        <Footer />
        <ScrollButton />
      </div>
    </>
  )
}
export default App
