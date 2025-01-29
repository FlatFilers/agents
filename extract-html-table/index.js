import { HTMLTableExtractor } from '@flatfile/plugin-extract-html-table'

export default (listener) => {
  listener.use(HTMLTableExtractor())
}
