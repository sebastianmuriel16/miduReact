import { useContext } from 'react'
import { FilterContext } from '../context/filter.jsx'
function useFilters() {
  const { filters, setFilters } = useContext(FilterContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.price &&
        (filters.category === 'all' || product.category === filters.category)
      )
    })
  }
  return { filters, setFilters, filterProducts }
}

export { useFilters }
