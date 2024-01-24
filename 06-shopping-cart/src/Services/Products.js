async function getProductsFromAPI() {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    const products = data;
    return products?.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category.name,
        image: product.images[0],
      }
    })
  } catch (error) {
    throw new Error('Error fetching products:', error);
  }
}


export { getProductsFromAPI }