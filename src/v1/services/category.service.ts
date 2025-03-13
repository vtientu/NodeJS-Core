import { categoryModel } from '@/v1/models/category.models.js'

const categoryService = {
  getCategoryList: async () => {
    try {
      const result = await categoryModel.find()
      return result
    } catch (error) {
      return error
    }
  }
}

export default categoryService
