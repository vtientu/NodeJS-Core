import { Model, Document, FilterQuery } from 'mongoose'

class BaseRepository<T extends Document> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  findById(id: string) {
    return this.model.findById(id).lean()
  }

  findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter).lean()
  }

  find(filter: FilterQuery<T>) {
    return this.model.find(filter).lean()
  }

  create(data: Partial<T>) {
    return this.model.create(data)
  }

  update(id: string, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).lean()
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).lean()
  }
}

export default BaseRepository
