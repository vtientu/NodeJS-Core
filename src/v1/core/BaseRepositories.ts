import { Model, Document, FilterQuery, QueryOptions, Schema, UpdateQuery } from 'mongoose'

class BaseRepository<T extends Document & { _id: Schema.Types.ObjectId }> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  findById(id: any) {
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

  update(id: Schema.Types.ObjectId, data: UpdateQuery<T>, options: QueryOptions = { new: true }) {
    return this.model.findByIdAndUpdate(id, data, options).exec()
  }

  deleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter)
  }

  findOneAndUpdate(filter: FilterQuery<T>, data: Partial<T>, options: QueryOptions<T>) {
    return this.model.findOneAndUpdate(filter, data, options)
  }
}

export default BaseRepository
