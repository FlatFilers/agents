import { XMLExtractor } from '@flatfile/plugin-xml-extractor'

export default (listener) => {
  listener.use(XMLExtractor())
}
