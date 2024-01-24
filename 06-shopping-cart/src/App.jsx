import { Products } from './components/product'
import { Cart } from './components/Cart'
import { useFilters } from './Hooks/useFilters'
import { Header } from './components/Header'
import { useProducts } from './Hooks/useProducts'
import { Footer } from './components/Footer'
import { CartProvider } from './context/Cart'

import { IS_DEVELOPMENT } from './config'

function App() {
  const { products } = useProducts()
  const {  filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)
  return (
    <CartProvider>
      <Header  />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
