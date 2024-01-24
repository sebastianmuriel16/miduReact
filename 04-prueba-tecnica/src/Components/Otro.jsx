import { useCatImage } from '../Hooks/useCatImage.js'

function Otro() {
  const { image } = useCatImage({ fact: 'cute cat' })
  return (
  <> 
  <h1>Otro</h1>
  {image && <img src={image} />}
  </>
  )
}

export { Otro }