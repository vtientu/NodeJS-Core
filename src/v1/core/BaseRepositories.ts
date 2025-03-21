import { Model, Document, FilterQuery, QueryOptions } from 'mongoose'

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

  update(id: string, data: Partial<T>, options: QueryOptions<T>) {
    return this.model.findByIdAndUpdate(id, data, options).lean()
  }

  deleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter).lean()
  }

  findOneAndUpdate(filter: FilterQuery<T>, data: Partial<T>, options: QueryOptions<T>) {
    return this.model.findOneAndUpdate(filter, data, options).lean()
  }
}

export default BaseRepository
