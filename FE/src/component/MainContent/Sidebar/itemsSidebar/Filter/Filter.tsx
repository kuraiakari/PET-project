//do filter sử dụng hook useSearchParams(). Cập nhập thường xuyên url của page sau đó ghép thêm giá trik query search vào.
//việc sử dụng đối số thứ 2 của memo và chỉ rendering khi thay đổi items bên trong khiến việc cập nhập url trên bị dừng.

//đề xuất sử dụng useRef để lưu trữ action onClick như trường hợp của setTimeout để tránh rerender lại cái html chỉ cập nhập
// lại hành động thôi
import { memo } from 'react'

import { itemFilter } from '../../typeData/itemFilter.type'

interface data {
  itemsFilter: Array<itemFilter>
  handleFilter: any
  valueSortProduct: string | null
}

const Filter = ({ itemsFilter, handleFilter, valueSortProduct }: data) => {
  return (
    <>
      {itemsFilter.map((item: itemFilter, index: number) => {
        return (
          <button
            key={index}
            onClick={() => handleFilter(item.content)}
            className={valueSortProduct === item.content ? 'itemFilter itemActive' : 'itemFilter'}
          >
            <img src={item.icon} alt='goodPrice' className='iconMenu me-2' />
            <div className='kumbhSans' style={{ lineHeight: '25px' }}>
              {item.description}
            </div>
          </button>
        )
      })}
    </>
  )
}
export default memo(Filter)
