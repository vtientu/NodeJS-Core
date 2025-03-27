import { IInventory } from '@interfaces/inventory.interfaces.js'
import { Schema, model } from 'mongoose'

const DOCUMENT_NAME = 'Inventory'
const COLLECTIONS_NAME = 'Inventories'

const InventorySchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    location: {
      type: String,
      default: 'Unknown'
    },
    stock: {
      type: Number,
      required: true
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    },
    reservations: {
      type: Array,
      default: []
    }
    /*
      cartId: ,
      stock: 1,
      createAt: 
    */
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME
  }
)

//Export the model
const InventoryModel = model<IInventory>(DOCUMENT_NAME, InventorySchema)
export default InventoryModel
