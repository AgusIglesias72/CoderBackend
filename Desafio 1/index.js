class ProductManager {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
    this.products = []
  }

  addProduct(product) {
    const exist = this.products.find((p) => p.code === product.code)
    if (exist === -1) return { error: 'El producto ya existe' }

    this.products.push(product)
  }

  getProductsById(id) {
    const product = this.products.find((p) => p.code === id)
    if (product === -1) return { error: 'Producto no encontrado' }
    return product
  }

  getProducts() {
    return this.products
  }
}
