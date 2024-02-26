import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'

export default (listener) => {
  listener.use(ExcelExtractor())
}
