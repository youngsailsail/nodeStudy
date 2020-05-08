const baseUrl = 'http://www.rufengso.net/s/comb/'
const cheerio = require('cheerio');
function formatQuery({ query }) {
    let url = baseUrl + 'aa-1'
    Object.entries(query).forEach(([key, val]) => {
        console.log(key, val);
        url += `&${key}-${encodeURI(val)}`
    })

    return url
}
function formatBookList(text) {
    let list = [];
    let $ = cheerio.load(text);
    let count = $('div.search-page>div:first-child>span').text();
    // 找到目标数据所在的页面元素，获取数据
    $('div.search-page .row').each((idx, ele) => {
        // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
        // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
        let aEle = $(ele).find(`>h3>a`);
        let imgEle = $(ele).find(`>p>img`);
        let size = $(ele).find(`>p>.size`).text();
        let items = {
            title: aEle.attr('title'),        // 获取新闻标题
            href: aEle.attr('href'),
            type: imgEle.attr('title'),
            src: imgEle.attr('src'),
            size
        };
        list.push(items)              // 存入最终结果数组
    });
    return { list, count }
};
module.exports = { formatQuery, formatBookList }