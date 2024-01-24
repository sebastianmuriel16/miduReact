import './App.css'
import { usecatfact } from './Hooks/useCatFact'
import { useCatImage } from './Hooks/useCatImage'
import { Otro } from './Components/Otro.jsx'

function App() {
  const { fact, refreshRandomFact } = usecatfact()
  const { image } = useCatImage({ fact })

  const handleClick = () => {
    refreshRandomFact()
  }

  return (
    <main className="App">
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {/*<section className='container'> /*section para mostrar la imagen*/}
      {fact && <p>{fact}</p>}
      {image && (
        <img
          src={image}
          alt='image extracted using the string "cat + first three word" in the fact with giphy api'
        />
      )}
      {/*</section> /*section para mostrar la imagen*/}

      <Otro />
    </main>

    
  )
}

export { App }
