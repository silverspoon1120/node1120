const mdIt = require('markdown-it')();
const prism = require('markdown-it-prism');
mdIt.use(prism, {
    plugins: ['keep-markup', 'show-language'],
    defaultLanguageForUnknown: 'textile'
});
mdIt.use(require('markdown-it-sup'));
mdIt.use(require('markdown-it-br'));
mdIt.use(require('markdown-it-katex'));
// mdIt.use(require('markdown-it-div'));

mdIt.use(require('./markdown/jsx'));
mdIt.use(require('./markdown/echarts'));
mdIt.use(require('./markdown/fa'));
mdIt.use(require('./markdown/link'));
mdIt.use(require('./markdown/attrs'));
mdIt.use(require('./markdown/img'));
mdIt.use(require('./markdown/cite'));

mdIt.use(require('./markdown/container'), 'column', require('./markdown/containers/column'));
mdIt.use(require('./markdown/container'), 'shadowbox', require('./markdown/containers/shadow'));
mdIt.use(require('./markdown/container'), 'steps', require('./markdown/containers/steps'));
mdIt.use(require('./markdown/container'), 'card', require('./markdown/containers/card'));
mdIt.use(require('./markdown/container'), 'flexbox', require('./markdown/containers/flexbox')('flexbox'));
mdIt.use(require('./markdown/container'), 'blink', require('./markdown/containers/blink'));

mdIt.use(require('./markdown/container'), 'gallery', require('./markdown/containers/gallery'));
mdIt.use(require('./markdown/container'), 'div', require('./markdown/containers/div'));


function getMdParser(plugins) {
    plugins.forEach(plugin => {
        mdIt.use(plugin);
    });
    return mdIt.render.bind(mdIt);
}

module.exports = getMdParser;
