import { MarkdownEtractor } from '@flatfile/plugin-markdown-extractor'

export default (listener) => {
  listener.use(MarkdownEtractor())
}
