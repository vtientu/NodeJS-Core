import { Model, Document, FilterQuery, QueryOptions, Types, UpdateQuery } from 'mongoose'

class BaseRepository<T extends Document & { _id: Types.ObjectId }> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  findById(id: Types.ObjectId) {
    return this.model.findById(id)
  }

  findOne(filter: FilterQuery<T>) {
    return this.model.findOne(filter)
  }

  find(filter: FilterQuery<T>) {
    return this.model.find(filter)
  }

  create(data: Partial<T>) {
    return this.model.create(data)
  }

  async update(id: Types.ObjectId, data: UpdateQuery<T>, options: QueryOptions = { new: true }) {
    return await this.model.findByIdAndUpdate(id, data, options).exec()
  }

  deleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter)
  }

  findOneAndUpdate(filter: FilterQuery<T>, data: Partial<T>, options: QueryOptions<T>) {
    return this.model.findOneAndUpdate(filter, data, options)
  }
}

export default BaseRepository
