const getList = (author, keyWord) => {
    return [
        {
            id: 1,
            title: '博客标题A',
            author: 'zhangsan',
            createTime: 1579530919535
        }, {
            id: 2,
            title: '博客标题B',
            author: 'zhangsan',
            createTime: 1579530919535
        }, {
            id: 3,
            title: '博客标题C',
            author: 'zhangsan',
            createTime: 1579530919535
        },
    ]
}
const getDetail = (id) => {
    return {
        id: 3,
        title: '博客标题C',
        author: 'zhangsan',
        createTime: 1579530919535,
        content: '博客内容C'
    }
}
module.exports = {
    getDetail, getList
}