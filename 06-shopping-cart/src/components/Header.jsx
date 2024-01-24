import { Filters } from "./Filters";
import PropTypes from 'prop-types'

function Header() {
    return (
        <header>
            <h1>React shop 🛒</h1>
            <Filters/>
        </header>
    );
}

Header.propTypes = {
    changeFilters: PropTypes.func
}

export { Header };