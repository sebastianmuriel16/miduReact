import './Filters.css'
import PropTypes from 'prop-types'
import {  useId, useContext } from 'react'
import { FilterContext } from '../context/filter'
function Filters() {
  const {filters,setFilters} = useContext(FilterContext)
  const minFilterPriceId = useId()
  const categoryFilterId = useId()


  const handlePrice = (event) => {  
    setFilters((prevState) => ({
      ...prevState,
      price: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    // se le esta pasando la funcion de actulizar el estado
    // nativa de react a un componente hijo
    // y no deberia
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minFilterPriceId}>Precio a partir de</label>
        <input
          type="range"
          id={minFilterPriceId} 
          min="0"
          max="1000"
          onChange={handlePrice}
          value={filters.price}
        />
        <span>${filters.price}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="Clothes">Clothes</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Furniture">Furniture</option>
          <option value="Shoes">Shoes</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
    </section>
  )
}

Filters.propTypes = {
  onChange: PropTypes.func
}

export { Filters }
