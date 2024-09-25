import api from '@flatfile/api'
import * as _ from 'lodash'

export const getSpace = (e) => api.spaces.get(e.context.spaceId)
export const getSheet = (e) => api.sheets.get(e.context.sheetId)
export const getFields = (s) => s.data.config.fields
export const spaceIsAutoBuild = (s) => s.data.metadata.isAutoBuildWorkingSpace
export const getExternalConstraints = (c) =>
  c?.filter((c) => c.type == 'external')
export const hasExternalConstraints = (f) =>
  getExternalConstraints(f.constraints).length > 0
export const getValidator = (v, n) => v.find((w) => w.name === n)
export const applyConstraintToRecord = (c, r, f) => {
  try {
    eval(c.function)(r.get(f.key), f.key, { config: r._config, record: r })
  } catch (e) {
    console.error(e)
  }
}
export const crossProduct = (...a) =>
  a.reduce((u, c) => _.flatMap(u, (a) => c.map((b) => a.concat(b))), [[]])
export const crossEach = (a, cb) => crossProduct(...a).forEach((p) => cb(...p))

// TEMP
import axios from 'axios'
const axiosAPI = axios.create({})
export const getConstraints = async (appId) => {
  try {
    const response = await axiosAPI.get(`/v1/apps/${appId}/constraints`, {
      headers: {
        Authorization: `Bearer ${process.env.FLATFILE_API_KEY}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching app constraints:', error)
    throw error
  }
}

// Replace with this when constraints is no longer marked internal
// export const getConstraints = (e) => api.constraints.get(e.context.appId)
