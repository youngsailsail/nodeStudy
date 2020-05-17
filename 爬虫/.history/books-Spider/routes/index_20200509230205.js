var express = require("express");
var router = express.Router();
const {
    getBookList, getBookUrl, getRecommend
} = require("../controller/book");
const { SuccesModel, ErrorModel } = require("../models/resModel");

router.get("/", async (req, res, next) => {
    const { query } = req;
    let data = await getBookList({ query });
    res.json(new SuccesModel(data));
});
router.get("/getBookUrl", async (req, res, next) => {
    const { query } = req;
    let data = await getBookUrl({ query });
    res.json(new SuccesModel(data));
});
router.get("/recommend", async (req, res, next) => {
    let data = await getRecommend()
    res.json(new SuccesModel(data));
});
module.exports = router;
