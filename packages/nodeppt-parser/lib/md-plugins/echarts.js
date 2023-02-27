module.exports = md => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    if (token.info === 'echarts') {
      try {
        const json = JSON.parse(code)
        return `<div class="embed"><div class="echarts" style="min-height:50vw"></div></div><div class="echarts-data" style='display:none'>${JSON.stringify(
          json
        )}</div>`
      } catch (err) {
        return `<pre>${err}</pre>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }
}
