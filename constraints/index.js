import { storedConstraint } from '@flatfile/plugin-stored-constraints'

export default async function (listener) {
  listener.use(storedConstraint())
}
