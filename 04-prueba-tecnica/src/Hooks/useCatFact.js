import { useState, useEffect } from 'react'
import { getRandomFact } from '../Services/facts'
function usecatfact  ()  {
    const [fact, setFact] = useState('')
  
    const refreshRandomFact =() => {
      getRandomFact().then((newFact) => setFact(newFact))
    }
  
    // recuperar la cita al cargar la pagina
    useEffect(refreshRandomFact, [])
  
    return { fact, refreshRandomFact }
  }

  export { usecatfact }
