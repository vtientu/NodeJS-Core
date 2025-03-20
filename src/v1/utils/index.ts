import pick from 'lodash/pick.js'

export const pickFields = (obj: {}, fields: string[]) => {
  return pick(obj, fields)
}
