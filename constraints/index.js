import { bulkRecordHook } from '@flatfile/plugin-record-hook'
import {
  applyConstraintToRecord,
  crossEach,
  getStoredConstraints,
  getFields,
  getSheet,
  getValidator,
  hasStoredConstraints,
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
      const sheet = await getSheet(event)
      const storedConstraintFields =
        getFields(sheet).filter(hasStoredConstraints)
      const validators = await getValidators(event)

      crossEach([records, storedConstraintFields], (record, field) => {
        getStoredConstraints(field.constraints).forEach(
          async ({ validator }) => {
            const constraint = await getValidator(validators, validator)
            if (constraint) {
              applyConstraintToRecord(constraint, record, field)
            }
          },
        )
      })
    }),
  )
}
