import { JSONExtractor } from "@flatfile/plugin-json-extractor";

export default (listener) => {
  listener.use(JSONExtractor())
}
