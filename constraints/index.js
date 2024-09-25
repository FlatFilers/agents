import { bulkRecordHook } from '@flatfile/plugin-record-hook'
import {
  applyConstraintToRecord,
  crossEach,
  getExternalConstraints,
  getFields,
  getSheet,
  getSpace,
  getValidator,
  hasExternalConstraints,
  spaceIsAutoBuild,
  getConstraints,
} from './utils'

async function getValidators(event) {
  const constraints = await getConstraints(event.context.appId)
  return constraints.data.map((c) => {
    return {
      name: c.description,
      function: c.function,
    }
  })
}

export default function (listener) {
  listener.use(
    bulkRecordHook('**', async (records, event) => {
      if (spaceIsAutoBuild(await getSpace(event))) {
        const externalConstraintFields = getFields(
          await getSheet(event),
        ).filter(hasExternalConstraints)
        const validators = await getValidators(event)
        crossEach([records, externalConstraintFields], (record, field) => {
          getExternalConstraints(field.constraints).forEach(
            async ({ validator }) => {
              const constraint = await getValidator(validators, validator)
              if (constraint) {
                applyConstraintToRecord(constraint, record, field)
              }
            },
          )
        })
      }
    }),
  )
}
