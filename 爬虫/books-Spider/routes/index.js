var express = require("express");
var router = express.Router();
const {
    getBookList
} = require("../controller/book");
const { SuccesModel, ErrorModel } = require("../models/resModel");

router.get("/", async (req, res, next) => {
    const { query } = req;
    let data = await getBookList({ query });
    console.log(data, '2');
    res.json(new SuccesModel(data));
});
module.exports = router;
