import { MarkdownExtractor } from '@flatfile/plugin-markdown-extractor'

export default (listener) => {
  listener.use(MarkdownExtractor())
}
