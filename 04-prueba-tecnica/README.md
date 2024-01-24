Prueba técnica para Juniors y Trainees de React en Live Coding.

APIs:

    Facts Random: https://catfact.ninja/fact

    Imagen random: https://cataas.com/cat/says/hello <-- esta api ya no sirve o no existe
    usare la de giphy.com para obtener un gif de un gato con la palabra que recuperamos

    const Base_URl = 'https://api.giphy.com/v1/gifs'
    const API_KEY = 'KyGmZaQhNOHulI1SU7dpExB0FF0AIT6j'

    endpoint -> `${Base_URl}/search?api_key=${API_KEY}&q=${query}limit=${limit}`
     el query son las palabras clave para buscar el gif por lo tanto se pasara
     un string = "cat + palabra solicitada"

    Recupera un hecho aleatorio de gatos de la primera API

    Recuperar la primera palabra del hecho

    Muestra una imagen de un gato con la primera palabra.
