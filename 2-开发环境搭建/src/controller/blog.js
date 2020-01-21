const { exct } = require("../db/sql");
const getList = (author, keyWord) => {
    const sql = `select * from blogs where author=${author} and content like %${keyWord}%`;
    console.log(sql, "sql");
    return exct(sql);
};
const getDetail = id => {
    return {
        id: 3,
        title: "博客标题C",
        author: "zhangsan",
        createTime: 1579530919535,
        content: "博客内容C"
    };
};
const blogNew = (blogData = {}) => {
    console.log("blogData", blogData);
    return {
        id: 3
    };
};
const blogUpdate = (id, blogData = {}) => {
    console.log("blogData", id, blogData);
    return true;
};
const blogDel = id => {
    console.log("blogData", id);
    return true;
};
module.exports = {
    getDetail,
    getList,
    blogNew,
    blogUpdate,
    blogDel
};
