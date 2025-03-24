import { IElectronic } from '@interfaces/product.interfaces.js'
import { model, Schema } from 'mongoose'

const COLLECTION_NAME = 'Electronics'
const DOCUMENT_NAME = 'Electronic'

const ElectronicSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true
    },
    form: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const ElectronicModel = model<IElectronic>(DOCUMENT_NAME, ElectronicSchema)
export default ElectronicModel
