import BaseRepository from '@core/BaseRepositories.js'
import { IClothing, IElectronic, IProduct, IProductCreate } from '@interfaces/product.interfaces.js'
import ProductModel, { ClothingModel, ElectronicModel } from '@models/product.model.js'

// Define base product class
class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(ProductModel)
  }

  createProduct(product: IProductCreate) {
    return this.create(product)
  }
}

// Define sub-class for different product types clothing
class ClothingRepository extends BaseRepository<IClothing> {
  constructor() {
    super(ClothingModel)
  }

  createClothing(clothing: any) {
    return this.create(clothing)
  }
}

class ElectronicRepository extends BaseRepository<IElectronic> {
  constructor() {
    super(ElectronicModel)
  }

  createElectronic(electronic: any) {
    return this.create(electronic)
  }
}

const productRepository = new ProductRepository()
const clothingRepository = new ClothingRepository()
const electronicRepository = new ElectronicRepository()

export { productRepository, clothingRepository, electronicRepository }
