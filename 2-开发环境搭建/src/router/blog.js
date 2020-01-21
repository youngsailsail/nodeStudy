const {
    getDetail,
    getList,
    blogNew,
    blogUpdate,
    blogDel
} = require("../controller/blog");
const { SuccesModel, ErrorModel } = require("../models/resModel");

module.exports = (req, res) => {
    const { method, path, query, body } = req;
    const { id } = query;
    if (method === "GET" && path === "/api/blog/list") {
        const { author, keyword } = query;
        let data = getList(author, keyword); //负责处理数据
        return new SuccesModel(data); //负责返回标准格式
    }
    if (method === "GET" && path === "/api/blog/detail") {
        let data = getDetail(id);
        return new SuccesModel(data);
    }
    if (method === "POST" && path === "/api/blog/new") {
        const data = blogNew(body);
        return new SuccesModel(data);
    }
    if (method === "POST" && path === "/api/blog/update") {
        const data = blogUpdate(id, body);
        if (data) {
            return new SuccesModel();
        } else {
            return new ErrorModel("更新博客失败");
        }
    }
    if (method === "POST" && path === "/api/blog/del") {
        const data = blogDel(id);
        if (data) {
            return new SuccesModel();
        } else {
            return new ErrorModel("删除博客失败");
        }
    }
};
