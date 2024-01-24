import './products.css'
import { useCart } from '../Hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import PropTypes from 'prop-types'
function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useCart()

  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id)
  }

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => {
          const productInCart = isProductInCart(product)

          return (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <div>
                <strong>{product.title}</strong>
                <span>${product.price}</span>
              </div>
              <div>
                <button
                  className={productInCart ? 'remove' : 'add'}
                  onClick={() =>
                    productInCart ? removeFromCart(product) : addToCart(product)
                  }
                >
                  {productInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

Products.propTypes = {
  products: PropTypes.array,
}

export { Products }
