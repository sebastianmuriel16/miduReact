import { createContext, useState } from "react";
import PropTypes from 'prop-types'

// singleton Modulo de javascript
//  1. crearar el context
const FilterContext = createContext() // solo se crea una vez

// 2. crear el provider, para proveer el context
    

 const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        category: 'all',
        price: 50
    })
    return (
        <FilterContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FilterContext.Provider>
    )
}

FilterProvider.propTypes = {
    children: PropTypes.node
}

export { FilterContext, FilterProvider }