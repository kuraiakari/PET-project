import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Portfolio from './component/subnav/Portfolio'
import ListProduct from './component/content/mainContent/listProduct/listProduct'
import DetailProduct from './component/content/detailProduct/DetailProduct'
import Cart from './component/content/cart/Cart'
import History from './component/content/history/history'
import Profile from './component/content/profile/Profile'
import MyShop from './component/content/myShop/MyShop'
import LikeProducts from './component/content/likeProducts/likeProducts'
import Footer from './component/footer/Footer'
import Headerpage from './component/headerPage/index'
import HandleScrollToTop from './BackToTop'
import AutoScrollToTop from './AutoToTop'

const Home = () => {
  return (
    <>
      <div className='fix-col-xl-3 col-xl-3'>
        <Portfolio />
      </div>
      <div className='fix-col-xl-9'>
        <ListProduct />
      </div>
    </>
  )
}
const Fullweb = () => {
  return (
    <div className='fullweb'>
      <Headerpage />
      <div className='container' style={{ margin: '0 auto', display: 'block', width: '1524px' }}>
        <div className='row contentPage min-vh-100'>
          <Outlet />
        </div>
      </div>
      <Footer />
      <HandleScrollToTop />
      <AutoScrollToTop />
    </div>
  )
}
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Fullweb />}>
      <Route path='/' element={<Home />}>
        <Route path='products'>
          <Route element={<Home />} path=':category' />
        </Route>
      </Route>
      <Route path='/products/:category/:idProduct' element={<DetailProduct />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/history' element={<History />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/likes' element={<LikeProducts />} />
      <Route path='/myshop' element={<MyShop />} />
    </Route>
  )
)
