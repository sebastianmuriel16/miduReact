import { getProductsFromAPI } from '../Services/Products'
import { useState, useEffect } from 'react'

function useProducts() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getProductsFromAPI()
        setProducts(products)
      } catch (error) {
        console.log(error)
      }
      finally {
        //console.log('finally')
      }
    }
    getProducts()
  }, [])


  return { products}
}

export { useProducts }
