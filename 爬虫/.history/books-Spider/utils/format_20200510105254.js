const { BASI_URL } = require('../conf/constant')
import xss from 'xss'
const cheerio = require('cheerio');
function formatQuery({ query, type = 1 }) {
    if (type == 2) {
        return `${BASI_URL}${xss(query.href)}`
    }
    let url = `${BASI_URL}/s/comb/aa-1`
    Object.entries(query).forEach(([key, val]) => {
        val = xss(val)
        if (key === 'pageIndex') {
            url += `/${val}`
            return
        }
        url += `&${key}-${encodeURI(val)}`
    })

    return url
}
function formatBookList(text) {
    let list = [];
    let $ = cheerio.load(text);
    let count = $('div.search-page>div:first-child>span').text() || 0;
    // 找到目标数据所在的页面元素，获取数据
    $('div.search-page .row').each((idx, ele) => {
        // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
        // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
        let aEle = $(ele).find(`>h3>a`);
        let imgEle = $(ele).find(`>p>img`);
        let dateMessage = $(ele).find(`>p>.small`).text().replace(' ', '').replace('的主页', '').replace('发布', '');
        let date = dateMessage.split('•')[2]
        let author = dateMessage.split('•')[3]
        let size = $(ele).find(`>p>.size`).text();
        let items = {
            title: aEle.attr('title'),        // 获取新闻标题
            href: aEle.attr('href'),
            type: imgEle.attr('title'),
            src: imgEle.attr('src'),
            size, date, author

        };
        list.push(items)              // 存入最终结果数组
    });
    return { list, count }
};
function formatBookUrl(text) {
    let $ = cheerio.load(text);
    let url = $('div.slide2 .dbutton2').attr('href')
    return { url }
};
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
module.exports = { formatQuery, formatBookList, formatBookUrl, getRandomInt }