import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Sidebar from './component/MainContent/Sidebar/SideBar'
import ListProduct from './component/MainContent/Page/Home/ListProduct/listProduct'
import DetailProduct from './component/MainContent/Page/DetailProduct/DetailProduct'
import Cart from './component/MainContent/Page/Cart/Cart'
import History from './component/MainContent/Page/History/History'
import Profile from './component/MainContent/Page/Profile/Profile'
import MyShop from './component/MainContent/Page/MyShop/MyShop'
import LikeProducts from './component/MainContent/Page/LikeProducts/LikeProducts'
import Footer from './component/Footer/Footer'
import Headerpage from './component/HeaderPage'

//BackToTop
import ActionScrollToTop from './utils/hooks/BackToTop/ActionToTop'
import AutoScrollToTop from './utils/hooks/BackToTop/AutoToTop'

const Home = () => {
  return (
    <>
      <div className='fix-col-xl-3 col-xl-3'>
        <Sidebar />
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
      <ActionScrollToTop />
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
