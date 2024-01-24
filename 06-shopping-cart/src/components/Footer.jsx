import './Footer.css'
import PropTypes from 'prop-types'

function Footer() {
  return (
    <footer className="footer">
      {/* {{JSON.stringify(filters, null, 2)} */}

      <h4>
        Prueba tecnica de React ⚛️ <span>@2023</span>
      </h4>

      <span>Propuesta por: @midudev</span>
      <h5>Shopping cart con useContext & useReducer</h5>
    </footer>
  )
}

export { Footer }

Footer.propTypes = {
  filters: PropTypes.object,
}
