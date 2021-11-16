import * as marked from 'marked'  //マークダウン変換
import * as sanitizeHtml from 'sanitize-html'  //サニタイズ処理

const worker: Worker = self as any  //worker作成

worker.addEventListener('message', (event) => {
  const text = event.data
  const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2'] }) //変換とサニタイズ処理
  worker.postMessage({ html })  //処理されたHTMLを返す
})