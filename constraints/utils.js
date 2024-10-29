import api from '@flatfile/api'
import * as _ from 'lodash'

export const getSheet = (e) => api.sheets.get(e.context.sheetId)
export const getFields = (s) => s.data.config.fields
export const getStoredConstraints = (c) => c?.filter((c) => c.type == 'stored')
export const hasStoredConstraints = (f) =>
  getStoredConstraints(f.constraints || []).length > 0
export const getValidator = (v, n) => v.find((w) => w.validator === n)
export const applyConstraintToRecord = (c, r, f, d) => {
  const constraint = f.constraints?.find((fc) => fc.validator === c.validator)
  const { config = {} } = constraint || {}
  try {
    eval(c.function)(r.get(f.key), f.key, { config, record: r, deps: d })
  } catch (e) {
    console.error(e)
  }
}
export const crossProduct = (...a) =>
  a.reduce((u, c) => _.flatMap(u, (a) => c.map((b) => a.concat(b))), [[]])
export const crossEach = (a, cb) => crossProduct(...a).forEach((p) => cb(...p))
export const getConstraints = (a) =>
  api.apps.getConstraints(a, { includeBuiltins: true })
