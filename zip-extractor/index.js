import { ZipExtractor } from '@flatfile/plugin-zip-extractor'

export default (listener) => {
  listener.use(ZipExtractor())
}
