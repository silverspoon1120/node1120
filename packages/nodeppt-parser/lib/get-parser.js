const posthtml = require('posthtml')
const getMdParser = require('./get-markdown-parser')
// 内置 posthtml 插件
const buildInPlugins = [
  './tags/slide.js',
  './tags/icon.js',
  './tags/note.js',
  './tags/h1.js',
  './tags/footer.js',
  './tags/column.js',
  './tags/card.js',
  './tags/shadowbox.js',
  './tags/flexblock.js',
  './tags/gallery.js',
  // attrs放到最后
  './tags/attrs.js'
]
const buildInPosthtmlPlugins = buildInPlugins.map(file => {
  return require(file)
})

module.exports = plugins => {
  const markdownPlugins = []
  const posthtmlPlugins = []

  plugins.forEach(p => {
    if (p && typeof p.apply === 'function') {
      if (p.id.indexOf('markdown') === 0) {
        markdownPlugins.push(p.apply)
      } else if (p.id.indexOf('posthtml') === 0) {
        posthtmlPlugins.push(p.apply)
      }
    }
  })
  const mdRender = getMdParser(markdownPlugins)

  return str => {
    const slideTag = str.match(/<slide\s*(.*)>/gi) || []
    const contents = str.split(/<slide.*>/i)
    contents.shift()
    return contents
      .map((c, i) => {
        // 生成 attr
        const html = `
${slideTag[i]}
<div class="wrap" wrap="true">
${mdRender(c)}
</div>
</slide>
      `
        // 生成 content ast
        return posthtml(buildInPosthtmlPlugins.concat(posthtmlPlugins)).process(html, {sync: true}).html
      })
      .join('\n')
  }
}
