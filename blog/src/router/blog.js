const {
    getDetail,
    getList,
    newBlog,
    updateBlog,
    delBlog
} = require("../controller/blog");
const { SuccesModel, ErrorModel } = require("../models/resModel");
const loginCheck = session => {
    if (!session.username) {
        return Promise.resolve(new ErrorModel("请先登录"));
    }
};
module.exports = async (req, res) => {
    const { method, path, query, body, session } = req;
    console.log(session, "session");
    const { id } = query;
    if (method === "GET" && path === "/api/blog/list") {
        let { author, keyword, isAdmin } = query;
        if (isAdmin) {
            const loginCheckRes = loginCheck(session);
            if (loginCheckRes) return loginCheckRes;
            author = req.session.username;
        }
        let data = await getList(author, keyword);
        return new SuccesModel(data);
    }
    if (method === "GET" && path === "/api/blog/detail") {
        let data = await getDetail(id);
        return new SuccesModel(data[0]);
    }
    if (method === "POST" && path === "/api/blog/new") {
        const loginCheckRes = loginCheck(session);
        if (loginCheckRes) return loginCheckRes;
        body.author = session.username;
        const data = await newBlog(body);
        return new SuccesModel(data);
    }
    if (method === "POST" && path === "/api/blog/update") {
        const loginCheckRes = loginCheck(session);
        if (loginCheckRes) return loginCheckRes;
        const author = session.username;
        const data = await updateBlog(id, author, body);
        if (data) {
            return new SuccesModel(data);
        } else {
            return new ErrorModel("更新博客失败");
        }
    }
    if (method === "POST" && path === "/api/blog/del") {
        const loginCheckRes = loginCheck(session);
        if (loginCheckRes) return loginCheckRes;
        const author = session.username;
        const data = await delBlog(id, author);
        if (data) {
            return new SuccesModel(data);
        } else {
            return new ErrorModel("删除博客失败");
        }
    }
};
